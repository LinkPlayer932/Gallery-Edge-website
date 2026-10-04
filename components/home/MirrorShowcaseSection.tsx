import Link from "next/link";
import Image from "next/image";

export default function MirrorShowcaseSection() {
  return (
    <section className="bg-[#FAF7F2] py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
        {/* Text side */}
        <div className="flex flex-col gap-5">
          <span className="text-sm font-medium uppercase tracking-wider text-amber-700">
            New Collection
          </span>
          <h2 className="font-serif text-4xl font-semibold leading-tight text-neutral-900 md:text-5xl">
            Mirrors That Make
            <br />
            a Statement
          </h2>
          <p className="max-w-md text-neutral-600">
            From sleek arched frames to bold full-length pieces, our mirror
            collection blends craftsmanship with everyday elegance — designed
            to transform any room into a gallery of light and reflection.
          </p>
          <Link
            href="/shop?category=mirrors"
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-800"
          >
            Shop Mirrors
          </Link>
        </div>

        {/* Image side */}
        <Link
          href="/shop?category=mirrors"
          className="group relative block w-full overflow-hidden rounded-2xl"
        >
          <div className="relative h-[400px] w-full md:h-[550px] lg:h-[650px]">
            <Image
              src="/mirror/Mirror.jpg"
              alt="Mirror collection"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
