import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Option from "@/models/Option";
import Product from "@/models/Product";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const deleted = await Option.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Option not found" }, { status: 404 });
    }

    let affectedProducts = 0;

    // If a size option was deleted, remove it from all products
    if (deleted.type === "size" && deleted.value) {
      const updateResult = await Product.updateMany(
        {
          $or: [
            { sizes: deleted.value },
            { "sizeVariants.size": deleted.value },
          ],
        },
        {
          $pull: {
            sizes: deleted.value,
            sizeVariants: { size: deleted.value },
          },
        }
      );
      affectedProducts = updateResult.modifiedCount;

      try {
        revalidatePath("/", "page");
        revalidatePath("/shop", "page");
        revalidatePath("/categories", "page");
        revalidatePath("/admin/products", "page");
      } catch (revalidateErr) {
        console.warn("Revalidation warning:", revalidateErr);
      }
    }

    return NextResponse.json({
      success: true,
      deleted: deleted.value,
      affectedProducts,
    });
  } catch (error) {
    console.error("DELETE /api/options/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete option" }, { status: 500 });
  }
}