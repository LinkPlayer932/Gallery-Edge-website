import Link from "next/link";
import { 
  Ruler, 
  Building2, 
  Palette, 
  Image as ImageIcon, 
  ShieldCheck, 
  HelpCircle,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

interface ServiceItem {
  id: string;
  icon: any;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  turnaround: string;
  ctaText: string;
  ctaLink: string;
  isExternal?: boolean;
  highlight?: boolean;
}

const services: ServiceItem[] = [
  {
    id: "custom-sizing",
    icon: Ruler,
    title: "Custom Sizing & Bespoke Frames",
    subtitle: "Built to your exact millimeter dimensions",
    description:
      "Have an oversized canvas, family heirloom, or non-standard certificate? Our master joiners fabricate custom frames in solid natural wood, sleek metals, and contemporary finishes with UV-filtering glass.",
    features: [
      "Any dimension up to 60×90 inches",
      "Choice of solid oak, walnut, ash, or matte metals",
      "Acid-free archival museum matting",
      "Ready-to-hang high-tensile hardware included"
    ],
    turnaround: "5 – 8 business days",
    ctaText: "Configure Custom Size",
    ctaLink: "/custom-frames",
    highlight: true,
  },
  {
    id: "bulk-orders",
    icon: Building2,
    title: "Bulk & Commercial Corporate Orders",
    subtitle: "Turnkey art solutions for offices, hotels & restaurants",
    description:
      "We partner with corporate developers, boutique hotels, architects, and luxury interior studios across Pakistan to deliver high-volume matching frames with wholesale tier pricing.",
    features: [
      "Special volume discounts for 10+ frames",
      "Dedicated account manager & CAD proofing",
      "Secure crate packaging for multi-city delivery",
      "Invoice and corporate tax compliance"
    ],
    turnaround: "10 – 15 business days",
    ctaText: "Request Corporate Quote",
    ctaLink: "https://wa.me/923301711146?text=Hi%20Gallery%20Edge%2C%20I%20would%20like%20to%20inquire%20about%20a%20Bulk%20%2F%20Commercial%20order.",
    isExternal: true,
  },
  {
    id: "interior-design",
    icon: Palette,
    title: "Interior Design & Wall Gallery Layouts",
    subtitle: "Transform blank walls into captivating focal points",
    description:
      "Unsure how to arrange a grid of 6 or 9 frames, or match frame finishes with your wall color? Send us a photo of your wall and our styling specialists will generate personalized layout renders.",
    features: [
      "Digital 2D/3D wall mockup visualization",
      "Color matching with room aesthetic & furniture",
      "Spacing and hanging blueprint templates included",
      "Curated artwork & photography suggestions"
    ],
    turnaround: "24 – 48 hours for layout mockups",
    ctaText: "Get Free Wall Advice",
    ctaLink: "/contact",
  },
  {
    id: "canvas-printing",
    icon: ImageIcon,
    title: "Canvas Printing & Gallery Stretches",
    subtitle: "High-definition archival canvas & float frames",
    description:
      "Bring your personal photographs, digital artworks, or Islamic calligraphy to life on 380gsm textured cotton canvas with pigment inks that never fade, mounted on sturdy wooden stretcher bars.",
    features: [
      "12-color archival giclée printing",
      "Museum wrap (1.5\") or standard wrap options",
      "Modern wooden floater frames available",
      "Moisture and scratch-resistant coating"
    ],
    turnaround: "3 – 5 business days",
    ctaText: "Inquire Canvas Printing",
    ctaLink: "/contact",
  },
  {
    id: "frame-repair",
    icon: ShieldCheck,
    title: "Frame Restoration & Preservation",
    subtitle: "Revive and protect your treasured memories",
    description:
      "Restore broken moulding, replace cracked glass with non-reflective UV museum glass, or swap yellowing acidic backings with conservation-grade barrier boards to protect valuable memories.",
    features: [
      "Corner joint reinforcement and structural repairs",
      "Glass replacement (Anti-glare / 99% UV-protective)",
      "Dust and moisture sealing",
      "Conservation mat replacement"
    ],
    turnaround: "4 – 7 business days",
    ctaText: "Consult Restoration",
    ctaLink: "https://wa.me/923301711146?text=Hi%20Gallery%20Edge%2C%20I%20have%20a%20frame%20repair%20or%20restoration%20inquiry.",
    isExternal: true,
  },
  {
    id: "art-consultation",
    icon: HelpCircle,
    title: "Art Consultation & Bespoke Commission",
    subtitle: "Sourcing and crafting tailored signature pieces",
    description:
      "Looking for a one-of-a-kind Islamic calligraphy canvas, textured abstract, or heritage architectural print? Our curators connect you with master artisans to bring your artistic vision to reality.",
    features: [
      "One-on-one consultation with art curators",
      "Custom handmade calligraphy & bespoke prints",
      "Authentic artisanal certification",
      "Complete frame and finish matching"
    ],
    turnaround: "7 – 14 business days",
    ctaText: "Book Art Consultation",
    ctaLink: "/contact",
  },
];

export default function ServicesGrid() {
  return (
    <section className="bg-[#FAF7F2] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
            What We Offer
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-neutral-900 md:text-4xl">
            Complete Framing &amp; Art Services
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600">
            Every service is backed by our passion for perfection, premium materials, and reliable delivery anywhere in Pakistan.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={service.id}
                className={`relative flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  service.highlight
                    ? "border-2 border-amber-600 ring-4 ring-amber-600/10"
                    : "border border-neutral-200/80"
                }`}
              >
                {service.highlight && (
                  <span className="absolute -top-3 right-6 rounded-full bg-amber-700 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-white">
                    Most Popular
                  </span>
                )}

                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F3EFE7] text-amber-800">
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-6 font-serif text-xl font-semibold text-neutral-900">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-amber-700">
                    {service.subtitle}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {service.description}
                  </p>

                  <div className="mt-6 border-t border-neutral-100 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Key Highlights
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {service.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-700">
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-amber-700" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 border-t border-neutral-100 pt-5">
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>Est. Turnaround:</span>
                    <span className="font-semibold text-neutral-800">{service.turnaround}</span>
                  </div>

                  {service.isExternal ? (
                    <a
                      href={service.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-amber-800"
                    >
                      {service.ctaText}
                      <ArrowRight size={14} />
                    </a>
                  ) : (
                    <Link
                      href={service.ctaLink}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-amber-800"
                    >
                      {service.ctaText}
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
