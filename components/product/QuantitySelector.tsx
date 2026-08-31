"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
}

export default function QuantitySelector({ quantity, onChange }: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-neutral-200 px-3 py-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className="text-neutral-500 hover:text-neutral-900"
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      <span className="w-6 text-center text-sm">{quantity}</span>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        className="text-neutral-500 hover:text-neutral-900"
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}