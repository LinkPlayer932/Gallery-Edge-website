"use client";

import { Search, Bell } from "lucide-react";

interface AdminTopbarProps {
  title: string;
}

export default function AdminTopbar({ title }: AdminTopbarProps) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-200 bg-[#FAF7F2] px-8 py-6">
      <h1 className="font-serif text-3xl font-semibold text-neutral-900">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="flex w-72 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2.5">
          <Search size={16} className="text-neutral-400" />
          <input
            type="text"
            placeholder="Search orders, products..."
            className="w-full bg-transparent text-sm text-neutral-700 outline-none placeholder:text-neutral-400"
          />
        </div>
        <button
          className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:text-neutral-900"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-700 text-sm font-semibold text-white">
          ME
        </div>
      </div>
    </div>
  );
}