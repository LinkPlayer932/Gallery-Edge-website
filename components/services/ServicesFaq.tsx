"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What wood and materials do you use in your frames?",
    answer:
      "We strictly use kiln-dried natural hardwoods (such as Ash, Oak, Walnut, and Pine) along with premium engineered MDF for sleek modern finishes. Every frame includes acid-free backing barrier paper and moisture sealing to prevent degradation over decades.",
  },
  {
    question: "Can I order frames in non-standard or oversized dimensions?",
    answer:
      "Yes! Our custom sizing service allows you to configure exact dimensions down to millimeters, up to 60×90 inches. Simply visit our Custom Frames page or contact us on WhatsApp with your artwork's dimensions.",
  },
  {
    question: "How do you ensure framed glass arrives safely without breaking?",
    answer:
      "Every frame is encased in high-density corner guards, multi-layer bubble cushioning, and custom reinforced corrugated shipping boxes. In the rare event of transit damage, we provide an immediate 100% free replacement.",
  },
  {
    question: "Do you offer corporate discounts for large bulk orders?",
    answer:
      "Yes, we offer attractive tiered wholesale pricing for corporate offices, hotels, restaurants, interior design studios, and exhibitions ordering 10 or more frames. We also provide official invoices and CAD mockups.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We support Cash on Delivery (COD) across all cities in Pakistan, as well as Direct Bank Transfers, JazzCash, and Easypaisa upon request.",
  },
];

export default function ServicesFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(idx: number) {
    setOpenIndex((current) => (current === idx ? null : idx));
  }

  return (
    <section className="bg-[#FAF7F2] px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
            Got Questions?
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-neutral-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Everything you need to know about our services, materials, and delivery.
          </p>
        </div>

        <div className="mt-12 divide-y divide-neutral-200 rounded-2xl bg-white p-6 shadow-sm">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-4 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between text-left text-sm font-semibold text-neutral-900 transition-colors hover:text-amber-800"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-neutral-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-amber-800" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-3 text-xs leading-relaxed text-neutral-600 md:text-sm">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
