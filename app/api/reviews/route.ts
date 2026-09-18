import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Review from "@/models/Review";
import Product from "@/models/Product";
import Order from "@/models/Order";
import Customer from "@/models/Customer";
import mongoose from "mongoose";

async function calculateProductStats(productId: string | mongoose.Types.ObjectId) {
  const objectId = typeof productId === "string" ? new mongoose.Types.ObjectId(productId) : productId;

  const result = await Review.aggregate([
    { $match: { productId: objectId, status: "Approved" } },
    {
      $group: {
        _id: "$productId",
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
        stars5: { $sum: { $cond: [{ $eq: ["$rating", 5] }, 1, 0] } },
        stars4: { $sum: { $cond: [{ $eq: ["$rating", 4] }, 1, 0] } },
        stars3: { $sum: { $cond: [{ $eq: ["$rating", 3] }, 1, 0] } },
        stars2: { $sum: { $cond: [{ $eq: ["$rating", 2] }, 1, 0] } },
        stars1: { $sum: { $cond: [{ $eq: ["$rating", 1] }, 1, 0] } },
      },
    },
  ]);

  if (!result.length) {
    return {
      averageRating: 0,
      totalReviews: 0,
      distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    };
  }

  const stat = result[0];
  const roundedAverage = Math.round((stat.averageRating || 0) * 10) / 10;

  return {
    averageRating: roundedAverage,
    totalReviews: stat.totalReviews || 0,
    distribution: {
      5: stat.stars5 || 0,
      4: stat.stars4 || 0,
      3: stat.stars3 || 0,
      2: stat.stars2 || 0,
      1: stat.stars1 || 0,
    },
  };
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const slug = searchParams.get("slug");

    let targetProductId = productId;

    if (!targetProductId && slug) {
      const prod = await Product.findOne({ slug });
      if (prod) {
        targetProductId = prod._id.toString();
      }
    }

    if (!targetProductId) {
      return NextResponse.json({ error: "productId or slug is required" }, { status: 400 });
    }

    const reviews = await Review.find({
      productId: targetProductId,
      status: "Approved",
    }).sort({ createdAt: -1 });

    const stats = await calculateProductStats(targetProductId);

    return NextResponse.json({ reviews, stats });
  } catch (error) {
    console.error("GET /api/reviews error:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { productId, name, email, rating, title, comment } = body;

    if (!productId || !name || !email || !rating || !comment) {
      return NextResponse.json(
        { error: "Please fill in all required fields (name, email, rating, comment)." },
        { status: 400 }
      );
    }

    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5." }, { status: 400 });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check if customer email purchased this product to grant verified badge
    let verifiedPurchase = false;
    try {
      const customer = await Customer.findOne({ email: email.toLowerCase().trim() });
      if (customer) {
        const orderCount = await Order.countDocuments({
          customer: customer._id,
          "items.name": { $regex: new RegExp(product.name, "i") },
        });
        if (orderCount > 0) verifiedPurchase = true;
      }
    } catch {
      // Non-blocking verification check
    }

    const newReview = await Review.create({
      productId: product._id,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      rating: numRating,
      title: title ? title.trim() : "",
      comment: comment.trim(),
      verifiedPurchase,
      status: "Approved",
    });

    // Update product rating stats
    const stats = await calculateProductStats(product._id);
    await Product.findByIdAndUpdate(product._id, {
      rating: stats.averageRating,
      reviews: stats.totalReviews,
    });

    // Revalidate paths
    try {
      revalidatePath(`/shop/${product.slug}`, "page");
      revalidatePath("/shop", "page");
      revalidatePath("/", "page");
    } catch (revalidateError) {
      console.warn("Revalidation warning:", revalidateError);
    }

    return NextResponse.json({ review: newReview, stats }, { status: 201 });
  } catch (error) {
    console.error("POST /api/reviews error:", error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
