"use client";

import Link from "next/link";

interface RecentOrder {
  _id: string;
  id: string;
  customer: string;
  product: string;
  status: string;
  total: number;
  date: string;
}

function statusStyle(status: string) {
  switch (status) {
    case "Delivered":
      return "bg-emerald-100 text-emerald-700";
    case "Shipped":
      return "bg-violet-100 text-violet-700";
    case "Processing":
      return "bg-blue-100 text-blue-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-amber-100 text-amber-700";
  }
}

export default function RecentOrdersTable({
  orders,
}: {
  orders: RecentOrder[];
}) {
  return (
    <div className="rounded-xl bg-white p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-neutral-900">
          Recent Orders
        </h2>
        <Link
          href="/admin/orders"
          className="rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-800 hover:bg-amber-200"
        >
          View All Orders →
        </Link>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-100 text-xs uppercase tracking-wider text-neutral-500">
              <th className="py-2 pr-4 font-medium">Order ID</th>
              <th className="py-2 pr-4 font-medium">Customer</th>
              <th className="py-2 pr-4 font-medium">Product</th>
              <th className="py-2 pr-4 font-medium">Status</th>
              <th className="py-2 pr-4 font-medium">Total</th>
              <th className="py-2 pr-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-neutral-400">
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="cursor-pointer border-b border-neutral-50 last:border-0 hover:bg-neutral-50"
                >
                  <td className="py-3 pr-4 font-medium text-amber-700">
                    <Link href={`/admin/orders/${order._id}`}>
                      {order.id}
                    </Link>
                  </td>
                  <td className="py-3 pr-4 text-neutral-800">
                    {order.customer}
                  </td>
                  <td className="py-3 pr-4 text-neutral-600">
                    {order.product}
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4 font-medium text-neutral-900">
                    Rs. {order.total.toLocaleString()}
                  </td>
                  <td className="py-3 pr-4 text-neutral-500">{order.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}