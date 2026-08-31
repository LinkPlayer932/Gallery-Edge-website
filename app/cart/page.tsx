"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CartItem, { CartItemData } from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";

const initialItems: CartItemData[] = [
  {
    id: "1",
    name: "Walnut Gallery Frame",
    variant: "8x10 · Natural Walnut",
    price: 189,
    quantity: 1,
    image: "/product-images/sacred-names-trio/main.jpeg",
  },
];

export default function CartPage() {
  const [items, setItems] = useState<CartItemData[]>(initialItems);

  function handleQuantityChange(id: string, quantity: number) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  }

  function handleRemove(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="bg-[#FAF7F2] px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-3xl font-semibold text-neutral-900">Your Cart</h1>
          <Link
            href="/shop"
            className="flex items-center gap-1 text-sm font-medium text-neutral-700 hover:text-amber-800"
          >
            <ArrowLeft size={14} /> Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ))}
            </div>
            <div>
              <CartSummary subtotal={subtotal} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}