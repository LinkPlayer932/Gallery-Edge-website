import Link from "next/link";
import Image from "next/image";
import { getProductsByCollection } from "@/lib/db-products";

const HOMEPAGE_LIMIT = 3;

export default async function PosterCollectionSection() {
  const posterProducts = await getProductsByCollection(
    "poster",
    HOMEPAGE_LIMIT,
  );

  if (!posterProducts?.length) return null;

  return (
    <section className="py-16 px-6 md:px-12 bg-[#F8F5F0]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sm tracking-widest uppercase text-[#B08D57] font-medium">
              New Collection
            </span>
            <h2 className="text-3xl md:text-4xl font-serif mt-2 text-[#1A1A1A]">
              Poster Frames
            </h2>
            <p className="text-[#6B6B6B] mt-2 max-w-md">
              Premium framed prints — from Islamic calligraphy pieces to iconic
              car posters.
            </p>
          </div>

          <Link
            href="/posters"
            className="hidden md:inline-block text-sm font-medium text-[#1A1A1A] border-b border-[#B08D57] pb-1 hover:text-[#B08D57] transition-colors"
          >
            View All
          </Link>
        </div>

        {/* Grid — 3 items only, rest live on /posters */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {posterProducts.map((product) => (
            <Link
              key={product._id}
              href={`/shop/${product.slug}`}
              className="group block"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white shadow-sm">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />

                <span className="absolute top-3 left-3 bg-white/90 text-[10px] uppercase tracking-wide px-2 py-1 rounded-full text-[#1A1A1A] font-medium shadow-xs">
                  {product.category ||
                    (product.categorySlug === "islamic-calligraphy"
                      ? "Calligraphy"
                      : "Car Frame")}
                </span>
              </div>

              <div className="mt-3">
                <h3 className="text-sm font-medium text-[#1A1A1A] group-hover:text-[#B08D57] transition-colors">
                  {product.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile view-all */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/posters"
            className="inline-block text-sm font-medium text-[#1A1A1A] border-b border-[#B08D57] pb-1"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
