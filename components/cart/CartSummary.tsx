import Link from "next/link";
import Button from "@/components/system/Button";

interface CartSummaryProps {
  subtotal: number;
  shippingThreshold?: number;
}

export default function CartSummary({ subtotal, shippingThreshold = 150 }: CartSummaryProps) {
  const shipping = subtotal >= shippingThreshold ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="rounded-xl bg-[#F3EFE7] p-6">
      <p className="font-serif text-lg font-semibold text-neutral-900">Order Summary</p>

      <div className="mt-4 flex flex-col gap-2 text-sm">
        <div className="flex justify-between text-neutral-600">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between border-t border-neutral-300 pt-4">
        <span className="font-serif font-semibold text-neutral-900">Total</span>
        <span className="font-serif text-lg font-semibold text-neutral-900">${total}</span>
      </div>

      <Link href="/checkout">
        <Button variant="secondary" size="lg" className="mt-6 w-full">
          Proceed to Checkout
        </Button>
      </Link>
    </div>
  );
}