"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Banknote, Loader2 } from "lucide-react";
import Input from "@/components/system/Input";
import Button from "@/components/system/Button";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import { useCart } from "@/lib/cart-context";
import { SHIPPING_COSTS, SHIPPING_OPTIONS, ShippingMethod } from "@/lib/checkout-constants";

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

const emptyShipping: ShippingInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  zip: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [shipping, setShipping] = useState<ShippingInfo>(emptyShipping);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("standard");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0) {
    return (
      <main className="bg-[#FAF7F2] px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <EmptyCart />
        </div>
      </main>
    );
  }

  function updateShipping<K extends keyof ShippingInfo>(key: K, value: ShippingInfo[K]) {
    setShipping((prev) => ({ ...prev, [key]: value }));
  }

  function isShippingValid() {
    return (
      shipping.firstName.trim() &&
      shipping.lastName.trim() &&
      shipping.email.trim() &&
      shipping.phone.trim() &&
      shipping.street.trim() &&
      shipping.city.trim() &&
      shipping.state.trim() &&
      shipping.zip.trim()
    );
  }

  const total = subtotal + SHIPPING_COSTS[shippingMethod];

  async function handlePlaceOrder() {
    setError("");
    setSubmitting(true);

    try {
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: `${shipping.firstName} ${shipping.lastName}`.trim(),
            email: shipping.email,
            phone: shipping.phone,
          },
          shippingAddress: {
            street: shipping.street,
            city: shipping.city,
            state: shipping.state,
            zip: shipping.zip,
          },
          items: items.map((item) => {
            const [size, finish] = item.variant.split("·").map((part) => part?.trim() ?? "");
            return {
              productId: item.id,
              name: item.name,
              size: size ?? "",
              finish: finish ?? "",
              quantity: item.quantity,
              price: item.price,
            };
          }),
          total,
          // Cash on Delivery: nothing has been paid yet, admin marks it "Paid" once collected
          payment: "Unpaid",
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        setError(orderData.error ?? "Could not place your order. Please try again.");
        setSubmitting(false);
        return;
      }

      const order = orderData.order;
      clearCart();
      router.push(`/order-confirmation?order=${encodeURIComponent(order.orderNumber)}`);
    } catch {
      setError("Could not reach the server. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-[#FAF7F2] px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <p className="font-serif text-xl font-semibold text-neutral-900">Gallery Edge</p>
          <CheckoutSteps currentStep={step} />
          <Link href="/cart" className="text-sm font-medium text-neutral-600 hover:text-amber-800">
            ← Back to Cart
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="rounded-xl bg-white p-8">
              {step === 1 && (
                <>
                  <p className="font-serif text-xl font-semibold text-neutral-900">Shipping Information</p>

                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <Input
                      id="checkout-first-name"
                      label="First Name"
                      value={shipping.firstName}
                      onChange={(e) => updateShipping("firstName", e.target.value)}
                      required
                    />
                    <Input
                      id="checkout-last-name"
                      label="Last Name"
                      value={shipping.lastName}
                      onChange={(e) => updateShipping("lastName", e.target.value)}
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <Input
                      id="checkout-email"
                      label="Email Address"
                      type="email"
                      value={shipping.email}
                      onChange={(e) => updateShipping("email", e.target.value)}
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <Input
                      id="checkout-phone"
                      label="Phone"
                      type="tel"
                      value={shipping.phone}
                      onChange={(e) => updateShipping("phone", e.target.value)}
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <Input
                      id="checkout-street"
                      label="Street Address"
                      value={shipping.street}
                      onChange={(e) => updateShipping("street", e.target.value)}
                      required
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <Input
                      id="checkout-city"
                      label="City"
                      value={shipping.city}
                      onChange={(e) => updateShipping("city", e.target.value)}
                      required
                    />
                    <Input
                      id="checkout-state"
                      label="State"
                      value={shipping.state}
                      onChange={(e) => updateShipping("state", e.target.value)}
                      required
                    />
                  </div>

                  <div className="mt-4 max-w-[calc(50%-0.5rem)]">
                    <Input
                      id="checkout-zip"
                      label="Zip Code"
                      value={shipping.zip}
                      onChange={(e) => updateShipping("zip", e.target.value)}
                      required
                    />
                  </div>

                  <p className="mt-8 text-sm font-semibold text-neutral-900">Shipping Method</p>
                  <div className="mt-3 flex flex-col gap-3">
                    {SHIPPING_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className={`flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 transition-colors ${
                          shippingMethod === option.value
                            ? "border-amber-700 bg-amber-50"
                            : "border-neutral-200 bg-[#F3EFE7] hover:border-neutral-300"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping-method"
                            checked={shippingMethod === option.value}
                            onChange={() => setShippingMethod(option.value)}
                            className="h-4 w-4 accent-amber-700"
                          />
                          <span className="text-sm text-neutral-800">{option.label}</span>
                        </span>
                        <span className="text-sm font-medium text-neutral-900">
                          {option.price === 0 ? "Free" : `Rs. ${option.price.toLocaleString()}`}
                        </span>
                      </label>
                    ))}
                  </div>

                  <Button
                    type="button"
                    variant="primary"
                    size="lg"
                    className="mt-8 w-full"
                    disabled={!isShippingValid()}
                    onClick={() => setStep(2)}
                  >
                    Continue to Payment →
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <p className="font-serif text-xl font-semibold text-neutral-900">Payment</p>

                  <div className="mt-5 flex items-center gap-4 rounded-lg border border-amber-700 bg-amber-50 px-4 py-4">
                    <Banknote size={22} className="text-amber-700" />
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">Cash on Delivery</p>
                      <p className="text-xs text-neutral-500">Pay in cash when your order arrives.</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-neutral-400">
                    Card and online payments are coming soon.
                  </p>

                  <div className="mt-8 flex gap-3">
                    <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)}>
                      ← Back
                    </Button>
                    <Button type="button" variant="primary" size="lg" className="flex-1" onClick={() => setStep(3)}>
                      Continue to Review →
                    </Button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <p className="font-serif text-xl font-semibold text-neutral-900">Review Your Order</p>

                  <div className="mt-5 rounded-lg bg-[#F3EFE7] p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        Shipping To
                      </p>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs font-medium text-amber-700 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-neutral-800">
                      {shipping.firstName} {shipping.lastName}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {shipping.street}, {shipping.city}, {shipping.state} {shipping.zip}
                    </p>
                    <p className="text-sm text-neutral-600">{shipping.email} · {shipping.phone}</p>
                  </div>

                  <div className="mt-4 rounded-lg bg-[#F3EFE7] p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Payment</p>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-xs font-medium text-amber-700 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-neutral-800">Cash on Delivery</p>
                  </div>

                  {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

                  <div className="mt-8 flex gap-3">
                    <Button type="button" variant="outline" size="lg" onClick={() => setStep(2)} disabled={submitting}>
                      ← Back
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      size="lg"
                      className="flex-1"
                      disabled={submitting}
                      onClick={handlePlaceOrder}
                    >
                      {submitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 size={16} className="animate-spin" /> Placing Order...
                        </span>
                      ) : (
                        "Place Order"
                      )}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div>
            <CheckoutSummary items={items} subtotal={subtotal} shippingMethod={shippingMethod} />
          </div>
        </div>
      </div>
    </main>
  );
}
