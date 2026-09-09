"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutGrid, ClipboardList, Package, List, Users, Settings, LogOut } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutGrid },
  { label: "Orders", href: "/admin/orders", icon: ClipboardList },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: List },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminProfile {
  name: string;
  role: string;
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState<AdminProfile | null>(null);

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((res) => res.json())
      .then((data) => setProfile(data.profile))
      .catch(() => {});
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  }

  const initials = profile?.name
    ? profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "A";

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

      <div className="border-t border-neutral-800 pt-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-700 text-sm font-semibold text-white">
            {initials}
          </div>
          <div>
            <p className="text-sm font-medium text-white">{profile?.name || "Admin"}</p>
            <p className="text-xs text-neutral-400">{profile?.role || "Store Owner"}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-300 hover:bg-neutral-900"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}