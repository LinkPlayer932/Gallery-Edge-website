"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Heart } from "lucide-react";
import RatingStars from "@/components/shared/RatingStars";
import PriceTag from "@/components/system/PriceTag";
import Button from "@/components/system/Button";
import SizeSelector from "./SizeSelector";
import FinishSelector from "./FinishSelector";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";

export default function ProductInfo({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();

  const [size, setSize] = useState(product.sizes[0]);
  const [finish, setFinish] = useState(product.finishes[0]);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  function buildCartItem() {
    const variantParts = [size, finish].filter(Boolean);
    return {
      id: product._id ?? product.slug,
      name: product.name,
      variant: variantParts.join(" · "),
      price: product.price,
      image: product.image,
    };
  }

  function handleAddToCart() {
    addItem(buildCartItem(), quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  function handleBuyNow() {
    addItem(buildCartItem(), quantity);
    router.push("/checkout");
  }

  return (
    <div>
      <div className="flex items-start justify-between">
        <p className="text-xs uppercase tracking-widest text-amber-700">{product.category}</p>
        <button className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900">
          <Heart size={16} /> Save
        </button>
      </div>

      <h1 className="mt-1 font-serif text-3xl font-semibold text-neutral-900">
        {product.name}
      </h1>

      <div className="mt-2">
        <RatingStars rating={product.rating} reviewCount={product.reviews} size={16} />
      </div>

      <div className="mt-4">
        <PriceTag price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-neutral-600">{product.description}</p>

      <div className="mt-6 flex flex-col gap-5">
        <SizeSelector sizes={product.sizes} selected={size} onSelect={setSize} />
        <FinishSelector finishes={product.finishes} selected={finish} onSelect={setFinish} />
      </div>

      <div className="mt-6 flex items-center gap-4">
        <QuantitySelector quantity={quantity} onChange={setQuantity} />
        <Button variant="primary" size="lg" className="flex-1" onClick={handleAddToCart}>
          {justAdded ? (
            <span className="flex items-center justify-center gap-2">
              <Check size={16} /> Added to Cart
            </span>
          ) : (
            "Add to Cart"
          )}
        </Button>
      </div>

      <Button variant="secondary" size="lg" className="mt-3 w-full" onClick={handleBuyNow}>
        Buy Now
      </Button>

      <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-neutral-600">
        <div className="rounded-md bg-[#F3EFE7] p-3">Lifetime guarantee</div>
        <div className="rounded-md bg-[#F3EFE7] p-3">Free shipping $150+</div>
        <div className="rounded-md bg-[#F3EFE7] p-3">30-day returns</div>
      </div>
    </div>
  );
}
