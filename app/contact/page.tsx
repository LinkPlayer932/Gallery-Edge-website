import ContactForm from "@/components/contact/ContactForm";
import ContactInfoCards from "@/components/contact/ContactInfoCards";

export default function ContactPage() {
  return (
    <main>
      <section className="bg-[#F3EFE7] px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-amber-700">
            We&apos;d Love to Hear From You
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-neutral-900 md:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-neutral-600">
            Questions about custom orders, sizing, or care? Our team of
            framemakers is here to help.
          </p>
        </div>
      </section>

      <section className="bg-[#FAF7F2] px-6 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <ContactForm />
          </div>
          <ContactInfoCards />
        </div>
      </section>
    </main>
  );
}