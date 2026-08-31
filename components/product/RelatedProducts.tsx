import ProductCard from "@/components/shop/ProductCard";
import { products, Product } from "@/lib/products";

export default function RelatedProducts({ current }: { current: Product }) {
  const related = products
    .filter((p) => p.categorySlug === current.categorySlug && p.slug !== current.slug)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="font-serif text-2xl font-semibold text-neutral-900">You May Also Like</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}