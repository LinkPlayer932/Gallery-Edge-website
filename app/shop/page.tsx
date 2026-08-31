import ProductGrid from "@/components/shop/ProductGrid";

export default function ShopPage() {
  return (
    <main className="bg-[#FAF7F2] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-widest text-amber-700">
            Our Collection
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold text-neutral-900">
            Shop All Frames
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Handcrafted premium frames for every style and space
          </p>
        </div>

        <ProductGrid />
      </div>
    </main>
  );
}