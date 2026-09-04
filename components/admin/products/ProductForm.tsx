"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ImageIcon, Loader2, X } from "lucide-react";
import Input from "@/components/system/Input";
import Select from "@/components/system/Select";
import Textarea from "@/components/system/Textarea";
import Button from "@/components/system/Button";
import { useToast } from "@/components/system/ToastProvider";

const availableSizes = ["8x10", "11x14", "16x20", "20x24", "24x30"];
const availableFinishes = ["Natural Walnut", "Dark Walnut", "Natural Oak", "Gallery White", "Aged Bronze", "Ebony"];

type UploadedImage = { url: string; publicId: string };

interface CategoryOption {
  _id: string;
  name: string;
  slug: string;
}

export interface ExistingProduct {
  _id: string;
  name: string;
  category: string;
  badge?: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  sizes: string[];
  finishes: string[];
  images: string[];
  status: "Active" | "Draft";
}

export default function ProductForm({ product }: { product?: ExistingProduct }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();
  const isEdit = !!product;

  const [name, setName] = useState(product?.name ?? "");
  const [category, setCategory] = useState(product?.category ?? "");
  const [badge, setBadge] = useState(product?.badge ?? "None");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product?.price != null ? String(product.price) : "");
  const [compareAtPrice, setCompareAtPrice] = useState(
    product?.compareAtPrice != null ? String(product.compareAtPrice) : ""
  );
  const [stock, setStock] = useState(product?.stock != null ? String(product.stock) : "");
  const [selectedSizes, setSelectedSizes] = useState<string[]>(product?.sizes ?? []);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>(product?.finishes ?? []);

  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [images, setImages] = useState<UploadedImage[]>(
    product?.images?.map((url, i) => ({ url, publicId: `existing-${i}` })) ?? []
  );
  const [uploadingCount, setUploadingCount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [imageError, setImageError] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/categories", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load categories");
        const data = await res.json();
        setCategoryOptions(data.categories || []);
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setCategoriesLoading(false);
      }
    }
    loadCategories();
  }, []);

  function toggleSize(size: string) {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
  }
  function toggleFinish(finish: string) {
    setSelectedFinishes((prev) => (prev.includes(finish) ? prev.filter((f) => f !== finish) : [...prev, finish]));
  }

  async function uploadFiles(files: FileList | File[]) {
    setImageError("");
    const fileArray = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (fileArray.length === 0) return;

    setUploadingCount((c) => c + fileArray.length);

    const results = await Promise.allSettled(
      fileArray.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Upload failed");
        return { url: data.url as string, publicId: data.publicId as string };
      })
    );

    const successes: UploadedImage[] = [];
    let failures = 0;
    for (const result of results) {
      if (result.status === "fulfilled") successes.push(result.value);
      else failures++;
    }

    if (successes.length > 0) setImages((prev) => [...prev, ...successes]);
    if (failures > 0) setImageError(`${failures} image${failures > 1 ? "s" : ""} failed to upload. Please try again.`);

    setUploadingCount((c) => c - fileArray.length);
  }

  function removeImage(publicId: string) {
    setImages((prev) => prev.filter((img) => img.publicId !== publicId));
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
  }

  async function handleSubmit(e: React.FormEvent, status: "Active" | "Draft") {
    e.preventDefault();
    setError("");

    if (uploadingCount > 0) {
      setError("Please wait for images to finish uploading.");
      return;
    }

    setSubmitting(true);

    try {
      const url = isEdit ? `/api/products/${product!._id}` : "/api/products";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category,
          badge,
          description,
          price: Number(price),
          compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
          stock: Number(stock) || 0,
          sizes: selectedSizes,
          finishes: selectedFinishes,
          images: images.map((img) => img.url),
          status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        showToast(data.error ?? "Failed to save product", "error");
        setSubmitting(false);
        return;
      }

      showToast(isEdit ? "Product updated successfully" : "Product saved successfully");
      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Could not reach the server. Please try again.");
      showToast("Could not reach the server. Please try again.", "error");
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Link href="/admin/products" className="flex items-center gap-1 text-sm font-medium text-amber-700 hover:underline">
        <ArrowLeft size={14} /> Back to Products
      </Link>

      <form
        onSubmit={(e) => handleSubmit(e, isEdit ? (product!.status as "Active" | "Draft") : "Active")}
        className="mt-4 max-w-2xl rounded-xl bg-white p-8"
      >
        <p className="font-serif text-xl font-semibold text-neutral-900">
          {isEdit ? "Edit Product" : "Add New Product"}
        </p>

        <p className="mt-6 border-b border-neutral-100 pb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Basic Information
        </p>

        <div className="mt-4">
          <Input
            id="product-name"
            label="Product Name"
            placeholder="e.g. Dark Walnut 16x20 Frame"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <Select
            id="product-category"
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">
              {categoriesLoading ? "Loading categories..." : "Select category"}
            </option>
            {categoryOptions.map((cat) => (
              <option key={cat._id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </Select>
          <Select id="product-badge" label="Badge" value={badge} onChange={(e) => setBadge(e.target.value)}>
            <option value="None">None</option>
            <option value="Bestseller">Bestseller</option>
            <option value="New">New</option>
          </Select>
        </div>

        <div className="mt-4">
          <Textarea
            id="product-description"
            label="Description"
            placeholder="Describe this frame — wood type, finish, ideal artwork size..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <p className="mt-8 border-b border-neutral-100 pb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Pricing &amp; Inventory
        </p>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <Input id="product-price" label="Price" type="number" placeholder="$.00" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <Input id="product-compare-price" label="Compare-at Price" type="number" placeholder="$.00" value={compareAtPrice} onChange={(e) => setCompareAtPrice(e.target.value)} />
          <Input id="product-stock" label="Stock Quantity" type="number" placeholder="0" value={stock} onChange={(e) => setStock(e.target.value)} />
        </div>

        <p className="mt-8 border-b border-neutral-100 pb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Options
        </p>

        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-600">Available Sizes</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {availableSizes.map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => toggleSize(size)}
                className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                  selectedSizes.includes(size)
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-600">Finish / Color Options</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {availableFinishes.map((finish) => (
              <button
                type="button"
                key={finish}
                onClick={() => toggleFinish(finish)}
                className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                  selectedFinishes.includes(finish)
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
                }`}
              >
                {finish}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-8 border-b border-neutral-100 pb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Product Images
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) uploadFiles(e.target.files);
            e.target.value = "";
          }}
        />

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed py-12 text-center transition-colors ${
            isDragging ? "border-amber-500 bg-amber-50" : "border-neutral-300 bg-[#FAF7F2]"
          }`}
        >
          {uploadingCount > 0 ? (
            <Loader2 size={28} className="animate-spin text-amber-600" />
          ) : (
            <ImageIcon size={28} className="text-neutral-400" />
          )}
          <p className="mt-3 text-sm text-neutral-600">
            {uploadingCount > 0
              ? `Uploading ${uploadingCount} image${uploadingCount > 1 ? "s" : ""}...`
              : (
                <>
                  Drag &amp; drop images here, or <span className="font-medium text-amber-700">browse</span>
                </>
              )}
          </p>
          <p className="mt-1 text-xs text-neutral-400">JPG, PNG or WebP — up to 10MB each</p>
        </div>

        {imageError && <p className="mt-2 text-sm text-red-600">{imageError}</p>}

        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-4 gap-3">
            {images.map((img) => (
              <div key={img.publicId} className="group relative aspect-square overflow-hidden rounded-lg border border-neutral-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(img.publicId);
                  }}
                  className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label="Remove image"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-8 flex gap-3">
          <Button type="submit" variant="primary" size="lg" className="flex-1" disabled={submitting || uploadingCount > 0}>
            {submitting ? "Saving..." : isEdit ? "Save Changes" : "Publish Product"}
          </Button>
          {!isEdit && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled={submitting || uploadingCount > 0}
              onClick={(e) => handleSubmit(e as unknown as React.FormEvent, "Draft")}
            >
              Save as Draft
            </Button>
          )}
          <Link href="/admin/products">
            <Button type="button" variant="ghost" size="lg">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}