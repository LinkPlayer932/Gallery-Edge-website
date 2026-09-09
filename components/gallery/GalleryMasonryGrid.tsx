// import Image from "next/image";

// const galleryImages = [
//   "/product-images/islamic-calligraphy-gallery-set/main.jpeg",
//   "/product-images/call-to-prayer-trio/main.jpeg",
//   "/product-images/sacred-names-trio/main.jpeg",
//   "/product-images/tasbeeh-set-trio/main.jpeg",
//   "/product-images/midnight-wildflower-trio/main.jpeg",
//   "/product-images/botanical-still-life-trio/main.jpeg",
//   "/product-images/vintage-chrysanthemum-print/main.jpeg",
//   "/product-images/dandelion-duo/main.jpeg",
//   "/product-images/marble-ink-abstract/main.jpeg",
// ];

// export default function GalleryMasonryGrid() {
//   return (
//     <div className="mx-auto max-w-7xl px-6 py-12">
//       <div className="columns-1 gap-4 sm:columns-2 md:columns-3">
//         {galleryImages.map((src, i) => (
//           <div key={i} className="relative mb-4 break-inside-avoid overflow-hidden rounded-xl">
//             <Image
//               src={src}
//               alt={`Gallery frame example ${i + 1}`}
//               width={500}
//               height={i % 3 === 0 ? 650 : 400}
//               className="w-full object-cover"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
import Image from "next/image";

export interface GalleryImage {
  src: string;
  category: string;
}

export const galleryImages: GalleryImage[] = [
  { src: "/product-images/islamic-calligraphy-gallery-set/main.jpeg", category: "Islamic Calligraphy" },
  { src: "/product-images/call-to-prayer-trio/main.jpeg", category: "Islamic Calligraphy" },
  { src: "/product-images/sacred-names-trio/main.jpeg", category: "Islamic Calligraphy" },
  { src: "/product-images/tasbeeh-set-trio/main.jpeg", category: "Islamic Calligraphy" },
  { src: "/product-images/midnight-wildflower-trio/main.jpeg", category: "Natural" },
  { src: "/product-images/botanical-still-life-trio/main.jpeg", category: "Natural" },
  { src: "/product-images/vintage-chrysanthemum-print/main.jpeg", category: "Classic" },
  { src: "/product-images/dandelion-duo/main.jpeg", category: "Natural" },
  { src: "/product-images/marble-ink-abstract/main.jpeg", category: "Modern" },
];

interface GalleryMasonryGridProps {
  images: GalleryImage[];
}

export default function GalleryMasonryGrid({ images }: GalleryMasonryGridProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="columns-1 gap-4 sm:columns-2 md:columns-3">
        {images.map((img, i) => (
          <div key={img.src} className="relative mb-4 break-inside-avoid overflow-hidden rounded-xl">
            <Image
              src={img.src}
              alt={`Gallery frame example ${i + 1}`}
              width={500}
              height={i % 3 === 0 ? 650 : 400}
              className="w-full object-cover"
            />
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <p className="mt-10 text-center text-sm text-neutral-500">
          No images match this filter yet.
        </p>
      )}
    </div>
  );
}
