"use client";

import { useEffect, useState } from "react";
import { X, Sparkles, Loader2, DollarSign, Percent, Layers } from "lucide-react";
import Button from "@/components/system/Button";
import { useToast } from "@/components/system/ToastProvider";

interface CategoryOption {
  _id: string;
  name: string;
  slug: string;
}

interface SizeRule {
  size: string;
  price: string;
  compareAtPrice: string;
}

interface BulkPriceModalProps {
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

export default function BulkPriceModal({ open, onClose, onUpdated }: BulkPriceModalProps) {
  const { showToast } = useToast();

  const [scope, setScope] = useState<"all" | "category">("all");
  const [categorySlug, setCategorySlug] = useState("");
  const [categories, setCategories] = useState<CategoryOption[]>([]);

  const [mode, setMode] = useState<"size-wise" | "percentage" | "flat-base">("size-wise");

  // Size-wise rates
  const [sizeRules, setSizeRules] = useState<SizeRule[]>([
    { size: "12x18", price: "", compareAtPrice: "" },
    { size: "18x24", price: "", compareAtPrice: "" },
    { size: "24x36", price: "", compareAtPrice: "" },
  ]);

  // Percentage mode
  const [percentage, setPercentage] = useState("");

  // Flat base mode
  const [flatBasePrice, setFlatBasePrice] = useState("");
  const [flatComparePrice, setFlatComparePrice] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    async function loadData() {
      try {
        const [catRes, sizeRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/options?type=size"),
        ]);
        const catData = await catRes.json();
        const sizeData = await sizeRes.json();

        setCategories(catData.categories || []);
        if (catData.categories?.length && !categorySlug) {
          setCategorySlug(catData.categories[0].slug);
        }

        if (sizeData.options?.length) {
          const loadedSizes: string[] = sizeData.options.map((o: any) => o.value);
          setSizeRules((prev) => {
            return loadedSizes.map((sz) => {
              const existing = prev.find((p) => p.size === sz);
              return existing || { size: sz, price: "", compareAtPrice: "" };
            });
          });
        }
      } catch (err) {
        console.error("Failed to load initial data for bulk pricing:", err);
      }
    }
    loadData();
  }, [open]);

  if (!open) return null;

  function updateSizeRule(size: string, field: "price" | "compareAtPrice", value: string) {
    setSizeRules((prev) =>
      prev.map((r) => (r.size === size ? { ...r, [field]: value } : r))
    );
  }

  async function handleApply() {
    setLoading(true);
    try {
      const payload: any = {
        scope,
        categorySlug: scope === "category" ? categorySlug : undefined,
        mode,
      };

      if (mode === "size-wise") {
        const activeRules = sizeRules
          .filter((r) => r.price && Number(r.price) > 0)
          .map((r) => ({
            size: r.size,
            price: Number(r.price),
            compareAtPrice: r.compareAtPrice ? Number(r.compareAtPrice) : undefined,
          }));

        if (!activeRules.length) {
          showToast("Please enter a price for at least one size", "error");
          setLoading(false);
          return;
        }

        payload.sizeRules = activeRules;
        // Lowest variant is default base price
        payload.basePrice = Math.min(...activeRules.map((r) => r.price));
      } else if (mode === "percentage") {
        if (!percentage || isNaN(Number(percentage))) {
          showToast("Please enter a valid percentage number", "error");
          setLoading(false);
          return;
        }
        payload.percentageChange = Number(percentage);
      } else if (mode === "flat-base") {
        if (!flatBasePrice || Number(flatBasePrice) <= 0) {
          showToast("Please enter a valid Base Price", "error");
          setLoading(false);
          return;
        }
        payload.basePrice = Number(flatBasePrice);
        payload.baseCompareAtPrice = flatComparePrice ? Number(flatComparePrice) : undefined;
      }

      const res = await fetch("/api/products/bulk-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || "Failed to update prices", "error");
      } else {
        showToast(data.message || "Product prices updated successfully!");
        onUpdated();
        onClose();
      }
    } catch {
      showToast("Could not connect to the server", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="font-serif text-lg font-semibold text-neutral-900">
                Bulk Update Product Prices
              </h2>
              <p className="text-xs text-neutral-500">
                Update prices across multiple products in seconds
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scope selector */}
        <div className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-2">
              1. Select Products to Update
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setScope("all")}
                className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-sm font-medium transition-all ${
                  scope === "all"
                    ? "border-amber-700 bg-amber-50/60 text-amber-900 ring-2 ring-amber-700/20"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                }`}
              >
                <Layers size={16} /> All Products
              </button>
              <button
                type="button"
                onClick={() => setScope("category")}
                className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-sm font-medium transition-all ${
                  scope === "category"
                    ? "border-amber-700 bg-amber-50/60 text-amber-900 ring-2 ring-amber-700/20"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                }`}
              >
                Specific Category
              </button>
            </div>

            {scope === "category" && (
              <div className="mt-3">
                <select
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-amber-700"
                >
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Mode Selector */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block mb-2">
              2. Choose Update Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setMode("size-wise")}
                className={`rounded-xl border p-2.5 text-center text-xs font-medium transition-all ${
                  mode === "size-wise"
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                }`}
              >
                Size-Wise Rates
              </button>
              <button
                type="button"
                onClick={() => setMode("percentage")}
                className={`rounded-xl border p-2.5 text-center text-xs font-medium transition-all ${
                  mode === "percentage"
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                }`}
              >
                Percentage (±%)
              </button>
              <button
                type="button"
                onClick={() => setMode("flat-base")}
                className={`rounded-xl border p-2.5 text-center text-xs font-medium transition-all ${
                  mode === "flat-base"
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"
                }`}
              >
                Flat Base Rate
              </button>
            </div>
          </div>

          {/* Mode Input Content */}
          <div className="rounded-xl border border-neutral-200 bg-[#FAF7F2]/60 p-4">
            {mode === "size-wise" && (
              <div>
                <p className="text-xs font-medium text-neutral-700 mb-3">
                  Enter new standard rates for each size. Selected products with these sizes will be updated:
                </p>
                <div className="space-y-2.5">
                  {sizeRules.map((rule) => (
                    <div
                      key={rule.size}
                      className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-2.5 shadow-2xs"
                    >
                      <span className="w-20 rounded bg-neutral-900 px-2 py-1 text-center text-xs font-semibold text-white">
                        {rule.size}
                      </span>
                      <div className="flex-1">
                        <input
                          type="number"
                          placeholder="Price (PKR)"
                          value={rule.price}
                          onChange={(e) => updateSizeRule(rule.size, "price", e.target.value)}
                          className="w-full rounded-md border border-neutral-300 px-2.5 py-1 text-xs text-neutral-900 outline-none focus:border-amber-700"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="number"
                          placeholder="Compare-at (PKR)"
                          value={rule.compareAtPrice}
                          onChange={(e) =>
                            updateSizeRule(rule.size, "compareAtPrice", e.target.value)
                          }
                          className="w-full rounded-md border border-neutral-300 px-2.5 py-1 text-xs text-neutral-900 outline-none focus:border-amber-700"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mode === "percentage" && (
              <div>
                <p className="text-xs font-medium text-neutral-700 mb-2">
                  Set Discount Percentage Badge (e.g. Save 50%, Save 40%, Save 30%):
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      placeholder="e.g. 50 (for Save 50%), 40 (for Save 40%)"
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-amber-700"
                    />
                  </div>
                  <span className="text-sm font-semibold text-neutral-500">%</span>
                </div>
                <p className="mt-2 text-[11px] text-neutral-500">
                  Example: Type <strong className="text-neutral-700">50</strong> to show <span className="rounded bg-orange-100 px-1.5 py-0.5 text-[10px] font-semibold text-orange-700">Save 50%</span> badge and cut price on all product sizes!
                </p>
              </div>
            )}

            {mode === "flat-base" && (
              <div>
                <p className="text-xs font-medium text-neutral-700 mb-2">
                  Set a single standard Base Price for all chosen products:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-neutral-600 block mb-1">
                      Base Price (PKR) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 2500"
                      value={flatBasePrice}
                      onChange={(e) => setFlatBasePrice(e.target.value)}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-amber-700"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-neutral-600 block mb-1">
                      Compare-at Price (PKR)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 3500"
                      value={flatComparePrice}
                      onChange={(e) => setFlatComparePrice(e.target.value)}
                      className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-amber-700"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-end gap-3 border-t border-neutral-100 pt-4">
          <Button variant="ghost" size="md" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleApply}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" /> Updating...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Sparkles size={16} /> Apply Prices Now
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
