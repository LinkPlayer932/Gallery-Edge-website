interface TopSellingItem {
  name: string;
  unitsSold: number;
  image: string | null;
}

export default function TopSellingList({
  items,
}: {
  items: TopSellingItem[];
}) {
  return (
    <div className="rounded-xl bg-white p-6">
      <h2 className="text-base font-semibold text-neutral-900">
        Top Selling
      </h2>
      <p className="mt-1 text-sm text-neutral-500">By units sold this month</p>

      <div className="mt-4 space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-neutral-400">No sales yet this month.</p>
        ) : (
          items.map((item, idx) => (
            <div key={item.name + idx} className="flex items-center gap-3">
              <span className="w-4 text-sm text-neutral-400">{idx + 1}</span>

              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-neutral-200">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[10px] text-neutral-500">
                    IMG
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-neutral-900">
                  {item.name}
                </p>
                <p className="text-xs text-neutral-500">
                  {item.unitsSold} units sold
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}