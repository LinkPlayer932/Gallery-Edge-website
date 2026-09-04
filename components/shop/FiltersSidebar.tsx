"use client";

import Checkbox from "@/components/system/Checkbox";
import Button from "@/components/system/Button";
interface CategoryItem {
  name: string;
  slug: string;
}

interface FiltersSidebarProps {
  categories?: CategoryItem[];
  selectedCategories: string[];
  onCategoryToggle: (slug: string) => void;
  maxPrice: number;
  onMaxPriceChange: (value: number) => void;
  onClearAll: () => void;
}

export default function FiltersSidebar({
  categories = [],
  selectedCategories,
  onCategoryToggle,
  maxPrice,
  onMaxPriceChange,
  onClearAll,
}: FiltersSidebarProps) {
  return (
    <aside className="w-full rounded-xl bg-white p-6 md:w-64">
      <p className="font-serif text-lg font-semibold text-neutral-900">Filters</p>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Category
        </p>
        <div className="mt-3 flex flex-col gap-2.5">
          {categories.map((cat) => (
            <Checkbox
              key={cat.slug}
              id={`cat-${cat.slug}`}
              label={cat.name}
              checked={selectedCategories.includes(cat.slug)}
              onChange={() => onCategoryToggle(cat.slug)}
            />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Max Price
        </p>
        <input
          type="range"
          min={0}
          max={1000}
          step={5}
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="mt-3 w-full accent-amber-700"
        />
        <div className="mt-1 flex justify-between text-xs text-neutral-500">
          <span>$0</span>
          <span>up to ${maxPrice}</span>
        </div>
      </div>

      <Button variant="outline" size="sm" className="mt-8 w-full" onClick={onClearAll}>
        Clear all filters
      </Button>
    </aside>
  );
}