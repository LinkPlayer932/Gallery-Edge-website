"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/system/Button";
import StatusBadge from "@/components/admin/orders/StatusBadge";

interface OrderItem {
  name: string;
  size?: string;
  finish?: string;
  quantity: number;
  price: number;
}

interface OrderDetail {
  _id: string;
  id: string;
  status: string;
  payment: string;
  date: string;
  total: number;
  customer: {
    name: string;
    email: string;
    totalOrders: number;
    totalSpent: number;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  items: OrderItem[];
}

const timelineStages = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
];

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  async function loadOrder() {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/orders/${params.id}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch order");
      const data = await res.json();
      setOrder(data.order);
    } catch (error) {
      console.error("Failed to load order:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  async function updateStatus(status: string) {
    if (!order) return;
    try {
      setUpdating(true);
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order._id, status }),
      });
      if (!res.ok) throw new Error("Failed to update order");
      setOrder({ ...order, status });
    } catch (error) {
      console.error(error);
      alert("Failed to update order status.");
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="px-8 py-6">
        <div className="rounded-xl bg-white p-8 text-center text-sm text-neutral-500">
          Loading order...
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="px-8 py-6">
        <Link
          href="/admin/orders"
          className="text-sm font-medium text-amber-700 hover:underline"
        >
          ← Back to Orders
        </Link>
        <div className="mt-4 rounded-xl bg-white p-8 text-center text-sm text-neutral-500">
          Order not found.
        </div>
      </div>
    );
  }

  const currentStageIndex = timelineStages.indexOf(order.status);
  const isCancelled = order.status === "Cancelled";

  return (
    <div className="px-8 py-6">
      <Link
        href="/admin/orders"
        className="text-sm font-medium text-amber-700 hover:underline"
      >
        ← Back to Orders
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        {/* Left column */}
        <div className="space-y-6">
          {/* Order summary card */}
          <div className="rounded-xl bg-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl font-semibold text-neutral-900">
                  {order.id}
                </h1>
                <p className="mt-1 text-sm text-neutral-500">{order.date}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  order.status === "Delivered"
                    ? "bg-emerald-100 text-emerald-700"
                    : order.status === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 rounded-lg bg-[#F3EFE7]/60 p-4"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-neutral-200 text-xs text-neutral-500">
                    IMG
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-neutral-900">
                      {item.name}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {[
                        item.finish && `Finish: ${item.finish}`,
                        item.size && `Size: ${item.size}`,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    <p className="text-sm text-neutral-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-neutral-900">
                    Rs. {item.price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2 border-t border-neutral-100 pt-4 text-sm">
              <div className="flex justify-between font-semibold text-neutral-900">
                <span>Total</span>
                <span>Rs. {order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Order timeline card */}
          <div className="rounded-xl bg-white p-6">
            <h2 className="mb-4 text-base font-semibold text-neutral-900">
              Order Timeline
            </h2>

            {isCancelled ? (
              <p className="text-sm text-red-600">
                This order was cancelled.
              </p>
            ) : (
              <div>
                {timelineStages.map((stage, idx) => {
                  const done = idx <= currentStageIndex;
                  const isLast = idx === timelineStages.length - 1;
                  return (
                    <div key={stage} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs text-white ${
                            done ? "bg-amber-700" : "bg-neutral-200"
                          }`}
                        >
                          {done ? "✓" : ""}
                        </div>
                        {!isLast && (
                          <div
                            className={`h-8 w-px ${
                              done ? "bg-amber-700" : "bg-neutral-200"
                            }`}
                          />
                        )}
                      </div>
                      <div className="pb-6">
                        <p
                          className={`text-sm font-medium ${
                            done ? "text-neutral-900" : "text-neutral-400"
                          }`}
                        >
                          {stage}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Customer card */}
          <div className="rounded-xl bg-white p-6">
            <h2 className="mb-3 text-base font-semibold text-neutral-900">
              Customer
            </h2>
            <p className="font-medium text-neutral-900">
              {order.customer.name}
            </p>
            <p className="text-sm text-neutral-600">{order.customer.email}</p>
            <p className="mt-1 text-sm text-neutral-500">
              {order.customer.totalOrders} orders · Rs.{" "}
              {order.customer.totalSpent.toLocaleString()} lifetime
            </p>

            <div className="mt-4 border-t border-neutral-100 pt-4">
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Shipping Address
              </h3>
              <p className="text-sm text-neutral-800">
                {order.shippingAddress?.street}
                <br />
                {order.shippingAddress?.city}, {order.shippingAddress?.state}{" "}
                {order.shippingAddress?.zip}
              </p>
            </div>
          </div>

          {/* Actions card */}
          <div className="rounded-xl bg-white p-6">
            <h2 className="mb-3 text-base font-semibold text-neutral-900">
              Actions
            </h2>
            <div className="space-y-2">
              {order.status === "Pending" && (
                <Button
                  className="w-full"
                  disabled={updating}
                  onClick={() => updateStatus("Processing")}
                >
                  Mark as Processing
                </Button>
              )}
              {order.status === "Processing" && (
                <Button
                  className="w-full"
                  disabled={updating}
                  onClick={() => updateStatus("Shipped")}
                >
                  Mark as Shipped
                </Button>
              )}
              {order.status === "Shipped" && (
                <Button
                  className="w-full"
                  disabled={updating}
                  onClick={() => updateStatus("Delivered")}
                >
                  Mark as Delivered
                </Button>
              )}

              <Button variant="outline" size="sm" className="w-full">
                Print Invoice
              </Button>

              {order.status !== "Cancelled" && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-red-600 hover:bg-red-50"
                  disabled={updating}
                  onClick={() => updateStatus("Cancelled")}
                >
                  Cancel Order
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}