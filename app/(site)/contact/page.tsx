import { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfoCards from "@/components/contact/ContactInfoCards";
import { MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Gallery Edge - Bespoke Framing & Customer Support",
  description:
    "Get in touch with Gallery Edge for custom framing consultations, order assistance, or bulk inquiries in Pakistan.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="relative flex min-h-[440px] items-center justify-center overflow-hidden bg-neutral-950 px-6 py-24 text-center text-white md:py-32">
        {/* Background Image */}
        <Image
          src="/product-images/botanical-still-life-trio/main.jpeg"
          alt="Studio consultation and framed art collection"
          fill
          priority
          className="object-cover opacity-55 scale-105"
        />

        {/* Dark Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/30 via-transparent to-black/60" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 backdrop-blur-md shadow-md">
            {/* <MessageSquare size={14} /> */}
            We&apos;d Love to Hear From You
          </div>

          <h1 className="mt-6 font-serif text-4xl font-semibold md:text-6xl leading-tight">
            Get in Touch
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-200 md:text-base">
            Questions about custom dimensions, ongoing shipments, or wall mockups? Our framing specialists are here to guide you.
          </p>
        </div>
      </section>

      <section className="bg-[#FAF7F2] px-6 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <ContactForm />
          </div>
          <ContactInfoCards />
        </div>
      </section>
    </main>
  );
}