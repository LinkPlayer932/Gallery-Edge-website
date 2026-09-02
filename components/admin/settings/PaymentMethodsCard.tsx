"use client";

import { useState } from "react";
import Toggle from "@/components/system/Toggle";

interface PaymentMethod {
  name: string;
  description: string;
  enabled: boolean;
}

const initialMethods: PaymentMethod[] = [
  { name: "Credit / Debit Cards", description: "Visa, Mastercard, Amex via Stripe", enabled: true },
  { name: "Apple Pay", description: "One-tap checkout for Apple devices", enabled: true },
  { name: "Google Pay", description: "One-tap checkout on Android and Chrome", enabled: true },
  { name: "PayPal", description: "PayPal balance and linked cards", enabled: true },
];

export default function PaymentMethodsCard() {
  const [methods, setMethods] = useState(initialMethods);

  function toggleMethod(name: string) {
    setMethods((prev) => prev.map((m) => (m.name === name ? { ...m, enabled: !m.enabled } : m)));
  }

  return (
    <div className="mt-6 rounded-xl bg-white p-6">
      <p className="font-serif text-lg font-semibold text-neutral-900">Payment Methods</p>
      <p className="text-sm text-neutral-500">Manage which payment methods are enabled at checkout.</p>

      <div className="mt-5 flex flex-col divide-y divide-neutral-100">
        {methods.map((method) => (
          <div key={method.name} className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-medium text-neutral-900">{method.name}</p>
              <p className="text-xs text-neutral-500">{method.description}</p>
            </div>
            <Toggle checked={method.enabled} onChange={() => toggleMethod(method.name)} label={method.name} />
          </div>
        ))}
      </div>
    </div>
  );
}