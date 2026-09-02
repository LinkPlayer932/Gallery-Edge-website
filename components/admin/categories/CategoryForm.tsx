"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ImageIcon, Loader2, X } from "lucide-react";
import Input from "@/components/system/Input";
import Textarea from "@/components/system/Textarea";
import Button from "@/components/system/Button";
import Toggle from "@/components/system/Toggle";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export interface ExistingCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  featured: boolean;
}

export default function CategoryForm({
  category,
}: {
  category?: ExistingCategory;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = !!category;

  const [name, setName] = useState(category?.name ?? "");
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [description, setDescription] = useState(category?.description ?? "");
  const [featured, setFeatured] = useState(category?.featured ?? false);

  const [image, setImage] = useState<{ url: string; publicId: string } | null>(
    category?.image ? { url: category.image, publicId: "" } : null
  );
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imageError, setImageError] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleNameChange(value: string) {
    setName(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function uploadFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setImageError("Please choose an image file.");
      return;
    }
    setImageError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setImageError(data.error ?? "Upload failed. Please try again.");
        return;
      }

      setImage({ url: data.url, publicId: data.publicId });
    } catch {
      setImageError("Could not reach the server. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (uploading) {
      setError("Please wait for the image to finish uploading.");
      return;
    }

    setSubmitting(true);

    try {
      const url = isEdit ? `/api/categories/${category!._id}` : "/api/categories";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug,
          description,
          featured,
          image: image?.url ?? "/category-images/placeholder.jpg",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      router.push("/admin/categories");
      router.refresh();
    } catch {
      setError("Could not reach the server. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Link href="/admin/categories" className="flex items-center gap-1 text-sm font-medium text-amber-700 hover:underline">
        <ArrowLeft size={14} /> Back to Categories
      </Link>

      <form onSubmit={handleSubmit} className="mt-4 max-w-xl rounded-xl bg-white p-8">
        <p className="font-serif text-xl font-semibold text-neutral-900">
          {isEdit ? "Edit Category" : "Add New Category"}
        </p>

        <div className="mt-6">
          <Input
            id="category-name"
            label="Category Name"
            placeholder="e.g. Cherry Wood Frames"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
          />
        </div>

        <div className="mt-4">
          <label htmlFor="category-slug" className="text-xs font-medium uppercase tracking-wider text-neutral-600">
            Slug (auto-generated, editable)
          </label>
          <div className="mt-1.5 flex items-center overflow-hidden rounded-md border border-neutral-200 bg-[#F3EFE7]">
            <span className="whitespace-nowrap px-3 text-sm text-neutral-500">galleryedge.co/collections/</span>
            <input
              id="category-slug"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugTouched(true);
              }}
              className="w-full bg-transparent px-2 py-2.5 text-sm text-neutral-900 outline-none"
              placeholder="category-slug"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <Textarea
            id="category-description"
            label="Description (optional)"
            placeholder="Brief description of this category..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-600">Category Image</p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadFile(file);
              e.target.value = "";
            }}
          />

          {image ? (
            <div className="group relative mt-1.5 aspect-[3/2] w-full overflow-hidden rounded-xl border border-neutral-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Remove image"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`mt-1.5 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed py-10 text-center transition-colors ${
                isDragging ? "border-amber-500 bg-amber-50" : "border-neutral-300 bg-[#FAF7F2]"
              }`}
            >
              {uploading ? (
                <Loader2 size={24} className="animate-spin text-amber-600" />
              ) : (
                <ImageIcon size={24} className="text-neutral-400" />
              )}
              <p className="mt-2 text-sm text-neutral-600">
                {uploading ? (
                  "Uploading..."
                ) : (
                  <>
                    Drop image or <span className="font-medium text-amber-700">browse</span>
                  </>
                )}
              </p>
              <p className="mt-1 text-xs text-neutral-400">JPG, PNG or WebP — up to 10MB</p>
            </div>
          )}

          {imageError && <p className="mt-2 text-sm text-red-600">{imageError}</p>}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-5">
          <div>
            <p className="text-sm font-medium text-neutral-900">Featured</p>
            <p className="text-xs text-neutral-500">Show this category on the homepage</p>
          </div>
          <Toggle checked={featured} onChange={setFeatured} label="Featured" />
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-6 flex gap-3">
          <Button type="submit" variant="primary" size="lg" className="flex-1" disabled={submitting || uploading}>
            {submitting ? "Saving..." : isEdit ? "Save Changes" : "Save Category"}
          </Button>
          <Link href="/admin/categories">
            <Button type="button" variant="outline" size="lg">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}