import { connectDB } from "@/lib/mongodb";
import ProductModel from "@/models/Product";
import CategoryModel from "@/models/Category";
import { products as defaultProducts, categories as defaultCategories, type Product } from "@/lib/products";

type CategoryNameMap = Record<string, string>;

let hasSeeded = false;

async function ensureDefaultDataSeeded() {
  if (hasSeeded) return;
  try {
    // Seed default categories if they do not exist
    for (let i = 0; i < defaultCategories.length; i++) {
      const cat = defaultCategories[i];
      await CategoryModel.updateOne(
        { slug: cat.slug },
        {
          $setOnInsert: {
            name: cat.name,
            slug: cat.slug,
            featured: i < 5,
            order: i + 1,
            productCount: 0,
          },
          $set: {
            image: cat.image,
          },
        },
        { upsert: true }
      );
    }

    // Seed default products if they do not exist
    for (const prod of defaultProducts) {
      await ProductModel.updateOne(
        { slug: prod.slug },
        {
          $setOnInsert: {
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
          },
        },
        { upsert: true }
      );
    }
    hasSeeded = true;
  } catch (err) {
    console.error("Error auto-seeding defaults:", err);
  }
}

async function getCategoryNameMap(): Promise<CategoryNameMap> {
  const categories = await CategoryModel.find();
  const map: CategoryNameMap = {};
  categories.forEach((c) => {
    map[c.slug] = c.name;
  });
  return map;
}

// Converts a MongoDB product document into the shape ProductCard / ProductGrid /
// ProductInfo already expect (same interface as the old static lib/products.ts).
function mapProduct(doc: any, categoryNameMap: CategoryNameMap): Product {
  const images: string[] = doc.images?.length ? doc.images : ["/product-images/placeholder.jpg"];

  return {
    _id: doc._id.toString(),
    slug: doc.slug,
    name: doc.name,
    category: categoryNameMap[doc.category] ?? doc.category,
    categorySlug: doc.category,
    image: images[0],
    images,
    badge: doc.badge && doc.badge !== "None" ? doc.badge : undefined,
    rating: doc.rating ?? 0,
    reviews: doc.reviews ?? 0,
    price: doc.price,
    compareAtPrice: doc.compareAtPrice,
    description: doc.description ?? "",
    sizes: doc.sizes ?? [],
    finishes: doc.finishes ?? [],
  };
}

export async function getAllProducts(): Promise<Product[]> {
  await connectDB();
  await ensureDefaultDataSeeded();
  const categoryNameMap = await getCategoryNameMap();
  const docs = await ProductModel.find({ status: { $ne: "Draft" } }).sort({ createdAt: -1 });
  return docs.map((doc) => mapProduct(doc, categoryNameMap));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await connectDB();
  await ensureDefaultDataSeeded();
  const categoryNameMap = await getCategoryNameMap();
  const doc = await ProductModel.findOne({ slug, status: { $ne: "Draft" } });
  if (!doc) return null;
  return mapProduct(doc, categoryNameMap);
}

export async function getRelatedProducts(
  categorySlug: string,
  excludeSlug: string,
  limit = 4
): Promise<Product[]> {
  await connectDB();
  await ensureDefaultDataSeeded();
  const categoryNameMap = await getCategoryNameMap();
  const docs = await ProductModel.find({
    category: categorySlug,
    slug: { $ne: excludeSlug },
    status: { $ne: "Draft" },
  }).limit(limit);
  return docs.map((doc) => mapProduct(doc, categoryNameMap));
}

export interface CategoryDisplay {
  name: string;
  slug: string;
  image: string;
  count: string;
}

export async function getAllCategories(): Promise<CategoryDisplay[]> {
  await connectDB();
  await ensureDefaultDataSeeded();
  const categories = await CategoryModel.find().sort({ featured: -1, order: 1, createdAt: -1 });

  const counts = await ProductModel.aggregate([
    { $match: { status: { $ne: "Draft" } } },
    { $group: { _id: "$category", count: { $sum: 1 } } },
  ]);
  const countMap: Record<string, number> = {};
  counts.forEach((c: { _id: string; count: number }) => {
    countMap[c._id] = c.count;
  });

  return categories.map((c) => ({
    name: c.name,
    slug: c.slug,
    image: c.image || "/category-images/islamic-calligraphy/islamic-calligraphy-1.jpeg",
    count: `${countMap[c.slug] ?? 0} styles`,
  }));
}
