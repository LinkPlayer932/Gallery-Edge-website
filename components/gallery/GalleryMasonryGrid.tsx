"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryImage {
  src: string;
  category: string;
  title?: string;
}

export const galleryImages: GalleryImage[] = [
  { 
    src: "/product-images/islamic-calligraphy-gallery-set/main.jpeg", 
    category: "Islamic Calligraphy",
    title: "Surah Al-Ikhlas & Ayatul Kursi Gold Foliated Trio" 
  },
  { 
    src: "/product-images/call-to-prayer-trio/main.jpeg", 
    category: "Islamic Calligraphy",
    title: "Call to Prayer Geometric Gallery Set" 
  },
  { 
    src: "/product-images/sacred-names-trio/main.jpeg", 
    category: "Islamic Calligraphy",
    title: "Allah & Muhammad Sacred Calligraphy" 
  },
  { 
    src: "/product-images/tasbeeh-set-trio/main.jpeg", 
    category: "Islamic Calligraphy",
    title: "SubhanAllah, Alhamdulillah, AllahuAkbar Trio" 
  },
  { 
    src: "/product-images/midnight-wildflower-trio/main.jpeg", 
    category: "Natural",
    title: "Midnight Wildflower Botanical Art Prints" 
  },
  { 
    src: "/product-images/botanical-still-life-trio/main.jpeg", 
    category: "Natural",
    title: "Olive & Botanical Pressed Flora Frames" 
  },
  { 
    src: "/product-images/vintage-chrysanthemum-print/main.jpeg", 
    category: "Classic",
    title: "Vintage Japanese Chrysanthemum Gold Trim" 
  },
  { 
    src: "/product-images/dandelion-duo/main.jpeg", 
    category: "Natural",
    title: "Golden Hour Dandelion Duo Minimalist" 
  },
  { 
    src: "/product-images/marble-ink-abstract/main.jpeg", 
    category: "Modern",
    title: "Monochrome Fluid Marble Ink Flow" 
  },
];

interface GalleryMasonryGridProps {
  images: GalleryImage[];
}

export default function GalleryMasonryGrid({ images }: GalleryMasonryGridProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  function openLightbox(idx: number) {
    setSelectedImageIndex(idx);
  }

  function closeLightbox() {
    setSelectedImageIndex(null);
  }

  function nextImage() {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex + 1) % images.length);
  }

  function prevImage() {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {images.map((img, i) => (
          <div
            key={img.src + i}
            onClick={() => openLightbox(i)}
            className="group relative mb-6 cursor-pointer break-inside-avoid overflow-hidden rounded-2xl bg-white shadow-sm border border-neutral-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative overflow-hidden">
              <Image
                src={img.src}
                alt={img.title || `Gallery frame example ${i + 1}`}
                width={600}
                height={i % 2 === 0 ? 650 : 450}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30 flex items-center justify-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-900 opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100">
                  <ZoomIn size={18} />
                </span>
              </div>
            </div>

            <div className="p-4 bg-white flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  {img.category}
                </p>
                <p className="mt-0.5 font-serif text-sm font-semibold text-neutral-900">
                  {img.title || "Custom Framing Showcase"}
                </p>
              </div>
              <span className="rounded-full bg-[#FAF7F2] px-2.5 py-1 text-[11px] font-medium text-neutral-600">
                View Piece
              </span>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="rounded-2xl bg-white p-12 text-center text-sm text-neutral-500 border border-neutral-200">
          No frames found in this category yet.
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && images[selectedImageIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close modal"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft size={26} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Next image"
          >
            <ChevronRight size={26} />
          </button>

          <div
            className="relative max-h-[85vh] max-w-4xl overflow-hidden rounded-2xl bg-neutral-950 p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[70vh] w-[85vw] max-w-3xl">
              <Image
                src={images[selectedImageIndex].src}
                alt={images[selectedImageIndex].title || "Gallery preview"}
                fill
                className="object-contain"
              />
            </div>
            <div className="p-4 text-center text-white">
              <p className="text-xs uppercase tracking-widest text-amber-400">
                {images[selectedImageIndex].category}
              </p>
              <h3 className="mt-1 font-serif text-lg font-semibold">
                {images[selectedImageIndex].title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
