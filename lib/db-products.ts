import { connectDB } from "@/lib/mongodb";
import ProductModel from "@/models/Product";
import CategoryModel from "@/models/Category";
import type { Product } from "@/lib/products";

type CategoryNameMap = Record<string, string>;

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
  const categoryNameMap = await getCategoryNameMap();
  const docs = await ProductModel.find({ status: "Active" }).sort({ createdAt: -1 });
  return docs.map((doc) => mapProduct(doc, categoryNameMap));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await connectDB();
  const categoryNameMap = await getCategoryNameMap();
  const doc = await ProductModel.findOne({ slug, status: "Active" });
  if (!doc) return null;
  return mapProduct(doc, categoryNameMap);
}

export async function getRelatedProducts(
  categorySlug: string,
  excludeSlug: string,
  limit = 4
): Promise<Product[]> {
  await connectDB();
  const categoryNameMap = await getCategoryNameMap();
  const docs = await ProductModel.find({
    category: categorySlug,
    slug: { $ne: excludeSlug },
    status: "Active",
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
  const categories = await CategoryModel.find().sort({ order: 1 });

  const counts = await ProductModel.aggregate([
    { $match: { status: "Active" } },
    { $group: { _id: "$category", count: { $sum: 1 } } },
  ]);
  const countMap: Record<string, number> = {};
  counts.forEach((c: { _id: string; count: number }) => {
    countMap[c._id] = c.count;
  });

  return categories.map((c) => ({
    name: c.name,
    slug: c.slug,
    image: c.image,
    count: `${countMap[c.slug] ?? 0} styles`,
  }));
}
