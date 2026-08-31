"use client";

import Select from "@/components/system/Select";

export type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="w-48">
      <Select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
      >
        <option value="featured">Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
      </Select>
    </div>
  );
}