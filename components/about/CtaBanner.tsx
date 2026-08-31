import Link from "next/link";
import Button from "@/components/system/Button";

export default function CtaBanner() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl rounded-2xl bg-neutral-950 px-8 py-14 text-center">
        <h2 className="font-serif text-2xl font-semibold text-white md:text-3xl">
          Ready to find your frame?
        </h2>
        <p className="mt-3 text-sm text-neutral-400">
          Browse 100+ handcrafted frames or commission something completely bespoke.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/shop">
            <Button variant="secondary" size="lg">
              Shop All Frames
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}