import { Metadata } from "next";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesGrid from "@/components/services/ServicesGrid";
import ServicesProcess from "@/components/services/ServicesProcess";
import ServicesFaq from "@/components/services/ServicesFaq";
import ServicesCta from "@/components/services/ServicesCta";

export const metadata: Metadata = {
  title: "Our Services | Gallery Edge - Bespoke Framing & Art Consultation",
  description:
    "Explore our premium framing and art services: custom sizing, corporate bulk orders, interior wall layouts, canvas printing, frame restoration, and safe delivery across Pakistan.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <ServicesHero />
      <ServicesGrid />
      <ServicesProcess />
      <ServicesFaq />
      <ServicesCta />
    </main>
  );
}
