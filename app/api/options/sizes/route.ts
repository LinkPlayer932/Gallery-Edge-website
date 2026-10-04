import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Option from "@/models/Option";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();

    // 1. Fetch all size options defined in Option collection
    const options = await Option.find({ type: "size" }).sort({ createdAt: 1 });

    // 2. Count products using each size (from sizes array and sizeVariants)
    const [sizesCounts, variantCounts] = await Promise.all([
      Product.aggregate([
        { $unwind: "$sizes" },
        { $group: { _id: "$sizes", count: { $sum: 1 } } },
      ]),
      Product.aggregate([
        { $unwind: "$sizeVariants" },
        { $group: { _id: "$sizeVariants.size", count: { $sum: 1 } } },
      ]),
    ]);

    const countMap = new Map<string, number>();

    sizesCounts.forEach((item: { _id: string; count: number }) => {
      if (item._id) countMap.set(item._id.trim(), item.count);
    });

    variantCounts.forEach((item: { _id: string; count: number }) => {
      if (item._id) {
        const trimmed = item._id.trim();
        const existing = countMap.get(trimmed) || 0;
        // Take max of sizes and sizeVariants count
        countMap.set(trimmed, Math.max(existing, item.count));
      }
    });

    // 3. Assemble complete list (both from Option collection and any rogue sizes in products)
    const sizeList: { id: string; value: string; productCount: number; isOption: boolean }[] = [];
    const seen = new Set<string>();

    options.forEach((opt) => {
      const val = opt.value.trim();
      seen.add(val.toLowerCase());
      sizeList.push({
        id: opt._id.toString(),
        value: val,
        productCount: countMap.get(val) || 0,
        isOption: true,
      });
    });

    // Include sizes found in products that might not be in Option collection
    countMap.forEach((count, sizeVal) => {
      if (!seen.has(sizeVal.toLowerCase())) {
        seen.add(sizeVal.toLowerCase());
        sizeList.push({
          id: `product-size-${sizeVal}`,
          value: sizeVal,
          productCount: count,
          isOption: false,
        });
      }
    });

    return NextResponse.json({ sizes: sizeList });
  } catch (error) {
    console.error("GET /api/options/sizes error:", error);
    return NextResponse.json({ error: "Failed to fetch sizes" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { sizes = [] } = body;

    if (!Array.isArray(sizes) || sizes.length === 0) {
      return NextResponse.json(
        { error: "Please provide an array of sizes to delete" },
        { status: 400 }
      );
    }

    const cleanSizes = sizes.map((s: string) => String(s).trim()).filter(Boolean);

    if (cleanSizes.length === 0) {
      return NextResponse.json({ error: "No valid sizes provided" }, { status: 400 });
    }

    // 1. Delete from Option collection
    const deleteOptionsResult = await Option.deleteMany({
      type: "size",
      value: { $in: cleanSizes },
    });

    // 2. Remove sizes & sizeVariants from ALL products
    const updateProductsResult = await Product.updateMany(
      {
        $or: [
          { sizes: { $in: cleanSizes } },
          { "sizeVariants.size": { $in: cleanSizes } },
        ],
      },
      {
        $pull: {
          sizes: { $in: cleanSizes },
          sizeVariants: { size: { $in: cleanSizes } },
        },
      }
    );

    // 3. Revalidate site & admin pages
    try {
      revalidatePath("/", "page");
      revalidatePath("/shop", "page");
      revalidatePath("/categories", "page");
      revalidatePath("/admin/products", "page");
    } catch (revalErr) {
      console.warn("Revalidation error:", revalErr);
    }

    return NextResponse.json({
      success: true,
      deletedSizes: cleanSizes,
      deletedOptionsCount: deleteOptionsResult.deletedCount,
      affectedProducts: updateProductsResult.modifiedCount,
    });
  } catch (error) {
    console.error("POST /api/options/sizes bulk delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete sizes in bulk" },
      { status: 500 }
    );
  }
}
