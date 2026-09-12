import { Award, PackageCheck, Star, ShieldCheck } from "lucide-react";

const stats = [
  { icon: Award, value: "100%", label: "Handcrafted in Pakistan" },
  { icon: PackageCheck, value: "15,000+", label: "Frames Delivered" },
  { icon: Star, value: "4.9 ★", label: "Customer Rating (2k+ Reviews)" },
  { icon: ShieldCheck, value: "Zero Breakage", label: "Transit Guarantee" },
];

export default function StatsBar() {
  return (
    <section className="border-y border-neutral-800 bg-[#121110]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                <Icon size={16} />
              </div>
              <p className="font-serif text-2xl font-bold tracking-tight text-white md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-neutral-400">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}