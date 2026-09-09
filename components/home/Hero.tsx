import Image from "next/image";
import Link from "next/link";
import Button from "@/components/system/Button";

export default function Hero() {
  return (
    <section className="relative flex min-h-[600px] items-center overflow-hidden bg-neutral-950">
      <Image
        src="/product-images/sacred-names-trio/main.jpeg"
        alt="Handcrafted calligraphy frames displayed in a living room"
        fill
        priority
        className="object-cover"
      />
      {/* Dark overlay for text readability — image stays sharp */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-widest text-amber-500">
            Handcrafted Since 2009
          </p>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight text-white md:text-6xl">
            Where Art Meets its <span className="italic">Perfect Frame.</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-neutral-300">
            Gallery-quality custom frames, handcrafted from the world&apos;s finest
            materials. Made to last a lifetime, built to show off art the way it
            deserves.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/shop">
              <Button variant="secondary" size="lg">
                Shop All Frames
              </Button>
            </Link>
            <Link href="/gallery">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                View Gallery
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}