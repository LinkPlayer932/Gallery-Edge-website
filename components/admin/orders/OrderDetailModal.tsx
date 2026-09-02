"use client";

import StatusBadge from "./StatusBadge";
import Button from "@/components/system/Button";

export interface OrderItemDetail {
  name: string;
  size?: string;
  finish?: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface OrderDetail {
  _id: string;
  id: string; // orderNumber
  customer: string;
  customerEmail: string;
  customerPhone: string;
  itemsDetailed: OrderItemDetail[];
  qty: number;
  total: string;
  payment: string;
  status: string;
  date: string;
  shippingAddress: ShippingAddress;
}

export default function OrderDetailModal({
  order,
  onClose,
}: {
  order: OrderDetail;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              {order.id}
            </h2>
            <p className="text-sm text-neutral-500">{order.date}</p>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mb-4 flex gap-2">
          <StatusBadge status={order.payment} />
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
            {order.status}
          </span>
        </div>

        <div className="mb-4">
          <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Customer
          </h3>
          <p className="text-sm text-neutral-800">{order.customer}</p>
          {order.customerEmail && (
            <p className="text-sm text-neutral-600">{order.customerEmail}</p>
          )}
          {order.customerPhone && (
            <p className="text-sm text-neutral-600">{order.customerPhone}</p>
          )}
        </div>

        <div className="mb-4">
          <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Shipping Address
          </h3>
          <p className="text-sm text-neutral-800">
            {order.shippingAddress?.street}, {order.shippingAddress?.city},{" "}
            {order.shippingAddress?.state} {order.shippingAddress?.zip}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Items ({order.qty})
          </h3>
          <div className="space-y-2">
            {order.itemsDetailed.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between rounded-lg border border-neutral-100 p-3 text-sm"
              >
                <div>
                  <p className="font-medium text-neutral-900">{item.name}</p>
                  {(item.size || item.finish) && (
                    <p className="text-neutral-500">
                      {[item.size, item.finish].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  <p className="text-neutral-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium text-neutral-900">
                  Rs. {item.price.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between border-t border-neutral-100 pt-4">
          <span className="text-sm font-medium text-neutral-600">Total</span>
          <span className="text-base font-semibold text-neutral-900">
            {order.total}
          </span>
        </div>

        <Button variant="outline" size="sm" onClick={onClose} className="w-full">
          Close
        </Button>
      </div>
    </div>
  );
}