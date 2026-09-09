"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Input from "@/components/system/Input";
import Select from "@/components/system/Select";
import Textarea from "@/components/system/Textarea";
import Button from "@/components/system/Button";
import SizeColorDialog from "@/components/system/SizeColorDialog";

interface OptionItem {
  id: string;
  value: string;
  isDefault: boolean;
}

export default function CustomFramesPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    material: "",
    color: "",
    size: "",
    unit: "in",
    width: "",
    height: "",
    notes: "",
  });

  const [colors, setColors] = useState<OptionItem[]>([]);
  const [sizes, setSizes] = useState<OptionItem[]>([]);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [dialogType, setDialogType] = useState<"size" | "color" | null>(null);

  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOptions() {
      try {
        const [colorRes, sizeRes] = await Promise.all([
          fetch("/api/options?type=color"),
          fetch("/api/options?type=size"),
        ]);

        const colorData = await colorRes.json();
        const sizeData = await sizeRes.json();

        setColors(
          (colorData.options || []).map((opt: { _id: string; value: string }) => ({
            id: opt._id,
            value: opt.value,
            isDefault: false,
          }))
        );
        setSizes(
          (sizeData.options || []).map((opt: { _id: string; value: string }) => ({
            id: opt._id,
            value: opt.value,
            isDefault: false,
          }))
        );
      } catch (err) {
        console.error("Failed to load frame options:", err);
      } finally {
        setOptionsLoading(false);
      }
    }
    fetchOptions();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setReferenceImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function removeImage() {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setReferenceImage(null);
    setImagePreview(null);
  }

  function handleOptionAdded(item: OptionItem) {
    if (dialogType === "color") {
      setColors((prev) => [...prev, item]);
      setForm((prev) => ({ ...prev, color: item.value }));
    } else if (dialogType === "size") {
      setSizes((prev) => [...prev, item]);
      setForm((prev) => ({ ...prev, size: item.value }));
    }
  }

  function handleOptionRemoved(id: string) {
    if (dialogType === "color") {
      setColors((prev) => prev.filter((c) => c.id !== id));
    } else if (dialogType === "size") {
      setSizes((prev) => prev.filter((s) => s.id !== id));
    }
  }

  function resetForm() {
    setForm({
      name: "",
      email: "",
      phone: "",
      material: "",
      color: "",
      size: "",
      unit: "in",
      width: "",
      height: "",
      notes: "",
    });
    removeImage();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      let referenceImageUrl = "";

      if (referenceImage) {
        const uploadData = new FormData();
        uploadData.append("file", referenceImage);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });
        const uploadJson = await uploadRes.json();

        if (!uploadRes.ok) {
          setError(uploadJson.error || "Image upload failed. Please try again.");
          setSubmitting(false);
          return;
        }
        referenceImageUrl = uploadJson.url;
      }

      const res = await fetch("/api/custom-frames", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, referenceImageUrl }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      const message = `*New Custom Frame Request*

*Name:* ${form.name}
*Phone:* ${form.phone}
*Email:* ${form.email}
*Material:* ${form.material}
*Color:* ${form.color}
*Size:* ${form.size}
*Dimensions:* ${form.width}${form.unit} x ${form.height}${form.unit}
*Notes:* ${form.notes || "-"}${
        referenceImageUrl ? `\n*Reference Image:* ${referenceImageUrl}` : ""
      }`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappNumber = "923301711146";
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");

      resetForm();
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <section className="relative flex min-h-[380px] items-center justify-center overflow-hidden text-center">
        <Image
          src="/product-images/midnight-wildflower-trio/main.jpeg"
          alt="Custom frame commission"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-white">
          <p className="text-xs font-medium uppercase tracking-widest text-amber-400">
            Made to Measure
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
            Every frame is a custom commission.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-neutral-200">
            Tell us your dimensions, material preferences, and style. Our
            framemakers build it to your exact specifications.
          </p>
        </div>
      </section>

      <section className="bg-[#FAF7F2] px-6 py-16">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-2xl rounded-xl bg-white p-8"
        >
          <p className="font-serif text-xl font-semibold text-neutral-900">
            Start Your Custom Frame
          </p>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input
              id="custom-name"
              name="name"
              label="Full Name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              id="custom-email"
              name="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-5">
            <Input
              id="custom-phone"
              name="phone"
              label="Phone Number"
              type="tel"
              placeholder="e.g. 03XX-XXXXXXX"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-5">
            <Select
              id="custom-material"
              name="material"
              label="Preferred Material"
              value={form.material}
              onChange={handleChange}
              required
            >
              <option value="">Choose a material...</option>
              <option value="wood">Wood</option>
              <option value="metal">Metal</option>
              <option value="canvas">Canvas</option>
              <option value="mdf">MDF</option>
            </Select>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-5">
            <div>
              <Select
                id="custom-color"
                name="color"
                label="Frame Color"
                value={form.color}
                onChange={handleChange}
                required
                disabled={optionsLoading}
              >
                <option value="">
                  {optionsLoading ? "Loading colors..." : "Choose a color..."}
                </option>
                {colors.map((c) => (
                  <option key={c.id} value={c.value}>
                    {c.value}
                  </option>
                ))}
              </Select>
              <button
                type="button"
                onClick={() => setDialogType("color")}
                className="mt-1.5 text-xs font-medium text-amber-700 hover:underline"
              >
                + Add new color
              </button>
            </div>

            <div>
              <Select
                id="custom-size"
                name="size"
                label="Frame Size"
                value={form.size}
                onChange={handleChange}
                required
                disabled={optionsLoading}
              >
                <option value="">
                  {optionsLoading ? "Loading sizes..." : "Choose a size..."}
                </option>
                {sizes.map((s) => (
                  <option key={s.id} value={s.value}>
                    {s.value}
                  </option>
                ))}
              </Select>
              <button
                type="button"
                onClick={() => setDialogType("size")}
                className="mt-1.5 text-xs font-medium text-amber-700 hover:underline"
              >
                + Add new size
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-5">
            <Input
              id="custom-width"
              name="width"
              label="Width"
              type="number"
              placeholder="e.g. 24"
              value={form.width}
              onChange={handleChange}
              required
            />
            <Input
              id="custom-height"
              name="height"
              label="Height"
              type="number"
              placeholder="e.g. 36"
              value={form.height}
              onChange={handleChange}
              required
            />
            <Select
              id="custom-unit"
              name="unit"
              label="Unit"
              value={form.unit}
              onChange={handleChange}
              required
            >
              <option value="in">Inches</option>
              <option value="ft">Feet</option>
              <option value="cm">CM</option>
              <option value="mm">MM</option>
            </Select>
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium text-neutral-700">
              Reference Image
            </label>
            <p className="mt-1 text-xs text-neutral-500">
              Upload a photo of your art piece or a style reference (optional).
            </p>

            {!imagePreview ? (
              <label
                htmlFor="custom-reference-image"
                className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 py-8 text-center hover:border-amber-600"
              >
                <span className="text-sm text-neutral-500">
                  Click to upload an image
                </span>
                <span className="mt-1 text-xs text-neutral-400">
                  PNG, JPG up to 5MB
                </span>
                <input
                  id="custom-reference-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative mt-2 w-full overflow-hidden rounded-lg border border-neutral-200">
                <img
                  src={imagePreview}
                  alt="Reference preview"
                  className="h-56 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute right-2 top-2 rounded-full bg-black/70 px-2.5 py-1 text-xs text-white hover:bg-black"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <div className="mt-5">
            <Textarea
              id="custom-notes"
              name="notes"
              label="Additional Notes"
              placeholder="Tell us about your art piece, style preferences, or timeline..."
              value={form.notes}
              onChange={handleChange}
            />
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <Button
            type="submit"
            variant="secondary"
            size="lg"
            className="mt-6 w-full"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Custom Request"}
          </Button>
        </form>
      </section>

      {dialogType && (
        <SizeColorDialog
          open={!!dialogType}
          type={dialogType}
          items={dialogType === "color" ? colors : sizes}
          onAdded={handleOptionAdded}
          onRemoved={handleOptionRemoved}
          onClose={() => setDialogType(null)}
        />
      )}
    </main>
  );
}
