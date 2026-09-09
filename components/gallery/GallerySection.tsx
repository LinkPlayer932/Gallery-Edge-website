"use client";

import { useMemo, useState } from "react";
import GalleryFilterTabs from "./GalleryFilterTabs";
import GalleryMasonryGrid, { galleryImages } from "./GalleryMasonryGrid";

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredImages = useMemo(() => {
    if (activeFilter === "All") return galleryImages;
    return galleryImages.filter((img) => img.category === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <GalleryFilterTabs onFilterChange={setActiveFilter} />
      <GalleryMasonryGrid images={filteredImages} />
    </>
  );
}