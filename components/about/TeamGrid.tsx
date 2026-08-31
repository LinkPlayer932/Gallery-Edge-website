const team = [
  { name: "Helena Marsh", role: "Founder & Master Framer" },
  { name: "Oliver Reed", role: "Head of Woodworking" },
  { name: "Priya Nair", role: "Creative Director" },
  { name: "James Harlow", role: "Head of Operations" },
];

export default function TeamGrid() {
  return (
    <section className="bg-[#FAF7F2] px-6 py-20">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-amber-700">
          The People
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-neutral-900">
          Meet Our Team
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col items-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-amber-100 text-2xl font-serif font-semibold text-amber-800">
                {member.name.charAt(0)}
              </div>
              <p className="mt-4 font-serif text-base font-semibold text-neutral-900">
                {member.name}
              </p>
              <p className="text-sm text-amber-700">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}