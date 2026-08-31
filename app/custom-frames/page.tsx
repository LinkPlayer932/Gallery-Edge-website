"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "@/components/system/Input";
import Select from "@/components/system/Select";
import Textarea from "@/components/system/Textarea";
import Button from "@/components/system/Button";

export default function CustomFramesPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    material: "",
    width: "",
    height: "",
    notes: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: connect to order/API endpoint
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
            <Input
              id="custom-width"
              name="width"
              label="Width (inches)"
              type="number"
              placeholder="e.g. 24"
              value={form.width}
              onChange={handleChange}
              required
            />
            <Input
              id="custom-height"
              name="height"
              label="Height (inches)"
              type="number"
              placeholder="e.g. 36"
              value={form.height}
              onChange={handleChange}
              required
            />
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

          <Button type="submit" variant="secondary" size="lg" className="mt-6 w-full">
            Submit Custom Request
          </Button>
        </form>
      </section>
    </main>
  );
}
