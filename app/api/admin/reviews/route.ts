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

export async function GET() {
  try {
    await connectDB();

    // Ensure Product model is registered for populate
    const _ = Product;

    const reviews = await Review.find()
      .populate("productId", "name slug images price")
      .sort({ createdAt: -1 });

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("GET /api/admin/reviews error:", error);
    return NextResponse.json({ error: "Failed to fetch admin reviews" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { productId, name, email, rating, title, comment, verifiedPurchase, status } = body;

    if (!productId || !name || !email || !rating || !comment) {
      return NextResponse.json(
        { error: "Product, name, email, rating, and comment are required." },
        { status: 400 }
      );
    }

    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5." }, { status: 400 });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Selected product not found" }, { status: 404 });
    }

    const review = await Review.create({
      productId: product._id,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      rating: numRating,
      title: title ? title.trim() : "",
      comment: comment.trim(),
      verifiedPurchase: verifiedPurchase ?? true,
      status: status || "Approved",
    });

    if (review.status === "Approved") {
      await recalculateProductStats(product._id);
      if (product.slug) {
        revalidatePath(`/shop/${product.slug}`, "page");
      }
    }

    const populatedReview = await Review.findById(review._id).populate(
      "productId",
      "name slug images price"
    );

    return NextResponse.json({ review: populatedReview }, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/reviews error:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
