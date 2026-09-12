import { Metadata } from "next";
import Image from "next/image";
import MissionSection from "@/components/about/MissionSection";
import ValuesSection from "@/components/about/ValuesSection";
import TeamGrid from "@/components/about/TeamGrid";
import CtaBanner from "@/components/about/CtaBanner";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Gallery Edge - Handcrafted Premium Frames",
  description:
    "Learn about Gallery Edge's mission, craftsmanship, and commitment to museum-quality custom framing across Pakistan.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero Intro */}
      <section className="relative flex min-h-[460px] items-center justify-center overflow-hidden bg-neutral-950 px-6 py-24 text-center text-white md:py-32">
        {/* Background Image */}
        <Image
          src="/category-images/unmatched-decor/decor-13.jpeg"
          alt="Artisanal woodwork and frame studio"
          fill
          priority
          className="object-cover opacity-25 scale-105"
        />

        {/* Dark Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/30 via-transparent to-black/60" />

        <div className="relative z-10 mx-auto max-w-3xl">
          {/* <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 backdrop-blur-md shadow-md">
            // <Sparkles size={14} />
            Our Story &amp; Passion
          </div> */}

          <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight md:text-6xl">
            Where art is preserved with <span className="italic text-amber-300">intention.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-neutral-200 md:text-base">
            Gallery Edge was founded with a singular purpose: to elevate artwork, family heirlooms, 
            and sacred calligraphy with museum-grade bespoke framing that lasts for generations. 
            Every frame is made with uncompromised precision right here in Pakistan.
          </p>
        </div>
      </section>

      <MissionSection />
      <ValuesSection />
      <TeamGrid />
      <CtaBanner />
    </main>
  );
}