import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";
import Product from "@/models/Product";
import mongoose from "mongoose";

async function recalculateProductStats(productId: mongoose.Types.ObjectId) {
  const result = await Review.aggregate([
    { $match: { productId, status: "Approved" } },
    {
      $group: {
        _id: "$productId",
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  if (!result.length) {
    await Product.findByIdAndUpdate(productId, { rating: 0, reviews: 0 });
    return;
  }

  const roundedAverage = Math.round((result[0].averageRating || 0) * 10) / 10;
  await Product.findByIdAndUpdate(productId, {
    rating: roundedAverage,
    reviews: result[0].totalReviews || 0,
  });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const { status } = await request.json();

    if (!["Approved", "Pending", "Rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const review = await Review.findByIdAndUpdate(id, { status }, { new: true });
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    if (review.productId) {
      await recalculateProductStats(review.productId);
      const product = await Product.findById(review.productId);
      if (product?.slug) {
        revalidatePath(`/shop/${product.slug}`, "page");
      }
    }

    return NextResponse.json({ review });
  } catch (error) {
    console.error("PUT /api/admin/reviews/[id] error:", error);
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;

    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    if (review.productId) {
      await recalculateProductStats(review.productId);
      const product = await Product.findById(review.productId);
      if (product?.slug) {
        revalidatePath(`/shop/${product.slug}`, "page");
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/reviews/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
