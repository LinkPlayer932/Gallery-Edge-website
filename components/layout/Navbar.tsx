"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, User, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Gallery", href: "/gallery" },
  { label: "Services", href: "/services" },
  { label: "Custom Frames", href: "/custom-frames" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount } = useCart();

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

        {/* Right icons */}
        <div className="flex items-center gap-5">
          <button aria-label="Search" className="text-neutral-800 hover:text-amber-800">
            <Search size={20} />
          </button>
          <button aria-label="Wishlist" className="text-neutral-800 hover:text-amber-800">
            <Heart size={20} />
          </button>
          <Link href="/account/login" aria-label="Account" className="text-neutral-800 hover:text-amber-800">
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
