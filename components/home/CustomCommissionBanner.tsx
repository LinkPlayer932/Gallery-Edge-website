import Image from "next/image";
import Link from "next/link";
import Button from "@/components/system/Button";
import { Sparkles, ArrowRight } from "lucide-react";

export default function CustomCommissionBanner() {
  return (
    <section className="relative flex min-h-[460px] items-center justify-center overflow-hidden bg-neutral-950">
      <Image
        src="/product-images/midnight-wildflower-trio/main.jpeg"
        alt="Bespoke framing craftsmanship in workshop"
        fill
        className="object-cover opacity-35 transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/70" />
      
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 text-center text-white">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-amber-400">
          <Sparkles size={13} />
          Bespoke Commission
        </div>
        
        <h2 className="mt-4 font-serif text-3xl font-semibold md:text-5xl leading-tight">
          Every piece has a story. Let&apos;s build its perfect frame.
        </h2>
        
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-300 md:text-base">
          Tell us your dimensions, timber preference, and wall styling vision. Our master joiners construct each frame to exact millimeter precision.
        </p>
        
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/custom-frames">
            <Button variant="secondary" size="lg" className="flex items-center gap-2 shadow-lg">
              Start Custom Commission
              <ArrowRight size={16} />
            </Button>
          </Link>
          <a
            href="https://wa.me/923301711146?text=Hi%20Gallery%20Edge%2C%20I%20would%20like%20to%20commission%20a%20custom%20frame."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/80 px-6 py-3 text-sm font-semibold text-neutral-200 backdrop-blur-sm transition-colors hover:border-neutral-500 hover:text-white"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}