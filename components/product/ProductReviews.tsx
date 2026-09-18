"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  X,
  Loader2,
  PenLine,
  Filter,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";
import Button from "@/components/system/Button";

interface ReviewItem {
  _id: string;
  name: string;
  email: string;
  rating: number;
  title?: string;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string;
}

interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

interface ProductReviewsProps {
  productId?: string;
  productSlug: string;
  productName: string;
}

const RATING_LABELS: Record<number, string> = {
  1: "Poor - Not as expected",
  2: "Fair - Room for improvement",
  3: "Average - Meets expectations",
  4: "Good - Very pleased",
  5: "Exceptional - Exceeded expectations!",
};

export default function ProductReviews({
  productId,
  productSlug,
  productName,
}: ProductReviewsProps) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [stats, setStats] = useState<ReviewStats>({
    averageRating: 0,
    totalReviews: 0,
    distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  // Form inputs
  const [formRating, setFormRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formComment, setFormComment] = useState("");

  // Filter & Sort
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "highest" | "lowest">("newest");
  const [helpfulMap, setHelpfulMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function loadReviews() {
      try {
        setLoading(true);
        const query = productId
          ? `productId=${productId}`
          : `slug=${productSlug}`;
        const res = await fetch(`/api/reviews?${query}`);
        if (!res.ok) throw new Error("Failed to load reviews");
        const data = await res.json();
        setReviews(data.reviews || []);
        if (data.stats) {
          setStats(data.stats);
        }
      } catch (err: any) {
        console.error("Error loading reviews:", err);
        setError(err.message || "Failed to load reviews");
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, [productId, productSlug]);

  async function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    if (!formName.trim() || !formEmail.trim() || !formComment.trim()) {
      setFormError("Please fill in your name, email, and review comment.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: productId || productSlug,
          name: formName.trim(),
          email: formEmail.trim(),
          rating: formRating,
          title: formTitle.trim(),
          comment: formComment.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      setFormSuccess(true);
      if (data.review) {
        setReviews((prev) => [data.review, ...prev]);
      }
      if (data.stats) {
        setStats(data.stats);
      }

      setTimeout(() => {
        setIsModalOpen(false);
        setFormSuccess(false);
        setFormName("");
        setFormEmail("");
        setFormTitle("");
        setFormComment("");
        setFormRating(5);
      }, 1500);
    } catch (err: any) {
      setFormError(err.message || "Something went wrong while submitting.");
    } finally {
      setSubmitting(false);
    }
  }

  const toggleHelpful = (id: string) => {
    setHelpfulMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredAndSortedReviews = useMemo(() => {
    let result = [...reviews];

    if (selectedStarFilter !== null) {
      result = result.filter((r) => r.rating === selectedStarFilter);
    }

    result.sort((a, b) => {
      if (sortBy === "highest") return b.rating - a.rating;
      if (sortBy === "lowest") return a.rating - b.rating;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return result;
  }, [reviews, selectedStarFilter, sortBy]);

  const activeStarCount = hoverRating !== null ? hoverRating : formRating;

  return (
    <section id="reviews" className="mt-16 scroll-mt-10">
      {/* Section Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-neutral-200 pb-6 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-700">
            Customer Feedback
          </span>
          <h2 className="mt-1 font-serif text-2xl font-semibold text-neutral-900 sm:text-3xl">
            Customer Reviews
          </h2>
          <p className="mt-1 text-sm text-neutral-600">
            Real experiences from art lovers and verified collectors.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <PenLine size={16} />
          Write a Review
        </Button>
      </div>

      {/* Ratings & Breakdown Bar */}
      <div className="mt-8 grid grid-cols-1 gap-8 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 lg:grid-cols-12">
        {/* Left: Overall Score */}
        <div className="flex flex-col items-center justify-center border-b border-neutral-100 pb-6 text-center lg:col-span-4 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
          <div className="font-serif text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl">
            {stats.averageRating > 0 ? stats.averageRating.toFixed(1) : "5.0"}
          </div>
          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={20}
                className={
                  i < Math.round(stats.averageRating || 5)
                    ? "fill-amber-500 text-amber-500"
                    : "fill-neutral-200 text-neutral-200"
                }
              />
            ))}
          </div>
          <p className="mt-2 text-sm font-medium text-neutral-700">
            Based on {stats.totalReviews} {stats.totalReviews === 1 ? "review" : "reviews"}
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            100% genuine feedback from authentic collectors
          </p>
        </div>

        {/* Right: Star Breakdown Bars */}
        <div className="flex flex-col justify-center space-y-2.5 lg:col-span-8 lg:pl-4">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = stats.distribution[star as keyof typeof stats.distribution] || 0;
            const percentage =
              stats.totalReviews > 0 ? Math.round((count / stats.totalReviews) * 100) : 0;
            const isFilterActive = selectedStarFilter === star;

            return (
              <button
                key={star}
                type="button"
                onClick={() =>
                  setSelectedStarFilter((prev) => (prev === star ? null : star))
                }
                className={`group flex items-center gap-3 rounded-lg px-2 py-1 text-left transition-colors ${
                  isFilterActive ? "bg-amber-50" : "hover:bg-neutral-50"
                }`}
              >
                <div className="flex w-14 items-center gap-1 text-xs font-semibold text-neutral-700">
                  <span>{star}</span>
                  <Star size={12} className="fill-amber-500 text-amber-500" />
                </div>

                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isFilterActive ? "bg-amber-600" : "bg-neutral-900 group-hover:bg-amber-700"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="w-16 text-right text-xs text-neutral-500">
                  <span>{count}</span>
                  <span className="ml-1 text-[10px] text-neutral-400">({percentage}%)</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-4 text-xs">
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-neutral-500" />
          <span className="font-medium text-neutral-700">Filter:</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedStarFilter(null)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                selectedStarFilter === null
                  ? "bg-neutral-900 text-white"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400"
              }`}
            >
              All Stars ({stats.totalReviews})
            </button>
            {[5, 4, 3, 2, 1].map((s) => {
              const count = stats.distribution[s as keyof typeof stats.distribution] || 0;
              if (count === 0 && selectedStarFilter !== s) return null;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedStarFilter(s)}
                  className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    selectedStarFilter === s
                      ? "bg-amber-700 text-white"
                      : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <span>{s}★</span>
                  <span>({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown size={14} className="text-neutral-500" />
          <span className="font-medium text-neutral-700">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-lg border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-800 focus:border-amber-600 focus:outline-none"
          >
            <option value="newest">Most Recent</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
      </div>

      {/* Reviews List or Empty State */}
      <div className="mt-6 space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-neutral-400">
            <Loader2 size={28} className="animate-spin text-amber-700" />
            <p className="mt-2 text-xs">Loading verified reviews...</p>
          </div>
        ) : filteredAndSortedReviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-700">
              <Sparkles size={24} />
            </div>
            <h3 className="mt-3 font-serif text-lg font-semibold text-neutral-900">
              {selectedStarFilter !== null
                ? `No ${selectedStarFilter}-star reviews found`
                : "Be the first to review this frame"}
            </h3>
            <p className="mt-1 max-w-sm text-xs text-neutral-500">
              {selectedStarFilter !== null
                ? "Try selecting another star rating filter or clearing your selection."
                : `Share your thoughts on ${productName} and help other art collectors make their choice.`}
            </p>
            {selectedStarFilter !== null ? (
              <Button
                variant="secondary"
                size="sm"
                className="mt-4"
                onClick={() => setSelectedStarFilter(null)}
              >
                Clear Filter
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                className="mt-4"
                onClick={() => setIsModalOpen(true)}
              >
                Write the First Review
              </Button>
            )}
          </div>
        ) : (
          filteredAndSortedReviews.map((rev) => {
            const formattedDate = new Date(rev.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            const isHelpful = helpfulMap[rev._id];

            return (
              <div
                key={rev._id}
                className="rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-300 hover:shadow-xs"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-700 to-amber-900 text-sm font-bold text-white shadow-xs">
                      {rev.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-neutral-900">
                          {rev.name}
                        </span>
                        {rev.verifiedPurchase && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 border border-emerald-200">
                            <CheckCircle2 size={12} className="text-emerald-600" />
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-neutral-400">{formattedDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 rounded-lg bg-[#FAF7F2] px-2.5 py-1 border border-neutral-200/80">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < rev.rating
                            ? "fill-amber-500 text-amber-500"
                            : "fill-neutral-200 text-neutral-200"
                        }
                      />
                    ))}
                    <span className="ml-1 text-xs font-semibold text-neutral-800">
                      {rev.rating}.0
                    </span>
                  </div>
                </div>

                {rev.title && (
                  <h4 className="mt-3 text-sm font-semibold text-neutral-900">
                    {rev.title}
                  </h4>
                )}

                <p className="mt-2 text-sm leading-relaxed text-neutral-700 whitespace-pre-line">
                  {rev.comment}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3 text-xs text-neutral-500">
                  <span>Museum-Grade Timber Frame Review</span>
                  <button
                    type="button"
                    onClick={() => toggleHelpful(rev._id)}
                    className={`flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors ${
                      isHelpful
                        ? "bg-amber-50 text-amber-800 font-semibold"
                        : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                    }`}
                  >
                    <ThumbsUp size={13} className={isHelpful ? "fill-amber-700 text-amber-700" : ""} />
                    {isHelpful ? "Helpful (1)" : "Helpful"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs">
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
            >
              <X size={18} />
            </button>

            {formSuccess ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="mt-4 font-serif text-xl font-bold text-neutral-900">
                  Thank You for Your Review!
                </h3>
                <p className="mt-2 text-xs text-neutral-600">
                  Your review has been successfully submitted and helps the artisan community.
                </p>
              </div>
            ) : (
              <div>
                <div className="text-left">
                  <span className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                    Artisan Feedback
                  </span>
                  <h3 className="mt-1 font-serif text-2xl font-bold text-neutral-900">
                    Write a Review
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500">
                    Reviewing <span className="font-semibold text-neutral-800">{productName}</span>
                  </p>
                </div>

                {formError && (
                  <div className="mt-4 rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleSubmitReview} className="mt-5 space-y-4">
                  {/* Interactive Star Rating */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700">
                      Overall Rating <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2 flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setFormRating(star)}
                          className="rounded-sm p-1 transition-transform hover:scale-110 focus:outline-none"
                        >
                          <Star
                            size={28}
                            className={
                              star <= activeStarCount
                                ? "fill-amber-500 text-amber-500"
                                : "fill-neutral-200 text-neutral-200"
                            }
                          />
                        </button>
                      ))}
                    </div>
                    <p className="mt-1.5 text-xs font-medium text-amber-800">
                      {RATING_LABELS[activeStarCount]}
                    </p>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Tariq Mehmood"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        required
                        className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-amber-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Your Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="tariq@example.com"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        required
                        className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-amber-600 focus:outline-none"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    We match your email with purchase records to verify authentic buyers.
                  </p>

                  {/* Review Headline / Title */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Review Title / Headline (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Exceptional timber grain and finish!"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-amber-600 focus:outline-none"
                    />
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Your Review <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Write your feedback regarding the build quality, wood finish, glass clarity, and packaging..."
                      value={formComment}
                      onChange={(e) => setFormComment(e.target.value)}
                      required
                      className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-amber-600 focus:outline-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex justify-end gap-3 pt-2">
                    <Button
                      type="button"
                      variant="secondary"
                      size="md"
                      onClick={() => setIsModalOpen(false)}
                      disabled={submitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={submitting}
                      className="flex items-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Review"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}