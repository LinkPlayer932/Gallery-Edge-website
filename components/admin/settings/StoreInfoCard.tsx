"use client";

import { useState } from "react";
import Input from "@/components/system/Input";
import Button from "@/components/system/Button";

export default function StoreInfoCard() {
  const [storeName, setStoreName] = useState("Gallery Edge");
  const [email, setEmail] = useState("hello@galleryedge.co");
  const [phone, setPhone] = useState("+1 (646) 555-0184");

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    // TODO: connect to settings API
  }

  return (
    <form onSubmit={handleSave} className="rounded-xl bg-white p-6">
      <p className="font-serif text-lg font-semibold text-neutral-900">Store Information</p>
      <p className="text-sm text-neutral-500">Your public-facing store details.</p>

      <div className="mt-5 flex flex-col gap-4">
        <Input id="store-name" label="Store Name" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
        <Input id="store-email" label="Contact Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input id="store-phone" label="Contact Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-600">Store Logo</p>
          <div className="mt-1.5 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 bg-[#FAF7F2] py-8 text-center">
            <p className="text-sm text-neutral-600">
              Drop file or <span className="font-medium text-amber-700">browse</span>
            </p>
            <p className="mt-1 text-xs text-neutral-400">Recommended size: 200×60px PNG or SVG</p>
          </div>
        </div>
      </div>

      <Button type="submit" variant="primary" size="md" className="mt-5">
        Save Changes
      </Button>
    </form>
  );
}