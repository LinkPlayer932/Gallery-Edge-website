import { Metadata } from "next";
import ServicesFaq from "@/components/services/ServicesFaq";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Gallery Edge",
  description: "Find answers to questions about ordering, custom frame dimensions, delivery across Pakistan, payment methods, and returns.",
};

export default function FaqPage() {
  return (
    <main className="bg-[#FAF7F2] py-12">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">Support &amp; Help</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-neutral-900 md:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Have questions? We have answers. If you don&apos;t find what you are looking for, our team is always ready to assist.
          </p>
        </div>

        <ServicesFaq />

        <div className="mt-8 rounded-2xl bg-white p-8 text-center border border-neutral-200 shadow-sm">
          <h3 className="font-serif text-lg font-semibold text-neutral-900">Still have questions?</h3>
          <p className="mt-2 text-sm text-neutral-600">Our support team is available Monday to Saturday to assist you.</p>
          <div className="mt-4 flex justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-lg bg-neutral-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-amber-800"
            >
              Contact Support
            </Link>
            <a
              href="https://wa.me/923301711146"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-neutral-300 bg-neutral-50 px-5 py-2.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-100"
            >
              <MessageCircle size={14} className="text-green-600" />
              WhatsApp Help
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
