import Image from "next/image";
import RatingStars from "./RatingStars";

interface ReviewCardProps {
  quote: string;
  name: string;
  timeAgo: string;
  verified?: boolean;
  avatarUrl?: string;
  rating: number;
}

export default function ReviewCard({
  quote,
  name,
  timeAgo,
  verified = true,
  avatarUrl,
  rating,
}: ReviewCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-6">
      <RatingStars rating={rating} size={14} />
      <p className="text-sm leading-relaxed text-neutral-700">&ldquo;{quote}&rdquo;</p>
      <div className="mt-auto flex items-center gap-3">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={name}
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-sm font-medium text-amber-800">
            {name.charAt(0)}
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-neutral-900">{name}</p>
          <p className="text-xs text-neutral-500">
            {timeAgo}
            {verified && " · ✓ Verified"}
          </p>
        </div>
      </div>
    </div>
  );
}