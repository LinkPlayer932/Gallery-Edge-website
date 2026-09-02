"use client";

import { useState } from "react";
import Input from "@/components/system/Input";
import Select from "@/components/system/Select";
import Button from "@/components/system/Button";

export default function ShippingSettingsCard() {
  const [threshold, setThreshold] = useState("50");
  const [rate, setRate] = useState("12");
  const [delivery, setDelivery] = useState("3-5");

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    // TODO: connect to settings API
  }

  return (
    <form onSubmit={handleSave} className="mt-6 rounded-xl bg-white p-6">
      <p className="font-serif text-lg font-semibold text-neutral-900">Shipping Settings</p>
      <p className="text-sm text-neutral-500">Configure shipping rates and zones.</p>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <Input id="free-shipping" label="Free Shipping Threshold" type="number" value={threshold} onChange={(e) => setThreshold(e.target.value)} />
        <Input id="shipping-rate" label="Standard Shipping Rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
      </div>

      <div className="mt-4">
        <Select id="delivery-estimate" label="Estimated Delivery" value={delivery} onChange={(e) => setDelivery(e.target.value)}>
          <option value="1-2">1–2 business days</option>
          <option value="3-5">3–5 business days</option>
          <option value="7-10">7–10 business days</option>
        </Select>
      </div>

      <Button type="submit" variant="primary" size="md" className="mt-5">
        Save Shipping
      </Button>
    </form>
  );
}