"use client";

interface FinishSelectorProps {
  finishes: string[];
  selected: string;
  onSelect: (finish: string) => void;
}

export default function FinishSelector({ finishes, selected, onSelect }: FinishSelectorProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
        Finish: <span className="font-normal text-neutral-900">{selected}</span>
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {finishes.map((finish) => (
          <button
            key={finish}
            type="button"
            onClick={() => onSelect(finish)}
            className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
              selected === finish
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
            }`}
          >
            {finish}
          </button>
        ))}
      </div>
    </div>
  );
}