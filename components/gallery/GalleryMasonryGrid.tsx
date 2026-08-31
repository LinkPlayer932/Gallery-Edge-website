import Image from "next/image";

const galleryImages = [
  "/product-images/islamic-calligraphy-gallery-set/main.jpeg",
  "/product-images/call-to-prayer-trio/main.jpeg",
  "/product-images/sacred-names-trio/main.jpeg",
  "/product-images/tasbeeh-set-trio/main.jpeg",
  "/product-images/midnight-wildflower-trio/main.jpeg",
  "/product-images/botanical-still-life-trio/main.jpeg",
  "/product-images/vintage-chrysanthemum-print/main.jpeg",
  "/product-images/dandelion-duo/main.jpeg",
  "/product-images/marble-ink-abstract/main.jpeg",
];

export default function GalleryMasonryGrid() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="columns-1 gap-4 sm:columns-2 md:columns-3">
        {galleryImages.map((src, i) => (
          <div key={i} className="relative mb-4 break-inside-avoid overflow-hidden rounded-xl">
            <Image
              src={src}
              alt={`Gallery frame example ${i + 1}`}
              width={500}
              height={i % 3 === 0 ? 650 : 400}
              className="w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}