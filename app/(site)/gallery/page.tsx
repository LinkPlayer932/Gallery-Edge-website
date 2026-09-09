// import GalleryFilterTabs from "@/components/gallery/GalleryFilterTabs";
// import GalleryMasonryGrid from "@/components/gallery/GalleryMasonryGrid";

// export default function GalleryPage() {
//   return (
//     <main>
//       <section className="bg-[#F3EFE7] px-6 py-20 text-center">
//         <div className="mx-auto max-w-2xl">
//           <p className="text-xs font-medium uppercase tracking-widest text-amber-700">
//             Inspiration Gallery
//           </p>
//           <h1 className="mt-3 font-serif text-4xl font-semibold text-neutral-900 md:text-5xl">
//             Frames in Context
//           </h1>
//           <p className="mt-5 text-sm leading-relaxed text-neutral-600">
//             Real Gallery Edge frames in real spaces. Browse for ideas or find the
//             look for your home.
//           </p>
//         </div>
//       </section>

//       <GalleryFilterTabs />
//       <GalleryMasonryGrid />
//     </main>
//   );
// }
import GallerySection from "@/components/gallery/GallerySection";

export default function GalleryPage() {
  return (
    <main>
      <section className="bg-[#F3EFE7] px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-amber-700">
            Inspiration Gallery
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-neutral-900 md:text-5xl">
            Frames in Context
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-neutral-600">
            Real Gallery Edge frames in real spaces. Browse for ideas or find the
            look for your home.
          </p>
        </div>
      </section>

      <GallerySection />
    </main>
  );
}