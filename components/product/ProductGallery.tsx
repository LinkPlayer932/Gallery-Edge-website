"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const thumbnails = images.length > 0 ? images : ["/product-images/placeholder.jpg"];
  const [active, setActive] = useState(thumbnails[0]);

  return (
    <div className="flex gap-4">
      {thumbnails.length > 1 && (
        <div className="flex flex-col gap-3">
          {thumbnails.map((thumb, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(thumb)}
              className={`relative h-16 w-16 overflow-hidden rounded-md border-2 ${
                active === thumb ? "border-neutral-900" : "border-transparent"
              }`}
            >
              <Image src={thumb} alt={`${name} thumbnail ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="relative h-[500px] flex-1 overflow-hidden rounded-xl">
        <Image src={active} alt={name} fill className="object-cover" />
      </div>
    </div>
  );
}
