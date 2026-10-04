"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, User, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Gallery", href: "/gallery" },
  { label: "Services", href: "/services" },
  { label: "Custom Frames", href: "/custom-frames" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface SearchResult {
  _id: string;
  name: string;
  slug: string;
  images?: string[];
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/account/me");
        setIsLoggedIn(res.ok);
      } catch {
        setIsLoggedIn(false);
      }
    }
    checkAuth();
  }, [pathname]);

  // Debounced live search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      const res = await fetch(`/api/products?search=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      setResults(data.products?.slice(0, 6) ?? []);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
    closeSearch();
  }

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
    setResults([]);
  }

  return (
    <header className="w-full border-b border-neutral-200 bg-[#FAF7F2]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/Gallery_edge_Logo.png"
            alt="Gallery Edge"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="font-serif text-lg font-semibold text-neutral-900">
            Gallery Edge
          </span>
        </Link>

        {/* Nav links */}
        {!searchOpen && (
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition-colors ${isActive
                    ? "text-amber-800 font-medium"
                    : "text-neutral-700 hover:text-amber-800"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Search input + dropdown */}
        {searchOpen && (
          <div ref={wrapperRef} className="relative mx-auto w-full max-w-sm">
            <form onSubmit={handleSearchSubmit}>
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm focus:border-amber-700 focus:outline-none"
              />
            </form>

            {results.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-neutral-200 bg-white shadow-lg">
                {results.map((product) => (
                  <Link
                    key={product._id}
                    href={`/shop/${product.slug}`}
                    onClick={closeSearch}
                    className="flex items-center gap-3 border-b border-neutral-100 px-4 py-3 last:border-b-0 hover:bg-neutral-50"
                  >
                    {product.images?.[0] && (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                    )}
                    <span className="text-sm text-neutral-800">{product.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Right icons */}
        <div className="flex items-center gap-5">
          <button
            aria-label="Search"
            onClick={() => (searchOpen ? closeSearch() : setSearchOpen(true))}
            className="text-neutral-800 hover:text-amber-800"
          >
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </button>
          <Link
            href={isLoggedIn ? "/account" : "/account/login"}
            aria-label="Account"
            className="text-neutral-800 hover:text-amber-800"
          >
            <User size={20} />
          </Link>
          <Link
            href="/cart"
            className="flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            <ShoppingBag size={16} />
            Cart
            {itemCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs font-semibold">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
