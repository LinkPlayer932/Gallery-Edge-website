"use client";

import type { SizeVariant } from "@/lib/products";

interface SizeSelectorProps {
  sizes: string[];
  sizeVariants?: SizeVariant[];
  selected: string;
  onSelect: (size: string) => void;
}

export default function SizeSelector({ sizes, sizeVariants, selected, onSelect }: SizeSelectorProps) {
  const displaySizes = sizes.length ? sizes : (sizeVariants?.map((v) => v.size) ?? []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
          Size: <span className="font-normal text-neutral-900">{selected}</span>
        </p>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {displaySizes.map((size) => {
          const variant = sizeVariants?.find((v) => v.size === size);
          const isSelected = selected === size;

          return (
            <button
              key={size}
              type="button"
              onClick={() => onSelect(size)}
              className={`flex flex-col items-center justify-center rounded-lg border px-3.5 py-2 text-center transition-all ${
                isSelected
                  ? "border-neutral-900 bg-neutral-900 text-white shadow-xs"
                  : "border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400"
              }`}
            >
              <span className="text-sm font-medium">{size}</span>
              {variant?.price ? (
                <span
                  className={`mt-0.5 text-[11px] ${
                    isSelected ? "text-neutral-300" : "text-neutral-500"
                  }`}
                >
                  Rs. {variant.price.toLocaleString()}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}