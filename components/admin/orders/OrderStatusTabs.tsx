"use client";

const tabs = [
  "All",
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

interface OrderStatusTabsProps {
  active: string;
  onChange: (tab: string) => void;
}

export default function OrderStatusTabs({
  active,
  onChange,
}: OrderStatusTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            active === tab
              ? "bg-amber-700 text-white"
              : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}