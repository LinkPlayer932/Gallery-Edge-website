import { Metadata } from "next";
import Image from "next/image";
import GallerySection from "@/components/gallery/GallerySection";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Inspiration Gallery | Gallery Edge - Frames in Real Spaces",
  description:
    "Browse real Gallery Edge frames styled in homes, living rooms, and gallery walls across Pakistan.",
};

export default function GalleryPage() {
  return (
    <main>
      <section className="relative flex min-h-[440px] items-center justify-center overflow-hidden bg-neutral-950 px-6 py-24 text-center text-white md:py-32">
        {/* Background Image */}
        <Image
          src="/product-images/islamic-calligraphy-gallery-set/main.jpeg"
          alt="Gallery wall exhibition with handcrafted frames"
          fill
          priority
          className="object-cover opacity-25 scale-105"
        />

        {/* Dark Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/30 via-transparent to-black/60" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 backdrop-blur-md shadow-md">
            {/* <Sparkles size={14} /> */}
            Inspiration Gallery
          </div>

          <h1 className="mt-6 font-serif text-4xl font-semibold md:text-6xl leading-tight">
            Frames in Real Spaces
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-200 md:text-base">
            See how collectors and designers across Pakistan style our handcrafted frames. Click any piece to inspect details in high-definition.
          </p>
        </div>
      </section>

      <GallerySection />
    </main>
  );
}