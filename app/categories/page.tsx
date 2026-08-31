import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/products";

export default function CategoriesPage() {
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
      </div>
    </main>
  );
}