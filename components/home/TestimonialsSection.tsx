import ReviewCard from "@/components/shared/ReviewCard";

const testimonials = [
  {
    quote:
      "The walnut gallery frame exceeded every expectation. The craftsmanship is extraordinary — you can feel the quality the moment you hold it. My oil painting has never looked so good.",
    name: "Eleanor Voss",
    timeAgo: "2 weeks ago",
    rating: 5,
  },
  {
    quote:
      "I ordered custom float frames for my entire photography portfolio. Gallery Edge worked with me to get the dimensions exactly right — the floating effect is stunning.",
    name: "Marcus Chen",
    timeAgo: "1 month ago",
    rating: 5,
  },
  {
    quote:
      "Fast delivery, immaculate packaging, and the brushed gold frame is even more beautiful in person than the photos. The museum glass is a revelation — zero reflection.",
    name: "Sophia Laurent",
    timeAgo: "3 weeks ago",
    rating: 5,
  },
  {
    quote:
      "Beautiful product. The antique ornate frame transformed a reproduction into something that looks genuinely museum-worthy. Slightly longer wait than expected but absolutely worth it.",
    name: "James Whitfield",
    timeAgo: "2 months ago",
    rating: 4,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[#F3EFE7] px-6 py-20">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-amber-700">
          Customer Stories
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-neutral-900">
          What Our Collectors Say
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <ReviewCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}