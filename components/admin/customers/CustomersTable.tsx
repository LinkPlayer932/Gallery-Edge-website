"use client";

import { useEffect, useState } from "react";
import Button from "@/components/system/Button";

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  spent: string;
  joined: string;
}

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export default function CustomersTable() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/customers", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch customers");
        const data = await res.json();
        setCustomers(data.customers || []);
      } catch (error) {
        console.error("Failed to load customers:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-8 text-center text-sm text-neutral-500">
        Loading customers...
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-neutral-600">
        {customers.length} registered customer{customers.length !== 1 ? "s" : ""}
      </p>

      <div className="mt-5 overflow-x-auto rounded-xl bg-white">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-100 bg-[#F3EFE7]/60 text-xs uppercase tracking-wider text-neutral-500">
              <th className="px-6 py-3 font-medium">Customer</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Total Orders</th>
              <th className="px-6 py-3 font-medium">Total Spent</th>
              <th className="px-6 py-3 font-medium">Joined</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-neutral-500">
                  No customers yet.
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer._id} className="border-b border-neutral-50 last:border-0">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-700 text-xs font-semibold text-white">
                        {initials(customer.name)}
                      </div>
                      <span className="font-medium text-neutral-900">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{customer.email}</td>
                  <td className="px-6 py-4 text-neutral-800">{customer.orders}</td>
                  <td className="px-6 py-4 font-medium text-neutral-900">{customer.spent}</td>
                  <td className="px-6 py-4 text-neutral-500">{customer.joined}</td>
                  <td className="px-6 py-4">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}