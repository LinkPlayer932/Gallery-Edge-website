"use client";

import { useEffect, useState, useMemo } from "react";
import { X, Trash2, Loader2, AlertTriangle, CheckSquare, Square, Search, RefreshCw } from "lucide-react";
import Button from "@/components/system/Button";
import { useToast } from "@/components/system/ToastProvider";

interface SizeItem {
  id: string;
  value: string;
  productCount: number;
  isOption: boolean;
}

interface BulkDeleteSizesModalProps {
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

export default function BulkDeleteSizesModal({
  open,
  onClose,
  onUpdated,
}: BulkDeleteSizesModalProps) {
  const { showToast } = useToast();
  const [sizes, setSizes] = useState<SizeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);
  const [confirmStep, setConfirmStep] = useState(false);

  useEffect(() => {
    if (open) {
      loadSizes();
      setSelectedSizes([]);
      setConfirmStep(false);
      setSearch("");
    }
  }, [open]);

  async function loadSizes() {
    setLoading(true);
    try {
      const res = await fetch("/api/options/sizes", { cache: "no-store" });
      const data = await res.json();
      if (res.ok) {
        setSizes(data.sizes || []);
      } else {
        showToast(data.error ?? "Failed to load sizes", "error");
      }
    } catch {
      showToast("Could not load sizes", "error");
    } finally {
      setLoading(false);
    }
  }

