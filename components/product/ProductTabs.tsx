"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";

const tabs = ["Description", "Specifications", "Reviews"] as const;

export default function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState<(typeof tabs)[number]>("Description");

  return (
    <div className="mt-16">
      <div className="flex gap-8 border-b border-neutral-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
              active === tab
                ? "border-amber-700 text-neutral-900"
                : "border-transparent text-neutral-500 hover:text-neutral-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="py-6 text-sm leading-relaxed text-neutral-600">
        {active === "Description" && <p>{product.description}</p>}
        {active === "Specifications" && (
          <ul className="flex flex-col gap-2">
            <li>Available sizes: {product.sizes.join(", ")}</li>
            <li>Available finishes: {product.finishes.join(", ")}</li>
            <li>Category: {product.category}</li>
          </ul>
        )}
        {active === "Reviews" && <p>{product.reviews} verified reviews · {product.rating} average rating.</p>}
      </div>
    </div>
  );
}