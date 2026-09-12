import ReviewCard from "@/components/shared/ReviewCard";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "The Islamic calligraphy trio in natural walnut exceeded all my expectations. The wood joinery and non-reflective glass make the gold lettering pop with incredible depth in our drawing room.",
    name: "Zainab Malik",
    location: "DHA Lahore",
    timeAgo: "1 week ago",
    rating: 5,
  },
  {
    quote:
      "I ordered 8 custom sized frames for our new corporate office in Clifton. Gallery Edge delivered on time, perfectly packaged in wooden crates. 10/10 quality and service!",
    name: "Hamza Tariq",
    location: "Karachi",
    timeAgo: "3 weeks ago",
    rating: 5,
  },
  {
    quote:
      "Super fast delivery to Islamabad! The packaging was so secure that even the large glass piece arrived without a single scratch. Highly recommend their bespoke sizing service.",
    name: "Dr. Ayesha Rehman",
    location: "Islamabad",
    timeAgo: "1 month ago",
    rating: 5,
  },
  {
    quote:
      "The finish and texture on the matte black floater frame are stunning. It brought our wedding portrait to life. Outstanding craftsmanship.",
    name: "Bilal & Sarah",
    location: "Faisalabad",
    timeAgo: "2 weeks ago",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[#F3EFE7] px-6 py-20">
      <div className="mx-auto max-w-7xl text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-amber-800">
          <Star size={12} className="fill-amber-600 text-amber-600" />
          Verified Collector Reviews
        </div>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-neutral-900 md:text-4xl">
          Loved by Art Lovers Across Pakistan
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-neutral-600">
          Over 15,000 homes and offices trust Gallery Edge for museum-quality framing.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <ReviewCard 
              key={t.name} 
              quote={t.quote} 
              name={`${t.name} (${t.location})`} 
              timeAgo={t.timeAgo} 
              rating={t.rating} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}