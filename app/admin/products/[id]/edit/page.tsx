"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import ProductForm, { ExistingProduct } from "@/components/admin/products/ProductForm";

export default function AdminEditProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<ExistingProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/products/${params.id}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Failed to load product:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  return (
    <div>
      <AdminTopbar title="Products" />
      <div className="px-8 py-6">
        {loading ? (
          <div className="max-w-2xl rounded-xl bg-white p-8 text-center text-sm text-neutral-500">
            Loading product...
          </div>
        ) : notFound || !product ? (
          <div className="max-w-2xl rounded-xl bg-white p-8 text-center text-sm text-neutral-500">
            Product not found.
          </div>
        ) : (
          <ProductForm product={product} />
        )}
      </div>
    </div>
  );
}