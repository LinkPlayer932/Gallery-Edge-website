import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: number;
}

export default function RatingStars({ rating, reviewCount, size = 14 }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={
              i < Math.round(rating)
                ? "fill-amber-600 text-amber-600"
                : "fill-neutral-200 text-neutral-200"
            }
          />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-xs text-neutral-500">
          {rating} ({reviewCount})
        </span>
      )}
    </div>
  );
}