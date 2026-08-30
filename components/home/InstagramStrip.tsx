import Image from "next/image";
import Link from "next/link";

const images = [
  "/product-images/islamic-calligraphy-gallery-set/main.jpeg",
  "/product-images/call-to-prayer-trio/main.jpeg",
  "/product-images/sacred-names-trio/main.jpeg",
  "/product-images/tasbeeh-set-trio/main.jpeg",
  "/product-images/midnight-wildflower-trio/main.jpeg",
  "/product-images/botanical-still-life-trio/main.jpeg",
];

export default function InstagramStrip() {
  return (
    <section className="bg-[#FAF7F2] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-amber-700">
              Inspiration
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-neutral-900">
              Frames in the Wild
            </h2>
          </div>
          <Link href="#" className="text-sm font-medium text-neutral-700 hover:text-amber-800">
            @galleryedge
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 md:grid-cols-6">
          {images.map((src, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
              <Image src={src} alt={`Frame in a real home setting ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}