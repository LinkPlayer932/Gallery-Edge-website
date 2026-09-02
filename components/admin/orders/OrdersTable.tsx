"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StatusBadge from "./StatusBadge";
import Button from "@/components/system/Button";

export interface OrderRecord {
  id: string;      // display order number, e.g. #GE-12345678
  _id: string;      // real MongoDB id, used for navigation + PATCH actions
  customer: string;
  items: string;
  qty: number;
  total: string;
  payment: string;
  status: string;
  date: string;
}

const statusOptions = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function OrdersTable({ filter }: { filter: string }) {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  async function loadOrders() {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/orders", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await res.json();

      setOrders(data.orders || []);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function updateStatus(mongoId: string, status: string) {
    try {
      setUpdating(mongoId);

      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: mongoId,
          status,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update order");
      }

      setOrders((prev) =>
        prev.map((order) =>
          order._id === mongoId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Failed to update order:", error);
      alert("Failed to update order status.");
    } finally {
      setUpdating(null);
    }
  }

  const visible =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-8 text-center text-sm text-neutral-500">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-white">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-100 bg-[#F3EFE7]/60 text-xs uppercase tracking-wider text-neutral-500">
            <th className="px-6 py-3 font-medium">Order ID</th>
            <th className="px-6 py-3 font-medium">Customer</th>
            <th className="px-6 py-3 font-medium">Items</th>
            <th className="px-6 py-3 font-medium">Qty</th>
            <th className="px-6 py-3 font-medium">Total</th>
            <th className="px-6 py-3 font-medium">Payment</th>
            <th className="px-6 py-3 font-medium">Status</th>
            <th className="px-6 py-3 font-medium">Date</th>
            <th className="px-6 py-3 font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {visible.length === 0 ? (
            <tr>
              <td
                colSpan={9}
                className="px-6 py-10 text-center text-sm text-neutral-500"
              >
                No orders found.
              </td>
            </tr>
          ) : (
            visible.map((order) => (
              <tr
                key={order._id}
                className="border-b border-neutral-50 last:border-0"
              >
                <td className="px-6 py-4 font-medium text-amber-700">
                  {order.id}
                </td>

                <td className="px-6 py-4 text-neutral-800">
                  {order.customer}
                </td>

                <td className="px-6 py-4 text-neutral-600">
                  {order.items}
                </td>

                <td className="px-6 py-4 text-neutral-600">
                  {order.qty}
                </td>

                <td className="px-6 py-4 font-medium text-neutral-900">
                  {order.total}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={order.payment} />
                </td>

                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    disabled={updating === order._id}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className="rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs font-medium text-neutral-700 outline-none disabled:opacity-50"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="px-6 py-4 text-neutral-500">
                  {order.date}
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/admin/orders/${order._id}`)
                      }
                    >
                      View
                    </Button>

                    {order.status !== "Cancelled" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() =>
                          updateStatus(order._id, "Cancelled")
                        }
                        disabled={updating === order._id}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}