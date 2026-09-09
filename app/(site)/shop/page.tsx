import ProductGrid from "@/components/shop/ProductGrid";
import { getAllProducts, getAllCategories } from "@/lib/db-products";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: categoryParam } = await searchParams;

  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  const selectedCategory = categoryParam
    ? categories.find(
        (c) =>
          c.slug.toLowerCase() === categoryParam.toLowerCase() ||
          c.name.toLowerCase() === categoryParam.toLowerCase()
      )
    : null;

  const heading = selectedCategory ? selectedCategory.name : "Shop All Frames";
  const subheading = selectedCategory
    ? `Explore our ${selectedCategory.name} collection`
    : "Handcrafted premium frames for every style and space";

  return (
    <main className="bg-[#FAF7F2] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-widest text-amber-700">
            Our Collection
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold text-neutral-900">
            {heading}
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            {subheading}
          </p>
        </div>

        <ProductGrid products={products} categories={categories} />
      </div>
    </main>
  );
}
