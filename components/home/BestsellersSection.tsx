import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";
import { getAllProducts } from "@/lib/db-products";

const HOMEPAGE_LIMIT = 12;

export default async function BestsellersSection() {
  const products = await getAllProducts();
  const visibleProducts = products.slice(0, HOMEPAGE_LIMIT);

  return (
    <section className="bg-[#F3EFE7] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-amber-700">
              Featured Collection
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-neutral-900">
              Bestsellers
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-1 text-sm font-medium text-neutral-700 hover:text-amber-800"
          >
            View all products <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
