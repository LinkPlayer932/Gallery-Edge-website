import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/lib/db-products";

const HOMEPAGE_LIMIT = 7;

export default async function CategoryGrid() {
  const categories = await getAllCategories();
  const visibleCategories = categories.slice(0, HOMEPAGE_LIMIT);

  if (visibleCategories.length === 0) return null;

  const [featured, ...rest] = visibleCategories;

  return (
    <section className="bg-[#FAF7F2] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-amber-700">
              Browse by Category
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-neutral-900">
              Find Your Frame
            </h2>
          </div>
          <Link href="/categories" className="text-sm font-medium text-neutral-700 hover:text-amber-800">
            View all
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Link
            href={`/shop?category=${featured.slug}`}
            className="group relative col-span-1 h-[440px] overflow-hidden rounded-xl md:col-span-1 md:row-span-2"
          >
            <Image
              src={featured.image}
              alt={featured.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-5 left-5 text-white">
              <p className="font-serif text-lg font-semibold">{featured.name}</p>
              <p className="text-xs text-neutral-200">{featured.count}</p>
            </div>
          </Link>

          {rest.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="group relative h-[210px] overflow-hidden rounded-xl"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-serif text-sm font-semibold leading-tight">{cat.name}</p>
                <p className="text-xs text-neutral-200">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
