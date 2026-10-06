import { getProductsByCollection } from "@/lib/db-products";
import PostersGrid from "@/components/posters/PostersGrid";

export default async function PostersPage() {
  const posters = await getProductsByCollection("poster", 100);

  return (
    <div>
      {/* Hero heading */}
      <div className="border-b border-neutral-200 bg-[#F8F5F0] px-6 py-14 text-center md:px-12">
        <span className="text-sm font-medium uppercase tracking-widest text-[#B08D57]">
          New Collection
        </span>
        <h1 className="mt-3 font-serif text-4xl text-[#1A1A1A] md:text-5xl">
          Frames Posters
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[#6B6B6B]">
          Premium framed prints — from Islamic calligraphy pieces to iconic car
          posters. Interested in one? Message us on WhatsApp for pricing and
          availability.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        {posters.length === 0 ? (
          <p className="text-center text-neutral-500">
            No posters available right now.
          </p>
        ) : (
          <PostersGrid posters={posters} />
        )}
      </div>
    </div>
  );
}
