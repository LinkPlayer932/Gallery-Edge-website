"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import FiltersSidebar from "./FiltersSidebar";
import SortDropdown, { SortOption } from "./SortDropdown";
import Pagination from "./Pagination";
import type { Product } from "@/lib/products";

const PAGE_SIZE = 8;

export default function ProductGrid({ products }: { products: Product[] }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(500);
  const [sort, setSort] = useState<SortOption>("featured");
  const [page, setPage] = useState(1);

  function toggleCategory(slug: string) {
    setPage(1);
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  function clearAll() {
    setSelectedCategories([]);
    setMaxPrice(500);
    setPage(1);
  }

  const filtered = useMemo(() => {
    let result = products.filter((p) => p.price <= maxPrice);
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.categorySlug));
    }
    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
    }
    return result;
  }, [products, selectedCategories, maxPrice, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <FiltersSidebar
        selectedCategories={selectedCategories}
        onCategoryToggle={toggleCategory}
        maxPrice={maxPrice}
        onMaxPriceChange={(v) => {
          setMaxPrice(v);
          setPage(1);
        }}
        onClearAll={clearAll}
      />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-600">{filtered.length} products</p>
          <SortDropdown value={sort} onChange={setSort} />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {paginated.length === 0 && (
          <p className="mt-10 text-center text-sm text-neutral-500">
            No products match your filters.
          </p>
        )}

        {totalPages > 1 && (
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        )}
      </div>
    </div>
  );
}
