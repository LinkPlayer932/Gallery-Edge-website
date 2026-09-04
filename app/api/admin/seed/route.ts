import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";
import { categories, products } from "@/lib/products";

export async function POST() {
  try {
    await connectDB();

    const categoryCount = await Category.countDocuments();
    let seededCategories = 0;
    if (categoryCount === 0) {
      for (let i = 0; i < categories.length; i++) {
        const cat = categories[i];
        await Category.create({
          name: cat.name,
          slug: cat.slug,
          image: cat.image,
          featured: i < 5,
          order: i + 1,
          productCount: 0,
        });
        seededCategories++;
      }
    }

    const productCount = await Product.countDocuments();
    let seededProducts = 0;
    if (productCount === 0) {
      for (const prod of products) {
        await Product.create({
          name: prod.name,
          slug: prod.slug,
          category: prod.categorySlug,
          description: prod.description,
          price: prod.price,
          compareAtPrice: prod.compareAtPrice,
          stock: 25,
          badge: prod.badge ?? "None",
          sizes: prod.sizes,
          finishes: prod.finishes,
          images: prod.images?.length ? prod.images : [prod.image],
          rating: prod.rating,
          reviews: prod.reviews,
          status: "Active",
        });
        seededProducts++;
      }
    }

    try {
      revalidatePath("/", "page");
      revalidatePath("/shop", "page");
      revalidatePath("/categories", "page");
    } catch (e) {
      console.warn(e);
    }

    return NextResponse.json({
      message: "Database seed status",
      existingCategories: categoryCount,
      seededCategories,
      existingProducts: productCount,
      seededProducts,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}

export async function GET() {
  return POST();
}
