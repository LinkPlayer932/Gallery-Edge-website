import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/lib/db-products";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <main className="bg-[#FAF7F2] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-widest text-amber-700">
            Browse
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold text-neutral-900">
            All Categories
          </h1>
        </div>

        {categories.length === 0 ? (
          <p className="rounded-xl bg-white p-12 text-center text-sm text-neutral-500">
            No categories found.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="group relative h-64 overflow-hidden rounded-xl"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-serif text-base font-semibold">{cat.name}</p>
                  <p className="text-xs text-neutral-200">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}