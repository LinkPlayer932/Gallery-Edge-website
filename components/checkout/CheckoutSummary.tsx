import Image from "next/image";
import { CartItemData } from "@/components/cart/CartItem";
import { ShippingMethod, SHIPPING_COSTS } from "@/lib/checkout-constants";

interface CheckoutSummaryProps {
  items: CartItemData[];
  subtotal: number;
  shippingMethod: ShippingMethod;
}

export default function CheckoutSummary({ items, subtotal, shippingMethod }: CheckoutSummaryProps) {
  const shipping = SHIPPING_COSTS[shippingMethod];
  const total = subtotal + shipping;

  return (
    <div className="rounded-xl bg-white p-6">
      <p className="font-serif text-lg font-semibold text-neutral-900">Summary</p>

      <div className="mt-4 flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-semibold text-white">
                {item.quantity}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-sm font-semibold text-neutral-900">{item.name}</p>
              <p className="text-xs text-neutral-500">{item.variant}</p>
            </div>
            <p className="whitespace-nowrap text-sm font-semibold text-neutral-900">
              ${item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-2 border-t border-neutral-100 pt-4 text-sm">
        <div className="flex justify-between text-neutral-600">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Shipping</span>
          <span className={shipping === 0 ? "text-green-700" : ""}>{shipping === 0 ? "Free" : `$${shipping}`}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4">
        <span className="font-serif font-semibold text-neutral-900">Total</span>
        <span className="font-serif text-lg font-semibold text-neutral-900">${total}</span>
      </div>
    </div>
  );
}
