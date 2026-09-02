import { LucideIcon } from "lucide-react";

export default function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  trendPositive = true,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  trendPositive?: boolean;
}) {
  return (
    <div className="rounded-xl bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
          <Icon className="h-5 w-5 text-amber-700" />
        </div>
        {trend && (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              trendPositive
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {trend}
          </span>
        )}
      </div>

      <p className="mt-4 text-2xl font-semibold text-neutral-900">{value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-neutral-500">
        {label}
      </p>
    </div>
  );
}