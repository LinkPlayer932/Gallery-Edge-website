const styles: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-red-100 text-red-700",

  Paid: "bg-emerald-100 text-emerald-700",
  Unpaid: "bg-amber-100 text-amber-700",
  Refunded: "bg-red-100 text-red-700",
};

export default function StatusBadge({
  status,
}: {
  status: string;
}) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] ?? "bg-neutral-100 text-neutral-700"
      }`}
    >
      {status}
    </span>
  );
}