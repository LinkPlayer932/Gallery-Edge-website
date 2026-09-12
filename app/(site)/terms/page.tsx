import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Gallery Edge",
  description: "Terms and conditions for purchases, orders, and services at Gallery Edge.",
};

export default function TermsPage() {
  return (
    <main className="bg-[#FAF7F2] py-16">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm md:p-12">
        <h1 className="font-serif text-3xl font-semibold text-neutral-900">Terms of Service</h1>
        <p className="mt-2 text-xs text-neutral-500">Last updated: September 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-neutral-700">
          <section>
            <h2 className="font-serif text-lg font-semibold text-neutral-900">1. Acceptance of Terms</h2>
            <p className="mt-2 text-xs text-neutral-600">
              By using Gallery Edge, placing an order, or commissioning custom frame services, you agree to comply with and be bound by these terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-neutral-900">2. Pricing and Payment</h2>
            <p className="mt-2 text-xs text-neutral-600">
              All prices listed on Gallery Edge are in Pakistani Rupees (PKR / Rs.). Cash on Delivery (COD) orders require full payment upon receipt.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-neutral-900">3. Custom Orders &amp; Measurements</h2>
            <p className="mt-2 text-xs text-neutral-600">
              Customers are responsible for providing accurate dimensions for custom framing commissions. Because custom frames are tailored individually, they cannot be cancelled once manufacturing has commenced.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-neutral-900">4. Damage and Warranty</h2>
            <p className="mt-2 text-xs text-neutral-600">
              Any item damaged in transit must be reported within 48 hours of delivery with photographic evidence for an immediate complimentary replacement.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
