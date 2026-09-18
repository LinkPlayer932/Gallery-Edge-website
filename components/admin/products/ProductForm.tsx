"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ImageIcon, Loader2, Plus, X } from "lucide-react";
import Input from "@/components/system/Input";
import Select from "@/components/system/Select";
import Textarea from "@/components/system/Textarea";
import Button from "@/components/system/Button";
import SizeColorDialog from "@/components/system/SizeColorDialog";
import { useToast } from "@/components/system/ToastProvider";

type UploadedImage = { url: string; publicId: string };
type OptionItem = { id: string; value: string; isDefault: boolean };

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
  sizeVariants?: { size: string; price: number; compareAtPrice?: number }[];
  finishes: string[];
  images: string[];
  status: "Active" | "Draft";
}

type SizeVariantState = {
  size: string;
  price: string;
  compareAtPrice: string;
};

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

  // Sizes/finishes ab poori tarah database (Option collection) se aate hain — koi hardcoded default nahi
  const [sizeOptions, setSizeOptions] = useState<OptionItem[]>([]);
  const [finishOptions, setFinishOptions] = useState<OptionItem[]>([]);

  const [sizeVariants, setSizeVariants] = useState<SizeVariantState[]>(() => {
    if (product?.sizeVariants?.length) {
      return product.sizeVariants.map((sv) => ({
        size: sv.size,
        price: sv.price != null ? String(sv.price) : "",
        compareAtPrice: sv.compareAtPrice != null ? String(sv.compareAtPrice) : "",
      }));
    }
    if (product?.sizes?.length) {
      return product.sizes.map((s) => ({
        size: s,
        price: product.price != null ? String(product.price) : "",
        compareAtPrice: product.compareAtPrice != null ? String(product.compareAtPrice) : "",
      }));
    }
    return [];
  });

  const [selectedFinishes, setSelectedFinishes] = useState<string[]>(product?.finishes ?? []);

  // Controls the SizeColorDialog popup
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"size" | "color">("size");

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

  useEffect(() => {
    async function loadOptions() {
      try {
        const [sizeRes, colorRes] = await Promise.all([
          fetch("/api/options?type=size", { cache: "no-store" }),
          fetch("/api/options?type=color", { cache: "no-store" }),
        ]);
        const sizeData = await sizeRes.json();
        const colorData = await colorRes.json();

        let loadedSizes: OptionItem[] = (sizeData.options || []).map(
          (o: { _id: string; value: string }) => ({ id: o._id, value: o.value, isDefault: false })
        );
        let loadedFinishes: OptionItem[] = (colorData.options || []).map(
          (o: { _id: string; value: string }) => ({ id: o._id, value: o.value, isDefault: false })
        );

        // Edit mode: agar product ke apne sizes/finishes kisi wajah se DB list mein na hon, unhe bhi dikha dein
        const existingSizes = product?.sizeVariants?.map((v) => v.size) || product?.sizes || [];
        if (existingSizes.length) {
          const missing = existingSizes.filter((s) => !loadedSizes.some((o) => o.value === s));
          loadedSizes = [...loadedSizes, ...missing.map((s) => ({ id: s, value: s, isDefault: false }))];
        }
        if (product?.finishes?.length) {
          const missing = product.finishes.filter((f) => !loadedFinishes.some((o) => o.value === f));
          loadedFinishes = [...loadedFinishes, ...missing.map((f) => ({ id: f, value: f, isDefault: false }))];
        }

        setSizeOptions(loadedSizes);
        setFinishOptions(loadedFinishes);
      } catch (err) {
        console.error("Failed to load options:", err);
      }
    }
    loadOptions();
  }, [product]);

  function toggleSize(size: string) {
    setSizeVariants((prev) => {
      const exists = prev.some((v) => v.size === size);
      if (exists) {
        return prev.filter((v) => v.size !== size);
      } else {
        return [
          ...prev,
          {
            size,
            price: price || (prev[0]?.price ?? ""),
            compareAtPrice: compareAtPrice || (prev[0]?.compareAtPrice ?? ""),
          },
        ];
      }
    });
  }

  function updateSizeVariantPrice(size: string, field: "price" | "compareAtPrice", val: string) {
    setSizeVariants((prev) =>
      prev.map((v) => (v.size === size ? { ...v, [field]: val } : v))
    );
  }

  function toggleFinish(finish: string) {
    setSelectedFinishes((prev) => (prev.includes(finish) ? prev.filter((f) => f !== finish) : [...prev, finish]));
  }

  function openDialog(type: "size" | "color") {
    setDialogType(type);
    setDialogOpen(true);
  }

  function handleDialogAdded(item: OptionItem) {
    if (dialogType === "size") {
      setSizeOptions((prev) => [...prev, item]);
      setSizeVariants((prev) => {
        if (prev.some((v) => v.size === item.value)) return prev;
        return [
          ...prev,
          {
            size: item.value,
            price: price || (prev[0]?.price ?? ""),
            compareAtPrice: compareAtPrice || (prev[0]?.compareAtPrice ?? ""),
          },
        ];
      });
    } else {
      setFinishOptions((prev) => [...prev, item]);
      setSelectedFinishes((prev) => [...prev, item.value]);
    }
  }

  function handleDialogRemoved(id: string) {
    if (dialogType === "size") {
      const removed = sizeOptions.find((o) => o.id === id);
      setSizeOptions((prev) => prev.filter((o) => o.id !== id));
      if (removed) setSizeVariants((prev) => prev.filter((v) => v.size !== removed.value));
    } else {
      const removed = finishOptions.find((o) => o.id === id);
      setFinishOptions((prev) => prev.filter((o) => o.id !== id));
      if (removed) setSelectedFinishes((prev) => prev.filter((s) => s !== removed.value));
    }
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

    const formattedVariants = sizeVariants
      .filter((v) => v.size.trim())
      .map((v) => ({
        size: v.size.trim(),
        price: Number(v.price) || 0,
        compareAtPrice: v.compareAtPrice ? Number(v.compareAtPrice) : undefined,
      }));

    // If size variants exist, validate prices
    for (const variant of formattedVariants) {
      if (variant.price <= 0) {
        setError(`Please enter a valid price for size "${variant.size}".`);
        return;
      }
    }

    const basePrice =
      formattedVariants.length > 0
        ? formattedVariants[0].price
        : (Number(price) || 0);

    const baseComparePrice =
      formattedVariants.length > 0
        ? formattedVariants[0].compareAtPrice
        : (compareAtPrice ? Number(compareAtPrice) : undefined);

    if (!basePrice && formattedVariants.length === 0) {
      setError("Please specify a base price or at least one size variant with price.");
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
          price: basePrice,
          compareAtPrice: baseComparePrice,
          stock: Number(stock) || 0,
          sizes: formattedVariants.map((v) => v.size),
          sizeVariants: formattedVariants,
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
          Base Pricing &amp; Inventory
        </p>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <Input
            id="product-price"
            label="Base Price (PKR)"
            type="number"
            placeholder="PKR 0"
            value={price}
            onChange={(e) => {
              const val = e.target.value;
              setPrice(val);
              // If only one size or default variant exists and had no price, set it
              if (sizeVariants.length === 1 && !sizeVariants[0].price) {
                updateSizeVariantPrice(sizeVariants[0].size, "price", val);
              }
            }}
            required={sizeVariants.length === 0}
          />
          <Input id="product-compare-price" label="Compare-at Price (PKR)" type="number" placeholder="PKR 0" value={compareAtPrice} onChange={(e) => setCompareAtPrice(e.target.value)} />
          <Input id="product-stock" label="Stock Quantity" type="number" placeholder="0" value={stock} onChange={(e) => setStock(e.target.value)} />
        </div>

        <p className="mt-8 border-b border-neutral-100 pb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Options &amp; Variant Pricing
        </p>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-600">Available Sizes</p>
            <button
              type="button"
              onClick={() => openDialog("size")}
              className="flex items-center gap-1 text-xs font-medium text-amber-700 hover:underline"
            >
              <Plus size={13} /> Add New Size
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {sizeOptions.map((size) => {
              const isSelected = sizeVariants.some((v) => v.size === size.value);
              return (
                <button
                  type="button"
                  key={size.id}
                  onClick={() => toggleSize(size.value)}
                  className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                    isSelected
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
                  }`}
                >
                  {size.value}
                </button>
              );
            })}
          </div>

          {sizeVariants.length > 0 && (
            <div className="mt-4 rounded-xl border border-neutral-200 bg-[#FAF7F2]/60 p-4">
              <div className="flex items-center justify-between border-b border-neutral-200/80 pb-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                  Size-Wise Pricing
                </p>
                <span className="text-[11px] text-neutral-500">
                  Enter price for each selected size
                </span>
              </div>

              <div className="mt-3 space-y-3">
                {sizeVariants.map((variant) => (
                  <div
                    key={variant.size}
                    className="flex flex-wrap items-center gap-3 rounded-lg border border-neutral-200 bg-white p-3 shadow-xs"
                  >
                    <div className="w-24 flex-shrink-0">
                      <span className="inline-block rounded bg-neutral-900 px-2.5 py-1 text-xs font-semibold text-white">
                        {variant.size}
                      </span>
                    </div>

                    <div className="flex-1 min-w-[130px]">
                      <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                        Price (PKR) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 1500"
                        value={variant.price}
                        onChange={(e) => updateSizeVariantPrice(variant.size, "price", e.target.value)}
                        required
                        className="w-full rounded-md border border-neutral-300 px-3 py-1.5 text-sm text-neutral-900 focus:border-amber-600 focus:outline-none"
                      />
                    </div>

                    <div className="flex-1 min-w-[130px]">
                      <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                        Compare-at Price (PKR)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 2000"
                        value={variant.compareAtPrice}
                        onChange={(e) => updateSizeVariantPrice(variant.size, "compareAtPrice", e.target.value)}
                        className="w-full rounded-md border border-neutral-300 px-3 py-1.5 text-sm text-neutral-900 focus:border-amber-600 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-600">Finish / Color Options</p>
            <button
              type="button"
              onClick={() => openDialog("color")}
              className="flex items-center gap-1 text-xs font-medium text-amber-700 hover:underline"
            >
              <Plus size={13} /> Add New
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {finishOptions.map((finish) => (
              <button
                type="button"
                key={finish.id}
                onClick={() => toggleFinish(finish.value)}
                className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                  selectedFinishes.includes(finish.value)
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
                }`}
              >
                {finish.value}
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

      <SizeColorDialog
        open={dialogOpen}
        type={dialogType}
        items={dialogType === "size" ? sizeOptions : finishOptions}
        onAdded={handleDialogAdded}
        onRemoved={handleDialogRemoved}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
}