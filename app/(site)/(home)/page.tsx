import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import CategoryGrid from "@/components/home/CategoryGrid";
import BestsellersSection from "@/components/home/BestsellersSection";
import WhyGallerySection from "@/components/home/WhyGallerySection";
import CustomCommissionBanner from "@/components/home/CustomCommissionBanner";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import InstagramStrip from "@/components/home/InstagramStrip";
// import NewsletterSection from "@/components/shared/NewsletterSection";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <CategoryGrid />
      <BestsellersSection />
      <WhyGallerySection />
      <CustomCommissionBanner />
      <TestimonialsSection />
      <InstagramStrip />
      {/* <NewsletterSection /> */}
    </main>
  );
}