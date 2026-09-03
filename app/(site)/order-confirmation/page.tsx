"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/system/Button";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FAF7F2] px-6 py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-50">
        <CheckCircle2 size={32} className="text-amber-700" />
      </div>

      <p className="mt-6 font-serif text-2xl font-semibold text-neutral-900">Order Placed!</p>
      <p className="mt-2 text-sm text-neutral-500">
        Thank you — your order has been received and will be paid for on delivery.
      </p>

      {orderNumber && (
        <p className="mt-4 rounded-md bg-white px-4 py-2 text-sm font-medium text-neutral-700">
          Order {orderNumber}
        </p>
      )}

      <Link href="/shop">
        <Button variant="primary" size="lg" className="mt-8">
          Continue Shopping
        </Button>
      </Link>
    </main>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[70vh] items-center justify-center bg-[#FAF7F2]">
          <p className="text-neutral-500">Loading order confirmation...</p>
        </main>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
