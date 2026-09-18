"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Plus,
  Search,
  ExternalLink,
  Loader2,
  X,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import Button from "@/components/system/Button";
import ConfirmDialog from "@/components/system/ConfirmDialog";
import { useToast } from "@/components/system/ToastProvider";

interface AdminReviewProduct {
  _id: string;
  name: string;
  slug: string;
  images?: string[];
  price?: number;
}

interface AdminReview {
  _id: string;
  productId: AdminReviewProduct | null;
  name: string;
  email: string;
  rating: number;
  title?: string;
  comment: string;
  verifiedPurchase: boolean;
  status: "Approved" | "Pending" | "Rejected";
  createdAt: string;
}

interface ProductOption {
  _id: string;
  name: string;
  slug: string;
}

export default function ReviewsManager() {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"All" | "Pending" | "Approved" | "Rejected">("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Action states
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Add Review Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [productsList, setProductsList] = useState<ProductOption[]>([]);
  const [addingReview, setAddingReview] = useState(false);

  // Add form states
  const [formProductId, setFormProductId] = useState("");
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState("");
  const [formComment, setFormComment] = useState("");
  const [formVerified, setFormVerified] = useState(true);
  const [formStatus, setFormStatus] = useState<"Approved" | "Pending">("Approved");

  async function loadReviews() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/reviews", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load reviews");
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (err: any) {
      console.error("Error loading admin reviews:", err);
      showToast("Failed to load reviews", "error");
    } finally {
      setLoading(false);
    }
  }

  async function loadProducts() {
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setProductsList(data.products || []);
        if (data.products?.length && !formProductId) {
          setFormProductId(data.products[0]._id);
        }
      }
    } catch (err) {
      console.error("Failed to load products for dropdown:", err);
    }
  }

  useEffect(() => {
    loadReviews();
    loadProducts();
  }, []);

  async function handleStatusChange(id: string, newStatus: "Approved" | "Pending" | "Rejected") {
    try {
      setUpdatingId(id);
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update review status");
      const data = await res.json();

      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
      );
      showToast(`Review marked as ${newStatus}`);
    } catch (err: any) {
      console.error("Error updating review:", err);
      showToast(err.message || "Failed to update review", "error");
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDeleteConfirm() {
    if (!deleteTargetId) return;

    try {
      setDeleting(true);
      const res = await fetch(`/api/admin/reviews/${deleteTargetId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete review");

      setReviews((prev) => prev.filter((r) => r._id !== deleteTargetId));
      showToast("Review deleted successfully");
      setDeleteTargetId(null);
    } catch (err: any) {
      console.error("Error deleting review:", err);
      showToast(err.message || "Failed to delete review", "error");
    } finally {
      setDeleting(false);
    }
  }

  async function handleCreateReview(e: React.FormEvent) {
    e.preventDefault();
    if (!formProductId || !formName || !formEmail || !formComment) {
      showToast("Please fill all required fields", "error");
      return;
    }

    try {
      setAddingReview(true);
      const res = await fetch("/api/admin/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: formProductId,
          name: formName.trim(),
          email: formEmail.trim(),
          rating: formRating,
          title: formTitle.trim(),
          comment: formComment.trim(),
          verifiedPurchase: formVerified,
          status: formStatus,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add review");

      if (data.review) {
        setReviews((prev) => [data.review, ...prev]);
      }
      showToast("Review added successfully");
      setIsAddModalOpen(false);

      // Reset fields
      setFormName("");
      setFormEmail("");
      setFormTitle("");
      setFormComment("");
      setFormRating(5);
    } catch (err: any) {
      showToast(err.message || "Failed to create review", "error");
    } finally {
      setAddingReview(false);
    }
  }

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((rev) => {
      const matchesTab = activeTab === "All" || rev.status === activeTab;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesTab;

      const productName = rev.productId?.name?.toLowerCase() || "";
      const name = rev.name.toLowerCase();
      const email = rev.email.toLowerCase();
      const comment = rev.comment.toLowerCase();
      const title = rev.title?.toLowerCase() || "";

      const matchesSearch =
        productName.includes(query) ||
        name.includes(query) ||
        email.includes(query) ||
        comment.includes(query) ||
        title.includes(query);

      return matchesTab && matchesSearch;
    });
  }, [reviews, activeTab, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: reviews.length,
      pending: reviews.filter((r) => r.status === "Pending").length,
      approved: reviews.filter((r) => r.status === "Approved").length,
      rejected: reviews.filter((r) => r.status === "Rejected").length,
      average:
        reviews.length > 0
          ? (
              reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
            ).toFixed(1)
          : "0.0",
    };
  }, [reviews]);

  return (
    <div className="space-y-6">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Total Reviews
          </p>
          <p className="mt-1 font-serif text-2xl font-bold text-neutral-900">
            {counts.all}
          </p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
            Pending Moderation
          </p>
          <p className="mt-1 font-serif text-2xl font-bold text-amber-700">
            {counts.pending}
          </p>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            Approved &amp; Live
          </p>
          <p className="mt-1 font-serif text-2xl font-bold text-emerald-700">
            {counts.approved}
          </p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Avg Store Rating
          </p>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="font-serif text-2xl font-bold text-neutral-900">
              {counts.average}
            </span>
            <Star size={18} className="fill-amber-500 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Action and Filter Bar */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-neutral-200 bg-white p-4 sm:flex-row sm:items-center">
        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2">
          {(["All", "Pending", "Approved", "Rejected"] as const).map((tab) => {
            const count =
              tab === "All"
                ? counts.all
                : tab === "Pending"
                ? counts.pending
                : tab === "Approved"
                ? counts.approved
                : counts.rejected;

            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    isActive ? "bg-white/20 text-white" : "bg-neutral-200 text-neutral-700"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Add button */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              placeholder="Search reviewer or product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50/50 py-1.5 pl-9 pr-3 text-xs text-neutral-900 focus:border-amber-600 focus:bg-white focus:outline-none"
            />
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 shrink-0"
          >
            <Plus size={14} />
            Add Review
          </Button>
        </div>
      </div>

      {/* Reviews Table / Feed */}
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-neutral-400">
            <Loader2 size={32} className="animate-spin text-amber-700" />
            <p className="mt-3 text-xs">Loading customer reviews...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="py-16 text-center">
            <MessageSquare size={36} className="mx-auto text-neutral-300" />
            <p className="mt-2 text-sm font-medium text-neutral-800">
              No reviews found
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              {searchQuery
                ? "Try searching for a different term or clear the search query."
                : "No customer reviews in this category yet."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {filteredReviews.map((rev) => {
              const isUpdating = updatingId === rev._id;
              const formattedDate = new Date(rev.createdAt).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }
              );

              return (
                <div key={rev._id} className="p-5 transition-colors hover:bg-[#FAF7F2]/30">
                  <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                    {/* Left: Product & Review Content */}
                    <div className="space-y-3 flex-1">
                      {/* Product Tag */}
                      <div className="flex items-center gap-2 text-xs">
                        {rev.productId ? (
                          <Link
                            href={`/shop/${rev.productId.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2.5 py-1 font-medium text-neutral-800 hover:bg-amber-100 hover:text-amber-900 transition-colors"
                          >
                            <span>{rev.productId.name}</span>
                            <ExternalLink size={12} className="text-neutral-500" />
                          </Link>
                        ) : (
                          <span className="inline-block rounded-md bg-neutral-100 px-2.5 py-1 text-neutral-500">
                            General / Removed Product
                          </span>
                        )}

                        <span className="text-neutral-400">·</span>
                        <span className="text-neutral-400">{formattedDate}</span>
                      </div>

                      {/* Reviewer Details & Rating */}
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-neutral-900">
                            {rev.name}
                          </span>
                          <span className="text-xs text-neutral-500">
                            ({rev.email})
                          </span>
                        </div>

                        {rev.verifiedPurchase && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 border border-emerald-200">
                            <ShieldCheck size={12} className="text-emerald-600" />
                            Verified Buyer
                          </span>
                        )}

                        <div className="flex items-center gap-0.5 rounded-md bg-amber-50 px-2 py-0.5 text-xs text-amber-800">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={
                                i < rev.rating
                                  ? "fill-amber-500 text-amber-500"
                                  : "fill-neutral-200 text-neutral-200"
                              }
                            />
                          ))}
                          <span className="ml-1 font-bold">{rev.rating}.0</span>
                        </div>
                      </div>

                      {/* Review Text */}
                      <div>
                        {rev.title && (
                          <h4 className="text-xs font-bold text-neutral-900 mb-1">
                            {rev.title}
                          </h4>
                        )}
                        <p className="text-xs leading-relaxed text-neutral-700 whitespace-pre-line">
                          {rev.comment}
                        </p>
                      </div>
                    </div>

                    {/* Right: Status and Action Buttons */}
                    <div className="flex items-center gap-3 self-end lg:self-start shrink-0">
                      {/* Status Badge */}
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          rev.status === "Approved"
                            ? "bg-emerald-100 text-emerald-800"
                            : rev.status === "Pending"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {rev.status === "Approved" && <CheckCircle2 size={12} />}
                        {rev.status === "Pending" && <Clock size={12} />}
                        {rev.status === "Rejected" && <XCircle size={12} />}
                        {rev.status}
                      </span>

                      {/* Quick Mod Buttons */}
                      <div className="flex items-center gap-1.5">
                        {rev.status !== "Approved" && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(rev._id, "Approved")}
                            disabled={isUpdating}
                            className="rounded-md border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 hover:bg-emerald-100 transition-colors disabled:opacity-50"
                          >
                            Approve
                          </button>
                        )}

                        {rev.status !== "Rejected" && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(rev._id, "Rejected")}
                            disabled={isUpdating}
                            className="rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition-colors disabled:opacity-50"
                          >
                            Reject
                          </button>
                        )}

                        {rev.status !== "Pending" && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(rev._id, "Pending")}
                            disabled={isUpdating}
                            className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800 hover:bg-amber-100 transition-colors disabled:opacity-50"
                          >
                            Pending
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setDeleteTargetId(rev._id)}
                          className="rounded-md p-1.5 text-neutral-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Delete review"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add / Pre-seed Review Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
            >
              <X size={18} />
            </button>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                Admin Review Tool
              </p>
              <h3 className="font-serif text-xl font-bold text-neutral-900">
                Add / Pre-seed Customer Review
              </h3>
              <p className="mt-1 text-xs text-neutral-500">
                Add genuine customer feedback or testimonials directly to any product.
              </p>
            </div>

            <form onSubmit={handleCreateReview} className="mt-5 space-y-4">
              {/* Product Selector */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Target Product <span className="text-red-500">*</span>
                </label>
                <select
                  value={formProductId}
                  onChange={(e) => setFormProductId(e.target.value)}
                  required
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                >
                  {productsList.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Customer Name and Email */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Customer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Zaid Malik"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Customer Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="zaid.malik@gmail.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    required
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Star Rating */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Star Rating (1 - 5)
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFormRating(s)}
                      className="p-1"
                    >
                      <Star
                        size={24}
                        className={
                          s <= formRating
                            ? "fill-amber-500 text-amber-500"
                            : "fill-neutral-200 text-neutral-200"
                        }
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-semibold text-neutral-700">
                    {formRating} Star{formRating > 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Review Title / Headline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Flawless Walnut Wood Finish"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Review Comment <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Customer's feedback regarding this frame..."
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  required
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none"
                />
              </div>

              {/* Options: Verified & Status */}
              <div className="grid grid-cols-2 gap-4 border-t border-neutral-100 pt-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-700 font-medium">
                  <input
                    type="checkbox"
                    checked={formVerified}
                    onChange={(e) => setFormVerified(e.target.checked)}
                    className="h-4 w-4 rounded border-neutral-300 text-amber-700 focus:ring-amber-500"
                  />
                  Mark as Verified Buyer
                </label>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Initial Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full rounded-md border border-neutral-300 px-2 py-1 text-xs text-neutral-800 focus:border-amber-600 focus:outline-none"
                  >
                    <option value="Approved">Approved (Live)</option>
                    <option value="Pending">Pending Moderation</option>
                  </select>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-neutral-100">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsAddModalOpen(false)}
                  disabled={addingReview}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={addingReview}
                  className="flex items-center gap-1.5"
                >
                  {addingReview ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save & Publish"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!deleteTargetId}
        title="Delete Review"
        message="Are you sure you want to permanently delete this customer review? This will also update the product rating calculations."
        confirmLabel="Delete Review"
        loading={deleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
