"use client";

import { useState } from "react";

import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import OrderStatusTabs from "@/components/admin/orders/OrderStatusTabs";
import OrdersTable from "@/components/admin/orders/OrdersTable";

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState("All");

  return (
    <div>
      <AdminTopbar title="Orders" />

      <div className="px-8 py-6">
        <OrderStatusTabs
          active={filter}
          onChange={setFilter}
        />

        <div className="mt-5">
          <OrdersTable filter={filter} />
        </div>
      </div>
    </div>
  );
}