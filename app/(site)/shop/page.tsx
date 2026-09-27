import ProductGrid from "@/components/shop/ProductGrid";
import { getAllProducts, getAllCategories } from "@/lib/db-products";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; collection?: string }>;
}) {
  const { category: categoryParam, collection: collectionParam } = await searchParams;

  const [allProducts, categories] = await Promise.all([
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

  // Filter by collection tag (e.g. "poster") when present, otherwise show everything
  // and let ProductGrid's own category filter (if any) take over as usual.
  const products = collectionParam
    ? allProducts.filter(
        (p) => p.collection?.toLowerCase() === collectionParam.toLowerCase()
      )
    : allProducts;

  const collectionLabels: Record<string, string> = {
    poster: "Poster Frames",
  };

  const heading = selectedCategory
    ? selectedCategory.name
    : collectionParam
    ? collectionLabels[collectionParam.toLowerCase()] ?? "Shop All Frames"
    : "Shop All Frames";

  const subheading = selectedCategory
    ? `Explore our ${selectedCategory.name} collection`
    : collectionParam
    ? "Premium framed prints from our poster collection"
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
