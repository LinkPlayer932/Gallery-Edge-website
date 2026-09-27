"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GripVertical, Plus, ChevronUp, ChevronDown, Check, Loader2 } from "lucide-react";
import Button from "@/components/system/Button";
import ConfirmDialog from "@/components/system/ConfirmDialog";
import { useToast } from "@/components/system/ToastProvider";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
  featured: boolean;
  order?: number;
}

export default function CategoriesTable() {
  const { showToast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingOrder, setSavingOrder] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmTarget, setConfirmTarget] = useState<Category | null>(null);

  // Drag & Drop State
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data.categories ?? []);
    } catch {
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }

  async function saveCategoryOrder(newCategories: Category[]) {
    setSavingOrder(true);
    try {
      const payload = {
        items: newCategories.map((c, index) => ({
          _id: c._id,
          order: index + 1,
        })),
      };

      const res = await fetch("/api/categories/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast("Category order saved");
      } else {
        showToast("Failed to save order", "error");
      }
    } catch {
      showToast("Could not save new order", "error");
    } finally {
      setSavingOrder(false);
    }
  }

  function reorderList(fromIndex: number, toIndex: number) {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return;
    const updated = [...categories];
    const [movedItem] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedItem);
    setCategories(updated);
    saveCategoryOrder(updated);
  }

  // HTML5 Drag Handlers
  function handleDragStart(e: React.DragEvent<HTMLDivElement>, index: number) {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(index));
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>, index: number) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>, targetIndex: number) {
    e.preventDefault();
    if (draggedIndex === null) return;
    reorderList(draggedIndex, targetIndex);
    setDraggedIndex(null);
    setDragOverIndex(null);
  }

  function handleDragEnd() {
    setDraggedIndex(null);
    setDragOverIndex(null);
  }

  // Quick move up/down
  function moveUp(index: number) {
    if (index > 0) reorderList(index, index - 1);
  }

  function moveDown(index: number) {
    if (index < categories.length - 1) reorderList(index, index + 1);
  }

  async function handleDelete() {
    if (!confirmTarget) return;
    const id = confirmTarget._id;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c._id !== id));
        showToast("Category deleted successfully");
      } else {
        showToast("Failed to delete category", "error");
      }
    } catch {
      showToast("Could not reach the server", "error");
    } finally {
      setDeletingId(null);
      setConfirmTarget(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-sm text-neutral-600">
            {loading ? "Loading..." : `${categories.length} categories · drag cards or use arrows to reorder`}
          </p>
          {savingOrder && (
            <span className="flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs text-amber-800">
              <Loader2 size={12} className="animate-spin" /> Saving order...
            </span>
          )}
        </div>
        <Link href="/admin/categories/new">
          <Button variant="primary" size="md">
            <span className="flex items-center gap-2">
              <Plus size={16} /> Add Category
            </span>
          </Button>
        </Link>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {categories.map((cat, i) => {
          const isDragging = draggedIndex === i;
          const isOver = dragOverIndex === i && draggedIndex !== i;

          return (
            <div
              key={cat._id}
              draggable
              onDragStart={(e) => handleDragStart(e, i)}
              onDragOver={(e) => handleDragOver(e, i)}
              onDrop={(e) => handleDrop(e, i)}
              onDragEnd={handleDragEnd}
              className={`group flex items-center gap-4 rounded-xl bg-white p-4 transition-all duration-150 select-none ${
                isDragging
                  ? "opacity-40 scale-[0.99] border-2 border-dashed border-amber-400 shadow-inner"
                  : isOver
                  ? "border-2 border-amber-500 bg-amber-50/40 shadow-md"
                  : "border border-neutral-100 hover:border-neutral-300 hover:shadow-xs"
              }`}
            >
              {/* Drag Handle & Quick Order Buttons */}
              <div className="flex items-center gap-1 text-neutral-400">
                <div
                  className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700"
                  title="Drag up or down to reorder"
                >
                  <GripVertical size={18} />
                </div>
                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => moveUp(i)}
                    disabled={i === 0 || savingOrder}
                    title="Move up"
                    className="text-neutral-400 hover:text-neutral-800 disabled:opacity-20 p-0.5"
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(i)}
                    disabled={i === categories.length - 1 || savingOrder}
                    title="Move down"
                    className="text-neutral-400 hover:text-neutral-800 disabled:opacity-20 p-0.5"
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>

              <span className="w-5 text-sm font-semibold text-neutral-400">{i + 1}</span>

              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-[#F3EFE7]">
                {cat.image ? (
                  <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                ) : null}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-neutral-900 truncate">
                  {cat.name}{" "}
                  {cat.featured && (
                    <span className="ml-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700 font-normal">
                      Featured
                    </span>
                  )}
                </p>
                <p className="text-xs text-neutral-500">
                  /{cat.slug} · {cat.productCount} products
                </p>
              </div>

              <div className="flex gap-2">
                <Link href={`/admin/categories/${cat._id}/edit`}>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => setConfirmTarget(cat)}
                  disabled={deletingId === cat._id}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}

        {!loading && categories.length === 0 && (
          <p className="rounded-xl bg-white px-6 py-10 text-center text-sm text-neutral-500">
            No categories yet — click + Add Category to get started.
          </p>
        )}
      </div>

      <ConfirmDialog
        open={!!confirmTarget}
        title="Delete this category?"
        message={
          confirmTarget
            ? `"${confirmTarget.name}" will be permanently removed${
                confirmTarget.productCount > 0
                  ? `. It currently has ${confirmTarget.productCount} product(s) assigned`
                  : ""
              }. This can't be undone.`
            : ""
        }
        loading={deletingId === confirmTarget?._id}
        onConfirm={handleDelete}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
}