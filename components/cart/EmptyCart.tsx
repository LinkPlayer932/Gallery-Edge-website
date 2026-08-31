import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import Button from "@/components/system/Button";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F3EFE7]">
        <ShoppingBag size={28} className="text-neutral-400" />
      </div>
      <p className="mt-6 font-serif text-2xl font-semibold text-neutral-900">
        Your cart is empty
      </p>
      <p className="mt-2 text-sm text-neutral-500">
        Discover our handcrafted collection of premium frames
      </p>
      <Link href="/shop">
        <Button variant="primary" size="lg" className="mt-6">
          Shop All Frames
        </Button>
      </Link>
    </div>
  );
}