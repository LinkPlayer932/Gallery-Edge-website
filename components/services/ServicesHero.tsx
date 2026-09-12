import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function ServicesHero() {
  return (
    <section className="relative flex min-h-[460px] items-center justify-center overflow-hidden bg-neutral-950 py-24 text-white md:py-32">
      {/* Background Image */}
      <Image
        src="/category-images/custom-frames/custom-frame-1.jpeg"
        alt="Bespoke framing craftsmanship in workshop"
        fill
        priority
        className="object-cover opacity-25 scale-105"
      />

      {/* Dark Vignette & Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/30 via-transparent to-black/60" />
      
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400 backdrop-blur-md shadow-md">
          {/* <Sparkles size={14} /> */}
          Bespoke Art &amp; Framing Services
        </div>

        <h1 className="mt-6 font-serif text-4xl font-semibold tracking-tight text-white md:text-6xl leading-tight">
          Craftsmanship tailored to your space &amp; story.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-200 md:text-lg">
          From millimeter-precise custom framing to corporate bulk styling and museum-grade conservation, 
          we bring exceptional artistry to every piece you cherish.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/custom-frames"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-700 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-amber-950/50 transition-all hover:bg-amber-600 hover:scale-105"
          >
            Start Custom Commission
            <ArrowRight size={16} />
          </Link>
          <a
            href="https://wa.me/923301711146?text=Hi%20Gallery%20Edge%2C%20I%20am%20interested%20in%20your%20framing%20and%20art%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-600 bg-neutral-900/80 px-7 py-3.5 text-sm font-semibold text-neutral-200 backdrop-blur-md transition-all hover:border-amber-500 hover:text-white hover:bg-neutral-800/90"
          >
            WhatsApp Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
