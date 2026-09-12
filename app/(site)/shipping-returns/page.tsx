import { Metadata } from "next";
import { Truck, RotateCcw, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping & Returns Policy | Gallery Edge",
  description: "Information regarding our safe delivery across Pakistan, transit times, shipping rates, and 30-day replacement guarantee.",
};

export default function ShippingReturnsPage() {
  return (
    <main className="bg-[#FAF7F2] py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">Policies &amp; Guidelines</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-neutral-900 md:text-4xl">
            Shipping &amp; Returns
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Learn about how we safely package and deliver your handcrafted pieces across Pakistan.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-800">
              <Truck size={24} />
            </div>
            <h2 className="mt-4 font-serif text-lg font-semibold text-neutral-900">Delivery Rates &amp; Timelines</h2>
            <ul className="mt-3 space-y-2 text-xs leading-relaxed text-neutral-600">
              <li><strong>Standard Delivery:</strong> Free on orders over Rs. 4,999 (otherwise Rs. 250 flat). Arrives in 3–5 business days.</li>
              <li><strong>Express Delivery:</strong> Rs. 250. Arrives in 1–2 business days.</li>
              <li><strong>Custom Frame Orders:</strong> 5–8 business days crafting + delivery.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-800">
              <ShieldCheck size={24} />
            </div>
            <h2 className="mt-4 font-serif text-lg font-semibold text-neutral-900">Zero-Breakage Guarantee</h2>
            <p className="mt-3 text-xs leading-relaxed text-neutral-600">
              Every glass framed item is packed using heavy-duty molded corner protectors, multi-layer shock bubble wrap, and rigid corrugated master boxes. If any damage occurs during transit, we replace it 100% free of charge.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-800">
              <RotateCcw size={24} />
            </div>
            <h2 className="mt-4 font-serif text-lg font-semibold text-neutral-900">30-Day Return &amp; Exchange</h2>
            <p className="mt-3 text-xs leading-relaxed text-neutral-600">
              We want you to love your art. Standard catalog frames can be returned or exchanged within 30 days of delivery in original condition. (Note: custom-dimension bespoke frames are made to order and non-returnable unless defective).
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-800">
              <Clock size={24} />
            </div>
            <h2 className="mt-4 font-serif text-lg font-semibold text-neutral-900">Order Tracking</h2>
            <p className="mt-3 text-xs leading-relaxed text-neutral-600">
              Upon dispatch, you will receive an SMS and WhatsApp notification with your courier tracking link (Leopards / TCS / Trax) so you can monitor your parcel in real-time.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-amber-900/10 p-8 text-center border border-amber-800/20">
          <h3 className="font-serif text-base font-semibold text-neutral-900">Need help with an ongoing order?</h3>
          <p className="mt-1 text-xs text-neutral-600">Contact our dispatch support team on WhatsApp or send us a message.</p>
          <div className="mt-4">
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-amber-800 px-6 py-2.5 text-xs font-semibold text-white hover:bg-amber-700"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
