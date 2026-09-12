"use client";

import Link from "next/link";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";

const footerColumns = [
  {
    title: "Services",
    links: [
      { label: "Custom Sizing", href: "/services#custom-sizing" },
      { label: "Bulk & Corporate", href: "/services#bulk-orders" },
      { label: "Interior Wall Layouts", href: "/services#interior-design" },
      { label: "Canvas Printing", href: "/services#canvas-printing" },
      { label: "Frame Restoration", href: "/services#frame-repair" },
      { label: "Art Consultation", href: "/services#art-consultation" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Shop All", href: "/shop" },
      { label: "Art Gallery", href: "/gallery" },
      { label: "Custom Frames", href: "/custom-frames" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ & Help", href: "/faq" },
      { label: "Shipping & Rates", href: "/shipping-returns" },
      { label: "Returns & Exchanges", href: "/shipping-returns" },
      { label: "Track Your Order", href: "/account/login" },
      { label: "WhatsApp Support", href: "https://wa.me/923301711146", isExternal: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300">
      {/* Newsletter */}
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 border-b border-neutral-800 px-6 py-12 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-amber-600">
            Newsletter
          </p>
          <h3 className="mt-2 font-serif text-2xl font-semibold text-white">
            Curated inspiration, delivered
          </h3>
          <p className="mt-1 text-sm text-neutral-400">
            Join 12,000+ art lovers. New arrivals, styling guides, exclusive offers.
          </p>
        </div>
        <form className="flex w-full max-w-md gap-3" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full rounded-md bg-neutral-900 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none focus:ring-1 focus:ring-amber-600"
          />
          <button
            type="submit"
            className="whitespace-nowrap rounded-md bg-amber-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-amber-600 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Columns */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 py-12 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-800 text-sm font-semibold text-white">
              G
            </span>
            <span className="font-serif text-lg font-semibold text-white">
              Gallery Edge
            </span>
          </div>
          <p className="mt-3 text-sm text-neutral-400">
            Handcrafted premium frames for art that deserves to be seen. Every piece is made with care, quality, and attention to detail.
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              href="https://web.facebook.com/profile.php?id=61577284538835"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook size={18} className="cursor-pointer hover:text-white" />
            </Link>
            <Link
              href="https://www.instagram.com/gallery.edge"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram size={18} className="cursor-pointer hover:text-white" />
            </Link>
            <Link 
              href="https://wa.me/923301711146" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={18} className="cursor-pointer hover:text-white" />
            </Link>
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.title} className="text-left md:text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  {link.isExternal ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link 
                      href={link.href} 
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-neutral-800 px-6 py-5 text-xs text-neutral-500 md:flex-row">
        <p>© 2026 Gallery Edge. All rights reserved. Handcrafted with care in Pakistan.</p>
        <div className="flex items-center gap-4">
          <span>Cash on Delivery · JazzCash · Easypaisa · Bank Transfer</span>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}