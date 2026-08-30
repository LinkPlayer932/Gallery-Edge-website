import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Islamic Calligraphy", count: "20 styles", image: "/category-images/islamic-calligraphy/islamic-calligraphy-1.jpeg", slug: "islamic-calligraphy" },
  { name: "Birthday & Wedding Gift Frames", count: "16 styles", image: "/category-images/birthday-wedding-gift/wedding-gift-1.jpeg", slug: "birthday-wedding-gift" },
  { name: "Animal Photo Frames", count: "14 styles", image: "https://picsum.photos/seed/animalframe/700/500", slug: "animal-photo" },
  { name: "Car Frames", count: "10 styles", image: "/category-images/car-frames/car-frames-1.jpeg", slug: "car-frames" },
  { name: "Single Frames", count: "18 styles", image: "/category-images/single-frames/single-frame-1.jpeg", slug: "single-frames" },
  { name: "Bestselling Frames", count: "22 styles", image: "/category-images/bestselling/bestselling-1.jpeg", slug: "bestselling" },
  { name: "Custom Frames", count: "12 styles", image: "/category-images/custom-frames/custom-frame-1.jpeg", slug: "custom-frames" },
  { name: "Nikkah Frames", count: "9 styles", image: "/category-images/nikkah-frames/nikkah-frame-1.jpeg", slug: "nikkah-frames" },
  { name: "Wedding Boards", count: "11 styles", image: "/category-images/wedding-boards/wedding-board-1.jpeg", slug: "wedding-boards" },
];

const HOMEPAGE_LIMIT = 7;

export default function CategoryGrid() {
  const visibleCategories = categories.slice(0, HOMEPAGE_LIMIT);
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
          {/* Featured large tile */}
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

          {/* Rest in responsive grid */}
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