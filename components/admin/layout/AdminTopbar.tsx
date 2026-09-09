"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Bell, User, LogOut, Loader2 } from "lucide-react";

interface AdminTopbarProps {
  title: string;
}

interface AdminProfile {
  name: string;
  email: string;
  role: string;
}

interface Notification {
  id: string;
  type: "order" | "stock";
  message: string;
}

interface SearchResults {
  orders: { _id: string; orderNumber: string; status: string; total: number }[];
  products: { _id: string; name: string; slug: string; price: number }[];
  customers: { _id: string; name: string; email: string }[];
}

export default function AdminTopbar({ title }: AdminTopbarProps) {
  const router = useRouter();

  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((res) => res.json())
      .then((data) => setProfile(data.profile))
      .catch(() => {});

    fetch("/api/admin/notifications")
      .then((res) => res.json())
      .then((data) => setNotifications(data.notifications || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearchChange(value: string) {
    setQuery(value);
    setSearchOpen(true);

    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    if (!value.trim()) {
      setResults(null);
      return;
    }

    setSearching(true);
    searchTimeout.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/admin/search?q=${encodeURIComponent(value)}`);
        const data = await res.json();
        setResults(data);
      } catch {
        setResults(null);
      } finally {
        setSearching(false);
      }
    }, 300);
  }

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

  const hasResults =
    results && (results.orders.length > 0 || results.products.length > 0 || results.customers.length > 0);

  return (
    <div className="flex items-center justify-between border-b border-neutral-200 bg-[#FAF7F2] px-8 py-6">
      <h1 className="font-serif text-3xl font-semibold text-neutral-900">{title}</h1>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div ref={searchRef} className="relative">
          <div className="flex w-72 items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2.5">
            <Search size={16} className="text-neutral-400" />
            <input
              type="text"
              placeholder="Search orders, products..."
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              className="w-full bg-transparent text-sm text-neutral-700 outline-none placeholder:text-neutral-400"
            />
            {searching && <Loader2 size={14} className="animate-spin text-neutral-400" />}
          </div>

          {searchOpen && query.trim() && (
            <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-lg border border-neutral-200 bg-white p-2 shadow-lg z-50">
              {!hasResults && !searching && (
                <p className="p-3 text-sm text-neutral-400">No results found.</p>
              )}

              {results && results.orders.length > 0 && (
                <div className="mb-2">
                  <p className="px-2 py-1 text-xs font-semibold uppercase text-neutral-400">Orders</p>
                  {results.orders.map((o) => (
                    <Link
                      key={o._id}
                      href="/admin/orders"
                      onClick={() => setSearchOpen(false)}
                      className="block rounded-md px-2 py-2 text-sm hover:bg-neutral-50"
                    >
                      <span className="font-medium text-neutral-800">#{o.orderNumber}</span>{" "}
                      <span className="text-neutral-500">— {o.status} — Rs. {o.total}</span>
                    </Link>
                  ))}
                </div>
              )}

              {results && results.products.length > 0 && (
                <div className="mb-2">
                  <p className="px-2 py-1 text-xs font-semibold uppercase text-neutral-400">Products</p>
                  {results.products.map((p) => (
                    <Link
                      key={p._id}
                      href="/admin/products"
                      onClick={() => setSearchOpen(false)}
                      className="block rounded-md px-2 py-2 text-sm hover:bg-neutral-50"
                    >
                      <span className="font-medium text-neutral-800">{p.name}</span>{" "}
                      <span className="text-neutral-500">— Rs. {p.price}</span>
                    </Link>
                  ))}
                </div>
              )}

              {results && results.customers.length > 0 && (
                <div>
                  <p className="px-2 py-1 text-xs font-semibold uppercase text-neutral-400">Customers</p>
                  {results.customers.map((c) => (
                    <Link
                      key={c._id}
                      href="/admin/customers"
                      onClick={() => setSearchOpen(false)}
                      className="block rounded-md px-2 py-2 text-sm hover:bg-neutral-50"
                    >
                      <span className="font-medium text-neutral-800">{c.name}</span>{" "}
                      <span className="text-neutral-500">— {c.email}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:text-neutral-900"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {notifications.length > 0 && (
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-lg border border-neutral-200 bg-white p-2 shadow-lg z-50">
              {notifications.length === 0 ? (
                <p className="p-3 text-sm text-neutral-400">No new notifications.</p>
              ) : (
                notifications.map((n) => (
                  <div key={n.id} className="rounded-md px-3 py-2.5 text-sm hover:bg-neutral-50">
                    <p className="text-neutral-800">{n.message}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Avatar / Profile dropdown */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-700 text-sm font-semibold text-white"
          >
            {initials}
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-lg border border-neutral-200 bg-white p-2 shadow-lg z-50">
              <div className="border-b border-neutral-100 px-3 py-2">
                <p className="text-sm font-medium text-neutral-800">{profile?.name || "Admin"}</p>
                <p className="text-xs text-neutral-400">{profile?.email}</p>
              </div>
              <Link
                href="/admin/settings"
                onClick={() => setProfileOpen(false)}
                className="mt-1 flex items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
              >
                <User size={15} /> Profile Settings
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut size={15} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}