"use client";

interface SizeSelectorProps {
  sizes: string[];
  selected: string;
  onSelect: (size: string) => void;
}

export default function SizeSelector({ sizes, selected, onSelect }: SizeSelectorProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
        Size: <span className="font-normal text-neutral-900">{selected}</span>
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => onSelect(size)}
            className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
              selected === size
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}