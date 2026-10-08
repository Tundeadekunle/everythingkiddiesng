import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number | string;
  reviewsCount?: number;
  showCount?: boolean;
  size?: number;
}

export function RatingStars({
  rating,
  reviewsCount,
  showCount = true,
  size = 16,
}: RatingStarsProps) {
  const numericRating = typeof rating === "string" ? parseFloat(rating) : rating;
  const clampedRating = Math.max(0, Math.min(5, isNaN(numericRating) ? 5 : numericRating));

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={`${
              star <= Math.round(clampedRating)
                ? "text-amber-400 fill-amber-400"
                : "text-slate-200 fill-slate-100"
            } transition-colors`}
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-slate-700">
        {clampedRating.toFixed(1)}
      </span>
      {showCount && reviewsCount !== undefined && (
        <span className="text-xs text-slate-400">({reviewsCount})</span>
      )}
    </div>
  );
}
