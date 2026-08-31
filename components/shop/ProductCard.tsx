import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/shared/Badge";
import RatingStars from "@/components/shared/RatingStars";
import PriceTag from "@/components/system/PriceTag";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group overflow-hidden rounded-xl bg-white"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && <Badge label={product.badge} />}
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-amber-700">{product.category}</p>
        <p className="mt-1 font-serif text-base font-semibold text-neutral-900">
          {product.name}
        </p>
        <div className="mt-2">
          <RatingStars rating={product.rating} reviewCount={product.reviews} />
        </div>
        <div className="mt-3">
          <PriceTag price={product.price} compareAtPrice={product.compareAtPrice} />
        </div>
      </div>
    </Link>
  );
}