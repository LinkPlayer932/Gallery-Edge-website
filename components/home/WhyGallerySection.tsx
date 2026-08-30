import { Gem, Ruler, Truck, Hammer } from "lucide-react";

const features = [
  {
    icon: Gem,
    title: "Museum-Quality Materials",
    description:
      "UV-protective glass, acid-free backings, and sustainably sourced hardwoods in every frame.",
  },
  {
    icon: Ruler,
    title: "Custom Sizing",
    description: "Any dimension up to 60×80\". Our craftsmen build to your exact millimetre.",
  },
  {
    icon: Truck,
    title: "3-Day Delivery",
    description:
      "Most frames ship within 72 hours. Custom orders in 10–14 business days.",
  },
  {
    icon: Hammer,
    title: "Handcrafted Heritage",
    description:
      "Each frame passes through 14 hand-finishing stages before reaching your door.",
  },
];

export default function WhyGallerySection() {
  return (
    <section className="bg-[#FAF7F2] px-6 py-20">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-amber-700">
          Our Promise
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-neutral-900">
          Why Gallery Edge
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0E6D6]">
                <feature.icon size={22} className="text-amber-700" />
              </div>
              <p className="mt-4 font-serif text-base font-semibold text-neutral-900">
                {feature.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}