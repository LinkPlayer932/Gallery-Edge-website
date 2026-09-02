"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import CategoryForm, { ExistingCategory } from "@/components/admin/categories/CategoryForm";

export default function AdminEditCategoryPage() {
  const params = useParams();
  const [category, setCategory] = useState<ExistingCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/categories/${params.id}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setCategory(data.category);
      } catch (error) {
        console.error("Failed to load category:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  return (
    <div>
      <AdminTopbar title="Categories" />
      <div className="px-8 py-6">
        {loading ? (
          <div className="max-w-xl rounded-xl bg-white p-8 text-center text-sm text-neutral-500">
            Loading category...
          </div>
        ) : notFound || !category ? (
          <div className="max-w-xl rounded-xl bg-white p-8 text-center text-sm text-neutral-500">
            Category not found.
          </div>
        ) : (
          <CategoryForm category={category} />
        )}
      </div>
    </div>
  );
}