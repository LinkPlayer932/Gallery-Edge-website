import Image from "next/image";
import Link from "next/link";
import Button from "@/components/system/Button";

export default function MissionSection() {
  return (
    <section className="bg-[#FAF7F2] px-6 py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-amber-700">
            Our Mission
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-neutral-900">
            Frames worthy of the art they hold
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-neutral-600">
            We work with a small team of master framemakers, each with decades of
            experience in joinery, gilding, and conservation. Every frame that
            leaves our workshop has been through 14 stages of hand-finishing.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
            We source our timber from FSC-certified forests and our metals from
            responsible suppliers. Our glass and archival materials meet museum
            conservation standards — because art is meant to last.
          </p>
          <Link href="/shop">
            <Button variant="primary" size="lg" className="mt-6">
              Explore Our Collection
            </Button>
          </Link>
        </div>

        <div className="relative h-[360px] overflow-hidden rounded-xl">
          <Image
            src="/product-images/tasbeeh-set-trio/main.jpeg"
            alt="Master framemaker at work"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}