  const filteredSizes = useMemo(() => {
    if (!search.trim()) return sizes;
    return sizes.filter((s) =>
      s.value.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [sizes, search]);

  const allFilteredSelected =
    filteredSizes.length > 0 &&
    filteredSizes.every((s) => selectedSizes.includes(s.value));

  function toggleSelectAll() {
    if (allFilteredSelected) {
      const filteredValues = new Set(filteredSizes.map((s) => s.value));
      setSelectedSizes((prev) => prev.filter((val) => !filteredValues.has(val)));
    } else {
      const newSelected = new Set(selectedSizes);
      filteredSizes.forEach((s) => newSelected.add(s.value));
      setSelectedSizes(Array.from(newSelected));
    }
  }

  function toggleSize(val: string) {
    setSelectedSizes((prev) =>
      prev.includes(val) ? prev.filter((s) => s !== val) : [...prev, val]
    );
    if (confirmStep) setConfirmStep(false);
  }

  // Calculate affected products for selected sizes
  const totalAffectedProducts = useMemo(() => {
    const selectedSet = new Set(selectedSizes);
    return sizes
      .filter((s) => selectedSet.has(s.value))
      .reduce((sum, s) => sum + s.productCount, 0);
  }, [sizes, selectedSizes]);

  async function executeDelete(sizesToDelete: string[]) {
    if (!sizesToDelete.length) return;

    setDeleting(true);
    try {
      const res = await fetch("/api/options/sizes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sizes: sizesToDelete }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error ?? "Failed to delete sizes", "error");
        setDeleting(false);
        return;
      }

      const affected = data.affectedProducts ?? 0;
      const count = data.deletedSizes?.length ?? sizesToDelete.length;

      showToast(
        `Successfully deleted ${count} size${count > 1 ? "s" : ""}${
          affected > 0 ? ` and removed from ${affected} product${affected > 1 ? "s" : ""}` : ""
        }`
      );

      onUpdated();
      onClose();
    } catch {
      showToast("Could not reach the server. Please try again.", "error");
    } finally {
      setDeleting(false);
      setConfirmStep(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-red-600">
                <Trash2 size={18} />
              </span>
              <h2 className="font-serif text-xl font-semibold text-neutral-900">
                Bulk Delete Sizes
              </h2>
            </div>
            <p className="mt-1.5 text-xs text-neutral-500">
              Select sizes to delete. Deleted sizes will <strong>automatically be removed</strong> from all products that currently use them.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search & Actions toolbar */}
        <div className="mt-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search sizes (e.g. 12x18, A4)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2 pl-9 pr-3 text-xs text-neutral-900 focus:border-amber-600 focus:bg-white focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={loadSizes}
            disabled={loading}
            className="flex items-center gap-1 rounded-lg border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-50"
            title="Refresh list"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        {/* Selection Bar */}
        <div className="mt-3 flex items-center justify-between rounded-lg bg-[#FAF7F2] px-3 py-2 text-xs text-neutral-700">
          <button
            type="button"
            onClick={toggleSelectAll}
            disabled={loading || filteredSizes.length === 0}
            className="flex items-center gap-2 font-medium hover:text-amber-800 disabled:opacity-50"
          >
            {allFilteredSelected ? (
              <CheckSquare size={16} className="text-amber-700" />
            ) : (
              <Square size={16} className="text-neutral-400" />
            )}
            <span>
              {allFilteredSelected ? "Deselect All" : "Select All"} ({filteredSizes.length})
            </span>
          </button>

          <span className="font-semibold text-neutral-900">
            {selectedSizes.length} selected
          </span>
        </div>

        {/* Sizes List */}
        <div className="mt-3 max-h-64 space-y-1.5 overflow-y-auto pr-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-neutral-400">
              <Loader2 size={24} className="animate-spin text-amber-600" />
              <p className="mt-2 text-xs">Loading sizes &amp; product links...</p>
            </div>
          ) : filteredSizes.length === 0 ? (
            <div className="py-12 text-center text-xs text-neutral-400">
              {search ? "No sizes match your search." : "No sizes found in database."}
            </div>
          ) : (
            filteredSizes.map((item) => {
              const isSelected = selectedSizes.includes(item.value);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleSize(item.value)}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-2.5 transition-all ${
                    isSelected
                      ? "border-red-300 bg-red-50/40 text-neutral-900 shadow-xs"
                      : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSize(item.value);
                      }}
                      className="text-neutral-500"
                    >
                      {isSelected ? (
                        <CheckSquare size={17} className="text-red-600" />
                      ) : (
                        <Square size={17} className="text-neutral-300 hover:text-neutral-500" />
                      )}
                    </button>
                    <span className="font-mono text-sm font-semibold text-neutral-900">
                      {item.value}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.productCount > 0 ? (
                      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-medium text-amber-900">
                        Used in {item.productCount} product{item.productCount > 1 ? "s" : ""}
                      </span>
                    ) : (
                      <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-medium text-neutral-500">
                        Not in products
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          window.confirm(
                            `Are you sure you want to delete size "${item.value}"? It will automatically be removed from all products.`
                          )
                        ) {
                          executeDelete([item.value]);
                        }
                      }}
                      disabled={deleting}
                      className="rounded-md p-1.5 text-neutral-400 hover:bg-red-100 hover:text-red-600 disabled:opacity-40"
                      title={`Delete ${item.value}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Warning if products are affected */}
        {selectedSizes.length > 0 && (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-xs text-amber-900">
            <div className="flex items-start gap-2">
              <AlertTriangle size={16} className="mt-0.5 flex-shrink-0 text-amber-700" />
              <div>
                <p className="font-semibold">Auto-Removal Warning:</p>
                <p className="mt-0.5 text-amber-800">
                  Deleting {selectedSizes.length} size{selectedSizes.length > 1 ? "s" : ""} will automatically remove them from{" "}
                  <strong>{totalAffectedProducts} active product reference{totalAffectedProducts !== 1 ? "s" : ""}</strong> across the store.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation State Prompt */}
        {confirmStep && (
          <div className="mt-4 rounded-xl border-2 border-red-400 bg-red-50 p-4 text-xs text-red-900">
            <p className="font-bold text-sm text-red-950">
              Confirm Permanent Deletion?
            </p>
            <p className="mt-1 text-red-800">
              You are about to permanently delete <strong>{selectedSizes.length} sizes</strong> ({selectedSizes.join(", ")}). This action will update all matching products immediately.
            </p>
            <div className="mt-3 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmStep(false)}
                className="rounded-lg bg-white px-3 py-1.5 font-medium text-neutral-700 shadow-xs hover:bg-neutral-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => executeDelete(selectedSizes)}
                disabled={deleting}
                className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3.5 py-1.5 font-medium text-white shadow-xs hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                Yes, Delete Now
              </button>
            </div>
          </div>
        )}

        {/* Footer Buttons */}
        {!confirmStep && (
          <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onClose}
              disabled={deleting}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="primary"
              size="md"
              disabled={selectedSizes.length === 0 || deleting}
              onClick={() => setConfirmStep(true)}
              className="bg-red-600 text-white hover:bg-red-700 disabled:opacity-40"
            >
              <span className="flex items-center gap-1.5">
                <Trash2 size={16} /> Delete Selected ({selectedSizes.length})
              </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
