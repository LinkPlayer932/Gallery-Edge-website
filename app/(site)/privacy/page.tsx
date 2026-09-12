import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Gallery Edge",
  description: "Privacy policy for Gallery Edge customers and visitors.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-[#FAF7F2] py-16">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm md:p-12">
        <h1 className="font-serif text-3xl font-semibold text-neutral-900">Privacy Policy</h1>
        <p className="mt-2 text-xs text-neutral-500">Last updated: September 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-neutral-700">
          <section>
            <h2 className="font-serif text-lg font-semibold text-neutral-900">1. Information We Collect</h2>
            <p className="mt-2 text-xs text-neutral-600">
              When you place an order or contact us at Gallery Edge, we collect information you provide directly, such as your name, shipping address, email address, and phone number to fulfill and deliver your orders.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-neutral-900">2. How We Use Your Information</h2>
            <p className="mt-2 text-xs text-neutral-600">
              We use your data solely for processing orders, communicating delivery updates via SMS/WhatsApp, providing customer service, and sending periodic newsletters if you opted in.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-neutral-900">3. Data Security</h2>
            <p className="mt-2 text-xs text-neutral-600">
              We never sell or rent your personal information to third parties. Information is only shared with verified courier partners (such as TCS, Leopards, Trax) to ensure physical delivery of your goods.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg font-semibold text-neutral-900">4. Contact Us</h2>
            <p className="mt-2 text-xs text-neutral-600">
              For any questions regarding your privacy, please contact us at support@galleryedge.pk or via our contact page.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
