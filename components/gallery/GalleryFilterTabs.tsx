"use client";

import { useState } from "react";

const filters = ["All", "Modern", "Classic", "Islamic Calligraphy", "Wedding Boards", "Natural"];

interface GalleryFilterTabsProps {
  onFilterChange?: (filter: string) => void;
}

export default function GalleryFilterTabs({ onFilterChange }: GalleryFilterTabsProps) {
  const [active, setActive] = useState("All");

  function handleClick(filter: string) {
    setActive(filter);
    onFilterChange?.(filter);
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 border-b border-neutral-200 bg-[#FAF7F2] px-6 py-4">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => handleClick(filter)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            active === filter
              ? "bg-neutral-900 text-white"
              : "bg-white text-neutral-700 hover:bg-neutral-100"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}