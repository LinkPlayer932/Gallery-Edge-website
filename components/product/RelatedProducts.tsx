import ProductCard from "@/components/shop/ProductCard";
import type { Product } from "@/lib/products";

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="font-serif text-2xl font-semibold text-neutral-900">You May Also Like</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
