import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { items } = body as { items: { _id: string; order: number }[] };

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { error: "Items array is required" },
        { status: 400 }
      );
    }

    // Bulk update orders
    const updatePromises = items.map(({ _id, order }) =>
      Category.findByIdAndUpdate(_id, { order })
    );

    await Promise.all(updatePromises);

    try {
      revalidatePath("/", "page");
      revalidatePath("/shop", "page");
      revalidatePath("/categories", "page");
    } catch (revalidateError) {
      console.warn("Revalidation warning:", revalidateError);
    }

    return NextResponse.json({ success: true, message: "Order updated successfully" });
  } catch (error) {
    console.error("PUT /api/categories/reorder error:", error);
    return NextResponse.json(
      { error: "Failed to update category order" },
      { status: 500 }
    );
  }
}
