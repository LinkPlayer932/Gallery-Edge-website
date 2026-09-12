import Image from "next/image";
import Link from "next/link";
import Button from "@/components/system/Button";
import { CheckCircle } from "lucide-react";

export default function MissionSection() {
  return (
    <section className="bg-[#FAF7F2] px-6 py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
            Our Craft &amp; Heritage
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-neutral-900 md:text-4xl leading-tight">
            Frames worthy of the art &amp; memories they hold
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-neutral-600">
            At Gallery Edge, we combine time-honored woodworking joinery with modern conservation techniques. 
            Every frame is hand-assembled in our studio by skilled Pakistani artisans who care deeply about proportion, 
            grain, and structural durability.
          </p>
          
          <ul className="mt-6 space-y-3">
            {[
              "Kiln-dried solid ash, walnut, oak, and pine mouldings",
              "Museum-grade UV protective glass & anti-reflective acrylics",
              "100% acid-free barrier matting to prevent artwork aging",
              "Heavy-duty stainless hanging hardware pre-installed",
            ].map((point, i) => (
              <li key={i} className="flex items-center gap-2.5 text-xs text-neutral-700 font-medium">
                <CheckCircle size={15} className="text-amber-700 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex gap-4">
            <Link href="/shop">
              <Button variant="primary" size="lg">
                Explore Collection
              </Button>
            </Link>
            <Link href="/custom-frames">
              <Button variant="outline" size="lg">
                Custom Framing
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative h-[420px] overflow-hidden rounded-2xl shadow-md">
          <Image
            src="/product-images/tasbeeh-set-trio/main.jpeg"
            alt="Handcrafted calligraphy frames in exhibition"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}