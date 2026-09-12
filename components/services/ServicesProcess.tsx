import { MessageSquare, Hammer, ShieldCheck, Truck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "1. Consultation & Sizing",
    description:
      "Share your artwork dimensions, photo references, or wall styling goals via our online configurator or WhatsApp.",
  },
  {
    number: "02",
    icon: Hammer,
    title: "2. Artisan Crafting",
    description:
      "Our master framers cut, join, sand, and finish your frame by hand using solid timbers and museum-grade mats.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "3. Quality & Sealing",
    description:
      "Each piece undergoes a 12-point inspection, dust-sealing, and is fitted with heavy-duty hanging hardware.",
  },
  {
    number: "04",
    icon: Truck,
    title: "4. Armored Delivery",
    description:
      "Delivered in reinforced foam-cushioned packaging directly to your doorstep with Cash on Delivery across Pakistan.",
  },
];

export default function ServicesProcess() {
  return (
    <section className="border-t border-neutral-200 bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
            How It Works
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-neutral-900 md:text-4xl">
            Our 4-Step Crafting Journey
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-neutral-600">
            From raw kiln-dried wood to a finished gallery centerpiece in your home or office.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative rounded-xl border border-neutral-100 bg-[#FAF7F2] p-6 text-center transition-all hover:border-amber-200 hover:shadow-sm"
              >
                <span className="font-serif text-3xl font-bold text-amber-200">
                  {step.number}
                </span>
                <div className="mx-auto mt-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-amber-800 shadow-sm">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-serif text-base font-semibold text-neutral-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
