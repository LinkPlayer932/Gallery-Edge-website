import Image from "next/image";
import Link from "next/link";
import Button from "@/components/system/Button";

export default function CustomCommissionBanner() {
  return (
    <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden">
      <Image
        // src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80"
        src="https://picsum.photos/seed/coastline/1600/700"
        alt="Aerial coastline"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center text-white">
        <p className="text-xs font-medium uppercase tracking-widest text-amber-400">
          Made to Measure
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold md:text-4xl">
          Every frame is a custom commission.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-neutral-200">
          Tell us your dimensions, material preferences, and style. Our framemakers
          build it to your exact specifications.
        </p>
        <Link href="/custom-frames">
          <Button variant="secondary" size="lg" className="mt-6">
            Start Your Custom Frame
          </Button>
        </Link>
      </div>
    </section>
  );
}