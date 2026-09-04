"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import FiltersSidebar from "./FiltersSidebar";
import SortDropdown, { SortOption } from "./SortDropdown";
import Pagination from "./Pagination";
import type { Product } from "@/lib/products";

const PAGE_SIZE = 8;

interface CategoryItem {
  name: string;
  slug: string;
}

interface ProductGridProps {
  products: Product[];
  categories?: CategoryItem[];
}

export default function ProductGrid({ products, categories = [] }: ProductGridProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState<SortOption>("featured");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
      setPage(1);
    }
  }, [categoryParam]);

  function toggleCategory(slug: string) {
    setPage(1);
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  function clearAll() {
    setSelectedCategories([]);
    setMaxPrice(1000);
    setPage(1);
  }

  const filtered = useMemo(() => {
    let result = products.filter((p) => p.price <= maxPrice);
    if (selectedCategories.length > 0) {
      const selectedLower = selectedCategories.map((s) => s.toLowerCase().trim());
      result = result.filter((p) => {
        const catSlug = (p.categorySlug || "").toLowerCase().trim();
        const catName = (p.category || "").toLowerCase().trim();
        return (
          selectedLower.includes(catSlug) ||
          selectedLower.includes(catName) ||
          selectedLower.includes(catName.replace(/[^a-z0-9]+/g, "-"))
        );
      });
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
        categories={categories}
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
