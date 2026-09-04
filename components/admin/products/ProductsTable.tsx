"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Button from "@/components/system/Button";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  badge?: string;
  rating: number;
  reviews: number;
  images: string[];
}

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products ?? []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Delete this product? This can't be undone.");
    if (!confirmed) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      }
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-600">{loading ? "Loading..." : `${products.length} products`}</p>
        <Link href="/admin/products/new">
          <Button variant="primary" size="md">
            <span className="flex items-center gap-2">
              <Plus size={16} /> Add Product
            </span>
          </Button>
        </Link>
      </div>

      <div className="mt-5 overflow-x-auto rounded-xl bg-white">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-100 bg-[#F3EFE7]/60 text-xs uppercase tracking-wider text-neutral-500">
              <th className="px-6 py-3 font-medium">Product</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Price</th>
              <th className="px-6 py-3 font-medium">Badge</th>
              <th className="px-6 py-3 font-medium">Rating</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-neutral-50 last:border-0">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-[#F3EFE7]">
                      {product.images?.[0] ? (
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                      ) : null}
                    </div>
                    <span className="font-medium text-neutral-900">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-neutral-600">{product.category}</td>
                <td className="px-6 py-4 font-medium text-neutral-900">${product.price}</td>
                <td className="px-6 py-4 text-neutral-600">{product.badge && product.badge !== "None" ? product.badge : "—"}</td>
                <td className="px-6 py-4 text-neutral-600">
                  {product.rating} ({product.reviews})
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3 text-neutral-500">
                    <Link href={`/admin/products/${product._id}/edit`} aria-label="Edit product" className="hover:text-amber-700">
                      <Pencil size={16} />
                    </Link>
                    <button
                      aria-label="Delete product"
                      onClick={() => handleDelete(product._id)}
                      disabled={deletingId === product._id}
                      className="hover:text-red-600 disabled:opacity-40"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && products.length === 0 && (
          <p className="px-6 py-10 text-center text-sm text-neutral-500">
            No products yet — click + Add Product to get started.
          </p>
        )}
      </div>
    </div>
  );
}