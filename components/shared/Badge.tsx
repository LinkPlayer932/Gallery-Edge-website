interface BadgeProps {
  label: "Bestseller" | "New" | string;
}

const badgeStyles: Record<string, string> = {
  Bestseller: "bg-amber-700 text-white",
  New: "bg-neutral-900 text-white",
};

export default function Badge({ label }: BadgeProps) {
  return (
    <span
      className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-xs font-medium ${
        badgeStyles[label] ?? "bg-neutral-900 text-white"
      }`}
    >
      {label}
    </span>
  );
}