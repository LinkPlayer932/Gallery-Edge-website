const values = [
  {
    title: "Craft over Speed",
    description:
      "We take the time needed to do it right. Our frames cannot be rushed without compromising quality.",
  },
  {
    title: "Sustainability",
    description:
      "FSC-certified timber, recycled metals, acid-free archival materials. We build for the long term.",
  },
  {
    title: "Lifetime Guarantee",
    description:
      "Every frame comes with our lifetime guarantee. If it warps, fades, or fails, we fix or replace it.",
  },
];

export default function ValuesSection() {
  return (
    <section className="bg-[#F3EFE7] px-6 py-20">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-amber-700">
          What We Believe
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-neutral-900">
          Our Values
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 text-left md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="rounded-xl bg-white p-6">
              <div className="mb-3 h-px w-8 bg-amber-700" />
              <p className="font-serif text-lg font-semibold text-neutral-900">
                {value.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}