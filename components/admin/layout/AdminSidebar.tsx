"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, ClipboardList, Package, List, Users, Settings } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutGrid },
  { label: "Orders", href: "/admin/orders", icon: ClipboardList },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: List },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-60 flex-shrink-0 flex-col justify-between bg-neutral-950 px-4 py-6">
      <div>
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-700 text-white">
            <span className="font-serif text-sm font-semibold">G</span>
          </div>
          <div>
            <p className="font-serif text-sm font-semibold text-white">Gallery Edge</p>
            <p className="text-xs text-neutral-400">Admin Panel</p>
          </div>
        </div>

        <p className="mt-8 px-2 text-xs font-medium uppercase tracking-wider text-neutral-500">
          Navigation
        </p>
        <nav className="mt-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? "bg-amber-700 text-white" : "text-neutral-300 hover:bg-neutral-900"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3 border-t border-neutral-800 px-2 pt-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-700 text-sm font-semibold text-white">
          ME
        </div>
        <div>
          <p className="text-sm font-medium text-white">Margaret Ellis</p>
          <p className="text-xs text-neutral-400">Store Owner</p>
        </div>
      </div>
    </aside>
  );
}