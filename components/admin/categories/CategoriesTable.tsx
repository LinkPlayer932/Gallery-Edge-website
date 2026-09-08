"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GripVertical, Plus } from "lucide-react";
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
}

export default function CategoriesTable() {
  const { showToast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmTarget, setConfirmTarget] = useState<Category | null>(null);

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
        <p className="text-sm text-neutral-600">
          {loading ? "Loading..." : `${categories.length} categories · drag rows to reorder homepage display`}
        </p>
        <Link href="/admin/categories/new">
          <Button variant="primary" size="md">
            <span className="flex items-center gap-2">
              <Plus size={16} /> Add Category
            </span>
          </Button>
        </Link>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {categories.map((cat, i) => (
          <div key={cat._id} className="flex items-center gap-4 rounded-xl bg-white p-4">
            <GripVertical size={16} className="cursor-grab text-neutral-300" />
            <span className="w-4 text-sm text-neutral-400">{i + 1}</span>
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-[#F3EFE7]">
              {cat.image ? <Image src={cat.image} alt={cat.name} fill className="object-cover" /> : null}
            </div>
            <div className="flex-1">
              <p className="font-medium text-neutral-900">
                {cat.name} {cat.featured && <span className="ml-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">Featured</span>}
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
        ))}

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