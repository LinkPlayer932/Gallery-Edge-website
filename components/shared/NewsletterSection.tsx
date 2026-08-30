import Button from "@/components/system/Button";
import Input from "@/components/system/Input";

export default function NewsletterSection() {
  return (
    <div className="flex flex-col items-start justify-between gap-6 border-b border-neutral-800 px-6 py-12 md:flex-row md:items-center">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-amber-600">
          Newsletter
        </p>
        <h3 className="mt-2 font-serif text-2xl font-semibold text-white">
          Curated inspiration, delivered
        </h3>
        <p className="mt-1 text-sm text-neutral-400">
          Join 12,000+ art lovers. New arrivals, styling guides, exclusive offers.
        </p>
      </div>
      <form className="flex w-full max-w-md gap-3">
        <Input
          type="email"
          placeholder="your@email.com"
          className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500"
        />
        <Button variant="secondary" type="submit" className="whitespace-nowrap">
          Subscribe
        </Button>
      </form>
    </div>
  );
}