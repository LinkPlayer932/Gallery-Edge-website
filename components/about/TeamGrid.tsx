import { Hammer, Sparkles, Paintbrush, HeartHandshake } from "lucide-react";

const team = [
  { 
    name: "Master Tariq", 
    role: "Lead Woodworker & Joiner", 
    experience: "25+ yrs experience",
    icon: Hammer 
  },
  { 
    name: "Fatima Noor", 
    role: "Art Curator & Sizing Specialist", 
    experience: "BFA Fine Arts",
    icon: Sparkles 
  },
  { 
    name: "Umer Farooq", 
    role: "Master Gilder & Finisher", 
    experience: "Gold leaf & antiquing",
    icon: Paintbrush 
  },
  { 
    name: "Zeeshan Ali", 
    role: "Client Care & Installations", 
    experience: "Nationwide logistics",
    icon: HeartHandshake 
  },
];

export default function TeamGrid() {
  return (
    <section className="bg-[#FAF7F2] px-6 py-20">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
          The Artisans
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-neutral-900 md:text-4xl">
          Crafted by Experienced Hands
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-neutral-600">
          Meet the dedicated team behind every joint, cut, finish, and inspected delivery.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => {
            const Icon = member.icon;
            return (
              <div 
                key={member.name} 
                className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-sm border border-neutral-200/70 transition-transform hover:-translate-y-1"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 text-amber-800 ring-4 ring-amber-100/60">
                  <Icon size={28} />
                </div>
                <p className="mt-5 font-serif text-lg font-semibold text-neutral-900">
                  {member.name}
                </p>
                <p className="mt-1 text-xs font-semibold text-amber-700">{member.role}</p>
                <p className="mt-2 text-xs text-neutral-400">{member.experience}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}