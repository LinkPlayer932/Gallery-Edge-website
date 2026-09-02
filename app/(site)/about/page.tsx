import MissionSection from "@/components/about/MissionSection";
import ValuesSection from "@/components/about/ValuesSection";
import TeamGrid from "@/components/about/TeamGrid";
import CtaBanner from "@/components/about/CtaBanner";

export default function AboutPage() {
  return (
    <main>
      {/* Intro */}
      <section className="bg-[#F3EFE7] px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-amber-700">
            Our Story
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-neutral-900 md:text-5xl">
            Crafted with <span className="italic">intention.</span>
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-neutral-600">
            Gallery Edge was founded in 1987 by Helena Marsh, a conservator and
            passionate art collector who believed that a frame is not just a
            border — it&apos;s a conversation between the art and its environment.
          </p>
        </div>
      </section>

      <MissionSection />
      <ValuesSection />
      <TeamGrid />
      <CtaBanner />
    </main>
  );
}