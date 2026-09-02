"use client";

import { useState } from "react";
import Toggle from "@/components/system/Toggle";
import Button from "@/components/system/Button";

export default function TaxSettingsCard() {
  const [collectTax, setCollectTax] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    // TODO: connect to settings API
  }

  return (
    <form onSubmit={handleSave} className="mt-6 rounded-xl bg-white p-6">
      <p className="font-serif text-lg font-semibold text-neutral-900">Tax Settings</p>
      <p className="text-sm text-neutral-500">Configure tax collection for your store.</p>

      <div className="mt-5 flex items-center justify-between border-b border-neutral-100 pb-5">
        <div>
          <p className="text-sm font-medium text-neutral-900">Collect Sales Tax</p>
          <p className="text-xs text-neutral-500">Automatically calculate and collect sales tax at checkout</p>
        </div>
        <Toggle checked={collectTax} onChange={setCollectTax} label="Collect Sales Tax" />
      </div>

      <Button type="submit" variant="primary" size="md" className="mt-5">
        Save Tax Settings
      </Button>
    </form>
  );
}