interface PriceTagProps {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-2xl",
};

export default function PriceTag({ price, compareAtPrice, size = "md" }: PriceTagProps) {
  const discountPercent = compareAtPrice
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : null;

  return (
    <div className="flex items-center gap-2.5">
      <span className={`font-serif font-semibold text-neutral-900 ${sizeStyles[size]}`}>
        Rs. {price?.toLocaleString()}
      </span>
      {compareAtPrice && (
        <span className="text-sm text-neutral-400 line-through">
          Rs. {compareAtPrice?.toLocaleString()}
        </span>
      )}
      {discountPercent !== null && discountPercent > 0 && (
        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
          Save {discountPercent}%
        </span>
      )}
    </div>
  );
}