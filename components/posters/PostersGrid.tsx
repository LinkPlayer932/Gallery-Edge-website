"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const WHATSAPP_NUMBER = "923001234567"; // apna real number yahan

interface PosterProduct {
  _id: string;
  name: string;
  image: string;
  category?: string;
  categorySlug?: string;
}

function getDisplayCategory(product: PosterProduct) {
  return (
    product.category ||
    (product.categorySlug === "islamic-calligraphy"
      ? "Calligraphy"
      : "Car Frame")
  );
}

export default function PostersGrid({ posters }: { posters: PosterProduct[] }) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("All");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(posters.map(getDisplayCategory)));
    return ["All", ...unique];
  }, [posters]);

  const filteredPosters = useMemo(() => {
    if (activeTab === "All") return posters;
    return posters.filter((p) => getDisplayCategory(p) === activeTab);
  }, [posters, activeTab]);

  return (
    <>
      {/* Category tabs */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              activeTab === cat
                ? "bg-neutral-900 text-white"
                : "bg-white text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {filteredPosters.map((product) => {
          const message = encodeURIComponent(
            `Hi, I'm interested in the "${product.name}" poster from Gallery Edge.`,
          );
          const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

          return (
            <div key={product._id} className="group">
              <button
                type="button"
                onClick={() => setActiveImage(product.image)}
                className="relative block aspect-[3/4] w-full overflow-hidden rounded-lg bg-white shadow-sm"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-[#1A1A1A] shadow-xs">
                  {getDisplayCategory(product)}
                </span>
              </button>

              <h3 className="mt-3 text-sm font-medium text-[#1A1A1A]">
                {product.name}
              </h3>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#1DA851]"
              >
                Contact on WhatsApp
              </a>
            </div>
          );
        })}
      </div>

      {filteredPosters.length === 0 && (
        <p className="py-12 text-center text-neutral-500">
          No posters in this category.
        </p>
      )}

      {/* Lightbox overlay */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6"
        >
          <button
            onClick={() => setActiveImage(null)}
            className="absolute right-6 top-6 text-white hover:text-neutral-300"
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <div className="relative h-[90vh] w-full max-w-3xl">
            <Image
              src={activeImage}
              alt="Poster preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
