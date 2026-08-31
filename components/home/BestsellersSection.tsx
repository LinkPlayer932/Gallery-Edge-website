// import Image from "next/image";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";
// import Badge from "@/components/shared/Badge";
// import RatingStars from "@/components/shared/RatingStars";
// import PriceTag from "@/components/system/PriceTag";

// const HOMEPAGE_LIMIT = 12; // baad mein 10-15 ke beech jo chahiye set kar dena

// const products = [
//   {
//     slug: "islamic-calligraphy-gallery-set",
//     name: "Islamic Calligraphy Gallery Set (5-Piece)",
//     category: "Islamic Calligraphy",
//     image: "/product-images/islamic-calligraphy-gallery-set/main.jpeg",
//     badge: "Bestseller",
//     rating: 4.9,
//     reviews: 58,
//     price: 349,
//     compareAtPrice: 420,
//   },
//   {
//     slug: "trust-patience-duo",
//     name: "Trust & Patience Duo Set",
//     category: "Islamic Calligraphy",
//     image: "/product-images/trust-patience-duo/main.jpeg",
//     rating: 4.8,
//     reviews: 34,
//     price: 149,
//   },
//   {
//     slug: "tasbeeh-set-trio",
//     name: "Allahuakbar · Alhamdulillah · Subhanallah Trio",
//     category: "Islamic Calligraphy",
//     image: "/product-images/tasbeeh-set-trio/main.jpeg",
//     badge: "New",
//     rating: 4.9,
//     reviews: 27,
//     price: 219,
//   },
//   {
//     slug: "sacred-names-trio",
//     name: "Sacred Names Trio",
//     category: "Islamic Calligraphy",
//     image: "/product-images/sacred-names-trio/main.jpeg",
//     rating: 4.7,
//     reviews: 19,
//     price: 199,
//   },
//   {
//     slug: "never-give-up-duo",
//     name: "Never Give Up Duo",
//     category: "Custom Frames",
//     image: "/product-images/never-give-up-duo/main.jpeg",
//     rating: 4.6,
//     reviews: 42,
//     price: 129,
//   },
//   {
//     slug: "call-to-prayer-trio",
//     name: "Call to Prayer Trio",
//     category: "Islamic Calligraphy",
//     image: "/product-images/call-to-prayer-trio/main.jpeg",
//     badge: "Bestseller",
//     rating: 4.9,
//     reviews: 71,
//     price: 249,
//     compareAtPrice: 300,
//   },
//   {
//     slug: "vintage-chrysanthemum-print",
//     name: "Vintage Chrysanthemum Print",
//     category: "Single Frames",
//     image: "/product-images/vintage-chrysanthemum-print/main.jpeg",
//     rating: 4.8,
//     reviews: 23,
//     price: 179,
//   },
//   {
//     slug: "dandelion-duo",
//     name: "Dandelion Duo",
//     category: "Custom Frames",
//     image: "/product-images/dandelion-duo/main.jpeg",
//     rating: 4.7,
//     reviews: 51,
//     price: 139,
//   },
//   {
//     slug: "botanical-still-life-trio",
//     name: "Botanical Still Life Trio",
//     category: "Custom Frames",
//     image: "/product-images/botanical-still-life-trio/main.jpeg",
//     rating: 4.8,
//     reviews: 38,
//     price: 259,
//   },
//   {
//     slug: "sabr-shukr-duo",
//     name: "Sabr & Shukr Duo",
//     category: "Islamic Calligraphy",
//     image: "/product-images/sabr-shukr-duo/main.jpeg",
//     badge: "New",
//     rating: 4.9,
//     reviews: 15,
//     price: 159,
//   },
//   {
//     slug: "abstract-geometric-trio",
//     name: "Abstract Geometric Trio",
//     category: "Single Frames",
//     image: "/product-images/abstract-geometric-trio/main.jpeg",
//     rating: 4.5,
//     reviews: 29,
//     price: 189,
//   },
//   {
//     slug: "marble-ink-abstract",
//     name: "Marble Ink Abstract",
//     category: "Single Frames",
//     image: "/product-images/marble-ink-abstract/main.jpeg",
//     rating: 4.6,
//     reviews: 17,
//     price: 169,
//   },
//   {
//     slug: "verse-canvas-square",
//     name: "Verse Canvas Square",
//     category: "Islamic Calligraphy",
//     image: "/product-images/verse-canvas-square/main.jpeg",
//     rating: 4.7,
//     reviews: 22,
//     price: 149,
//   },
//   {
//     slug: "midnight-wildflower-trio",
//     name: "Midnight Wildflower Trio",
//     category: "Custom Frames",
//     image: "/product-images/midnight-wildflower-trio/main.jpeg",
//     badge: "New",
//     rating: 4.8,
//     reviews: 33,
//     price: 229,
//   },
// ];

// export default function BestsellersSection() {
//   const visibleProducts = products.slice(0, HOMEPAGE_LIMIT);

//   return (
//     <section className="bg-[#F3EFE7] px-6 py-20">
//       <div className="mx-auto max-w-7xl">
//         <div className="flex items-end justify-between">
//           <div>
//             <p className="text-xs font-medium uppercase tracking-widest text-amber-700">
//               Featured Collection
//             </p>
//             <h2 className="mt-2 font-serif text-3xl font-semibold text-neutral-900">
//               Bestsellers
//             </h2>
//           </div>
//           <Link
//             href="/shop"
//             className="flex items-center gap-1 text-sm font-medium text-neutral-700 hover:text-amber-800"
//           >
//             View all products <ArrowRight size={14} />
//           </Link>
//         </div>

//         <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {visibleProducts.map((item) => (
//             <Link
//               key={item.slug}
//               href={`/shop/${item.slug}`}
//               className="group overflow-hidden rounded-xl bg-white"
//             >
//               <div className="relative h-56 w-full overflow-hidden">
//                 <Image
//                   src={item.image}
//                   alt={item.name}
//                   fill
//                   className="object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//                 {item.badge && <Badge label={item.badge} />}
//               </div>
//               <div className="p-4">
//                 <p className="text-xs uppercase tracking-wide text-amber-700">
//                   {item.category}
//                 </p>
//                 <p className="mt-1 font-serif text-base font-semibold text-neutral-900">
//                   {item.name}
//                 </p>
//                 <div className="mt-2">
//                   <RatingStars rating={item.rating} reviewCount={item.reviews} />
//                 </div>
//                 <div className="mt-3">
//                   <PriceTag price={item.price} compareAtPrice={item.compareAtPrice} />
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";
import { products } from "@/lib/products";

const HOMEPAGE_LIMIT = 12;

export default function BestsellersSection() {
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