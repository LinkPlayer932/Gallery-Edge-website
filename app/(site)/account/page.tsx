"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Package, Heart, LogOut, ChevronRight, ChevronDown } from "lucide-react";
import Button from "@/components/system/Button";

interface OrderItem {
  _id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-700",
  Processing: "bg-blue-50 text-blue-700",
  Shipped: "bg-purple-50 text-purple-700",
  Delivered: "bg-green-50 text-green-700",
  Cancelled: "bg-red-50 text-red-700",
};

export default function AccountPage() {
  const router = useRouter();
  const [customer, setCustomer] = useState<{ name: string; email: string } | null>(null);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const meRes = await fetch("/api/account/me");
      if (!meRes.ok) {
        router.push("/account/login");
        return;
      }
      const me = await meRes.json();
      setCustomer(me);

      const ordersRes = await fetch("/api/account/orders");
      const ordersData = await ordersRes.json();
      setOrders(ordersData);
      setLoading(false);
    }
    load();
  }, [router]);

  async function handleCancel(orderId: string) {
    if (!confirm("Cancel this order?")) return;
    setCancellingId(orderId);

    const res = await fetch(`/api/orders/${orderId}/cancel`, { method: "POST" });
    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Could not cancel order");
    } else {
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: "Cancelled" } : o))
      );
    }
    setCancellingId(null);
  }

  async function handleLogout() {
    await fetch("/api/auth/customer/logout", { method: "POST" });
    router.push("/account/login");
    router.refresh();
  }

  if (loading) {
    return <div className="flex min-h-[60vh] items-center justify-center text-neutral-400">Loading...</div>;
  }

  const initial = customer?.name?.charAt(0).toUpperCase() ?? "?";

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      {/* Profile card */}
      <div className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 text-2xl font-semibold text-white">
          {initial}
        </div>
        <h1 className="mt-4 text-lg font-semibold text-neutral-900">{customer?.name}</h1>
        <p className="mt-1 text-sm text-neutral-500">{customer?.email}</p>
      </div>

      {/* Orders */}
      <div className="mt-4 rounded-2xl bg-white shadow-sm">
        <button
          onClick={() => setShowOrders((v) => !v)}
          className="flex w-full items-center justify-between p-5"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100">
              <Package size={18} className="text-neutral-700" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-neutral-900">My Orders</p>
              <p className="text-xs text-neutral-500">{orders.length} orders</p>
            </div>
          </div>
          <ChevronDown
            size={18}
            className={`text-neutral-400 transition-transform ${showOrders ? "rotate-180" : ""}`}
          />
        </button>

        {showOrders && (
          <div className="flex flex-col gap-3 border-t border-neutral-100 p-5">
            {orders.length === 0 && (
              <p className="text-center text-sm text-neutral-400">No orders yet.</p>
            )}
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-xl border border-neutral-100 p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{order.orderNumber}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {new Date(order.createdAt).toLocaleDateString()} • Rs {order.total}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      statusColors[order.status] ?? "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {["Pending", "Processing"].includes(order.status) && (
                  <button
                    onClick={() => handleCancel(order._id)}
                    disabled={cancellingId === order._id}
                    className="mt-3 text-xs font-medium text-red-600 hover:underline disabled:opacity-50"
                  >
                    {cancellingId === order._id ? "Cancelling..." : "Cancel Order"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Favourites */}
      {/* <button
        onClick={() => router.push("/favourites")}
        className="mt-4 flex w-full items-center justify-between rounded-2xl bg-white p-5 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100">
            <Heart size={18} className="text-neutral-700" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-neutral-900">My Favourites</p>
            <p className="text-xs text-neutral-500">Saved products</p>
          </div>
        </div>
        <ChevronRight size={18} className="text-neutral-400" />
      </button> */}

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-white p-4 text-sm font-medium text-red-600 shadow-sm hover:bg-red-50"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
}
