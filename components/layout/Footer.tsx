import Link from "next/link";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const footerColumns = [
  {
    title: "Shop",
    links: [
      "Wooden Frames",
      "Metal Frames",
      "Custom Frames",
      "Canvas Prints",
      "Photo Frames",
      "New Arrivals",
      "Bestsellers",
    ],
  },
  {
    title: "Services",
    links: [
      "Custom Sizing",
      "Bulk Orders",
      "Interior Design",
      "Gift Cards",
      "Frame Repair",
      "Art Consultation",
    ],
  },
  {
    title: "Company",
    links: [
      "About Us",
      "Careers",
      "Press",
      "Sustainability",
      "Affiliates",
      "Trade Program",
    ],
  },
  {
    title: "Support",
    links: [
      "FAQ",
      "Shipping & Returns",
      "Track Order",
      "Size Guide",
      "Care Instructions",
      "Contact Us",
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
        <form className="flex w-full max-w-md gap-3">
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full rounded-md bg-neutral-900 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none"
          />
          <button
            type="submit"
            className="whitespace-nowrap rounded-md bg-amber-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-amber-600"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Columns */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 py-12 md:grid-cols-5">
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
            Handcrafted premium frames for art that deserves to be seen.
          </p>
          <div className="mt-4 flex gap-3">
            <FaInstagram size={18} className="cursor-pointer hover:text-white" />
            <FaTwitter size={18} className="cursor-pointer hover:text-white" />
            <FaFacebook size={18} className="cursor-pointer hover:text-white" />
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm text-neutral-400 hover:text-white">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-neutral-800 px-6 py-5 text-xs text-neutral-500 md:flex-row">
        <p>© 2026 Gallery Edge. All rights reserved. Handcrafted with care.</p>
        <div className="flex items-center gap-4">
          <span>Visa · MC · Amex · PayPal · Apple</span>
          <Link href="#" className="hover:text-white">Privacy</Link>
          <Link href="#" className="hover:text-white">Terms</Link>
          <Link href="#" className="hover:text-white">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}