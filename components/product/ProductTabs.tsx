"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { CheckCircle2, ShieldCheck, Sparkles, Truck } from "lucide-react";

const tabs = ["Description", "Specifications & Materials", "Care & Hanging", "Shipping & Warranty"] as const;

export default function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState<(typeof tabs)[number]>("Description");

  return (
    <div className="mt-16">
      <div className="flex flex-wrap gap-4 border-b border-neutral-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={`border-b-2 pb-3.5 text-sm font-semibold transition-colors ${
              active === tab
                ? "border-amber-700 text-neutral-900"
                : "border-transparent text-neutral-500 hover:text-neutral-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="py-8 text-sm leading-relaxed text-neutral-700">
        {active === "Description" && (
          <div className="max-w-3xl space-y-4">
            <p>{product.description || "Handcrafted with the finest solid timbers and museum-grade protective materials."}</p>
            <p className="text-xs text-neutral-500">
              Each frame is cut, joined, sanded, and inspected by hand in our workshop before dispatch. Designed to protect and showcase your cherished artwork for a lifetime.
            </p>
          </div>
        )}

        {active === "Specifications & Materials" && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-4xl">
            <div className="rounded-xl border border-neutral-200 bg-white p-5">
              <div className="flex items-center gap-2 text-amber-800 font-semibold text-xs uppercase tracking-wider">
                <Sparkles size={14} /> Material Build
              </div>
              <ul className="mt-3 space-y-2 text-xs text-neutral-600">
                <li><strong>Timber:</strong> Solid kiln-dried natural hardwood &amp; moisture-resistant MDF</li>
                <li><strong>Moulding Finishes:</strong> {product.finishes.join(", ") || "Natural, Walnut, Matte Black, Gold"}</li>
                <li><strong>Available Sizes:</strong> {product.sizes.join(", ") || "Standard sizes"}</li>
                <li><strong>Glass:</strong> 2mm UV-filtering non-glare clear glass</li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-5">
              <div className="flex items-center gap-2 text-amber-800 font-semibold text-xs uppercase tracking-wider">
                <ShieldCheck size={14} /> Conservation Standards
              </div>
              <ul className="mt-3 space-y-2 text-xs text-neutral-600">
                <li><strong>Matting:</strong> 100% Acid-free archival museum core</li>
                <li><strong>Backing:</strong> Sealed moisture barrier craft board</li>
                <li><strong>Hanging:</strong> Pre-installed heavy duty D-rings &amp; steel wire</li>
                <li><strong>Origin:</strong> 100% Handcrafted in Pakistan</li>
              </ul>
            </div>
          </div>
        )}

        {active === "Care & Hanging" && (
          <div className="max-w-3xl space-y-3 text-xs leading-relaxed text-neutral-600">
            <p><strong>Hanging Instructions:</strong> All frames arrive ready-to-hang with heavy-duty metal brackets or wire pre-attached on the back for both horizontal and vertical orientation.</p>
            <p><strong>Cleaning Guide:</strong> Wipe the wooden frame with a soft dry microfiber cloth. For the glass, spray glass cleaner onto a cloth first (not directly on the frame) and gently polish.</p>
            <p><strong>Placement Tips:</strong> Avoid mounting in direct contact with continuous direct sunlight or humid splash zones to preserve timber luster.</p>
          </div>
        )}

        {active === "Shipping & Warranty" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-3xl">
            <div className="rounded-xl bg-[#FAF7F2] p-5 border border-neutral-200">
              <div className="flex items-center gap-2 text-amber-800 font-semibold text-xs">
                <Truck size={15} /> Nationwide Shipping
              </div>
              <p className="mt-2 text-xs text-neutral-600">
                Fast delivery across all Pakistan cities with reinforced box cushioning. Free standard delivery on orders over Rs. 4,999.
              </p>
            </div>

            <div className="rounded-xl bg-[#FAF7F2] p-5 border border-neutral-200">
              <div className="flex items-center gap-2 text-amber-800 font-semibold text-xs">
                <CheckCircle2 size={15} /> Zero-Breakage Guarantee
              </div>
              <p className="mt-2 text-xs text-neutral-600">
                If your glass arrives damaged in transit, simply send us a photo within 48 hours for an instant complimentary replacement.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}