const stats = [
  { value: "35+", label: "Years of craft" },
  { value: "50k+", label: "Frames delivered" },
  { value: "4.9★", label: "Average rating" },
  { value: "100%", label: "Satisfaction guaranteed" },
];

export default function StatsBar() {
  return (
    <section className="bg-neutral-950">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-10 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-serif text-2xl font-semibold text-amber-500 md:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-neutral-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}