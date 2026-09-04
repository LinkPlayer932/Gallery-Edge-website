import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";

export interface CartItemData {
  id: string;
  name: string;
  variant: string; // e.g. "8x10 · Natural Walnut"
  price: number;
  quantity: number;
  image: string;
}

interface CartItemProps {
  item: CartItemData;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  return (
    <div className="flex items-center gap-4 border-b border-neutral-200 py-5">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <p className="font-serif text-sm font-semibold text-neutral-900">{item.name}</p>
        <p className="text-xs text-neutral-500">{item.variant}</p>
      </div>

      <div className="flex items-center gap-2 rounded-md border border-neutral-200 px-2 py-1">
        <button
          type="button"
          onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))}
          className="text-neutral-500 hover:text-neutral-900"
          aria-label="Decrease quantity"
        >
          <Minus size={14} />
        </button>
        <span className="w-5 text-center text-sm">{item.quantity}</span>
        <button
          type="button"
          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
          className="text-neutral-500 hover:text-neutral-900"
          aria-label="Increase quantity"
        >
          <Plus size={14} />
        </button>
      </div>

      <p className="w-24 text-right font-serif text-sm font-semibold text-neutral-900">
        Rs. {(item.price * item.quantity).toLocaleString()}
      </p>

      <button
        type="button"
        onClick={() => onRemove(item.id)}
        className="text-neutral-400 hover:text-red-600"
        aria-label="Remove item"
      >
        <X size={16} />
      </button>
    </div>
  );
}