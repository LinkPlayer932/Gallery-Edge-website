"use client";

import { useState } from "react";
import { X, Plus, Trash2, Loader2 } from "lucide-react";
import Input from "@/components/system/Input";
import Button from "@/components/system/Button";

interface OptionItem {
  id: string; // MongoDB _id for custom items, or the raw value for defaults
  value: string;
  isDefault: boolean; // defaults can't be deleted from DB (they don't exist there)
}

interface SizeColorDialogProps {
  open: boolean;
  type: "size" | "color";
  items: OptionItem[];
  onAdded: (item: OptionItem) => void;
  onRemoved: (id: string) => void;
  onClose: () => void;
}

export default function SizeColorDialog({
  open,
  type,
  items,
  onAdded,
  onRemoved,
  onClose,
}: SizeColorDialogProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  if (!open) return null;

  const label = type === "size" ? "Size" : "Color / Finish";
  const placeholder = type === "size" ? "e.g. 18x24" : "e.g. Rustic Brown";

  async function handleAdd() {
    const trimmed = value.trim();

    if (!trimmed) {
      setError(`Please enter a ${label.toLowerCase()}.`);
      return;
    }
    if (items.some((item) => item.value.toLowerCase() === trimmed.toLowerCase())) {
      setError(`This ${label.toLowerCase()} already exists.`);
      return;
    }

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/options", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, value: trimmed }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to save. Please try again.");
        setSaving(false);
        return;
      }

      onAdded({ id: data.option._id, value: data.option.value, isDefault: false });
      setValue("");
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove(item: OptionItem) {
    if (item.isDefault) {
      // Default options aren't stored in DB, so just hide them locally
      onRemoved(item.id);
      return;
    }

    setRemovingId(item.id);
    try {
      const res = await fetch(`/api/options/${item.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Failed to remove. Please try again.");
        return;
      }
      onRemoved(item.id);
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setRemovingId(null);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <p className="font-serif text-lg font-semibold text-neutral-900">
            Manage {label}s
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 flex items-end gap-2">
          <div className="flex-1">
            <Input
              id={`new-${type}`}
              label={`New ${label}`}
              placeholder={placeholder}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button type="button" variant="primary" size="md" onClick={handleAdd} disabled={saving}>
            <span className="flex items-center gap-1">
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Add
            </span>
          </Button>
        </div>

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        <p className="mt-6 border-b border-neutral-100 pb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Current {label}s
        </p>

        <div className="mt-3 max-h-56 space-y-2 overflow-y-auto">
          {items.length === 0 && (
            <p className="py-4 text-center text-sm text-neutral-400">
              No {label.toLowerCase()}s added yet.
            </p>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-md border border-neutral-200 px-3 py-2"
            >
              <span className="text-sm font-medium text-neutral-800">
                {item.value}
                {item.isDefault && (
                  <span className="ml-2 text-[10px] uppercase text-neutral-400">default</span>
                )}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(item)}
                aria-label={`Remove ${item.value}`}
                disabled={removingId === item.id}
                className="text-neutral-400 hover:text-red-600 disabled:opacity-50"
              >
                {removingId === item.id ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Trash2 size={15} />
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="button" variant="outline" size="md" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}