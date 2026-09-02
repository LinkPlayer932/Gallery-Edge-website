"use client";

import { useEffect, useState } from "react";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import StatCard from "@/components/admin/dashboard/StatCard";
import RevenueChart from "@/components/admin/dashboard/RevenueChart";
import TopSellingList from "@/components/admin/dashboard/TopSellingList";
import RecentOrdersTable from "@/components/admin/dashboard/RecentOrdersTable";
import { ClipboardList, DollarSign, Package, Clock } from "lucide-react";

interface DashboardData {
  stats: {
    totalOrders: number;
    ordersTrend: number;
    totalRevenue: number;
    revenueTrend: number;
    totalProducts: number;
    newProductsThisWeek: number;
    pendingOrders: number;
    pendingDelta: number;
  };
  revenueByDay: { date: string; label: string; revenue: number }[];
  topSelling: { name: string; unitsSold: number; image: string | null }[];
  recentOrders: {
    _id: string;
    id: string;
    customer: string;
    product: string;
    status: string;
    total: number;
    date: string;
  }[];
}

function formatTrend(value: number, suffix = "%") {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value}${suffix}`;
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/dashboard", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load dashboard");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      <AdminTopbar title="Dashboard" />
      <div className="px-8 py-6">
        {loading || !data ? (
          <div className="rounded-xl bg-white p-8 text-center text-sm text-neutral-500">
            Loading dashboard...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                icon={ClipboardList}
                label="Total Orders"
                value={data.stats.totalOrders.toLocaleString()}
                trend={formatTrend(data.stats.ordersTrend)}
                trendPositive={data.stats.ordersTrend >= 0}
              />
              <StatCard
                icon={DollarSign}
                label="Total Revenue"
                value={`Rs. ${data.stats.totalRevenue.toLocaleString()}`}
                trend={formatTrend(data.stats.revenueTrend)}
                trendPositive={data.stats.revenueTrend >= 0}
              />
              <StatCard
                icon={Package}
                label="Total Products"
                value={data.stats.totalProducts.toLocaleString()}
                trend={`+${data.stats.newProductsThisWeek} this week`}
                trendPositive={true}
              />
              <StatCard
                icon={Clock}
                label="Pending Orders"
                value={data.stats.pendingOrders.toLocaleString()}
                trend={
                  data.stats.pendingDelta === 0
                    ? "No change"
                    : `${data.stats.pendingDelta > 0 ? "+" : ""}${
                        data.stats.pendingDelta
                      } since yesterday`
                }
                trendPositive={data.stats.pendingDelta <= 0}
              />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <RevenueChart data={data.revenueByDay} />
              </div>
              <TopSellingList items={data.topSelling} />
            </div>

            <div className="mt-6">
              <RecentOrdersTable orders={data.recentOrders} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}