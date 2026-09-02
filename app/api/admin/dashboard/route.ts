import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import "@/models/Customer";

export async function GET() {
  try {
    await connectDB();

    const now = new Date();
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const last30Start = new Date(startOfToday);
    last30Start.setDate(last30Start.getDate() - 29);

    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(startOfThisMonth.getTime() - 1);

    const sevenDaysAgo = new Date(startOfToday);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const yesterdayStart = new Date(startOfToday);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);

    // ---- Basic totals ----
    const [totalOrders, totalRevenueAgg, totalProducts, pendingOrders] =
      await Promise.all([
        Order.countDocuments(),
        Order.aggregate([
          { $group: { _id: null, sum: { $sum: "$total" } } },
        ]),
        Product.countDocuments({ status: "Active" }),
        Order.countDocuments({ status: "Pending" }),
      ]);

    const totalRevenue = totalRevenueAgg[0]?.sum || 0;

    // ---- Trends ----
    const [ordersThisMonth, ordersLastMonth] = await Promise.all([
      Order.countDocuments({ createdAt: { $gte: startOfThisMonth } }),
      Order.countDocuments({
        createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
      }),
    ]);

    const [revenueThisMonthAgg, revenueLastMonthAgg] = await Promise.all([
      Order.aggregate([
        { $match: { createdAt: { $gte: startOfThisMonth } } },
        { $group: { _id: null, sum: { $sum: "$total" } } },
      ]),
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
          },
        },
        { $group: { _id: null, sum: { $sum: "$total" } } },
      ]),
    ]);

    const revenueThisMonth = revenueThisMonthAgg[0]?.sum || 0;
    const revenueLastMonth = revenueLastMonthAgg[0]?.sum || 0;

    function percentTrend(current: number, previous: number) {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 1000) / 10;
    }

    const ordersTrend = percentTrend(ordersThisMonth, ordersLastMonth);
    const revenueTrend = percentTrend(revenueThisMonth, revenueLastMonth);

    const newProductsThisWeek = await Product.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    const pendingOrdersYesterday = await Order.countDocuments({
      status: "Pending",
      createdAt: { $lt: yesterdayStart },
    });

    const pendingDelta = pendingOrders - pendingOrdersYesterday;

    // ---- Revenue by day (last 30 days) ----
    const revenueByDayAgg = await Order.aggregate([
      { $match: { createdAt: { $gte: last30Start } } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          revenue: { $sum: "$total" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const revenueMap = new Map(
      revenueByDayAgg.map((r: any) => [r._id, r.revenue])
    );

    const revenueByDay: { date: string; label: string; revenue: number }[] =
      [];
    for (let i = 0; i < 30; i++) {
      const d = new Date(last30Start);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      revenueByDay.push({
        date: key,
        label: d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        revenue: revenueMap.get(key) || 0,
      });
    }

    // ---- Top selling products (this month) ----
    const topSellingAgg = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfThisMonth } } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          name: { $first: "$items.name" },
          unitsSold: { $sum: "$items.quantity" },
        },
      },
      { $sort: { unitsSold: -1 } },
      { $limit: 4 },
    ]);

    const productIds = topSellingAgg
      .map((t: any) => t._id)
      .filter(Boolean);

    const products = await Product.find({ _id: { $in: productIds } })
      .select("images name")
      .lean();

    const productImageMap = new Map(
      products.map((p: any) => [p._id.toString(), p.images?.[0] || null])
    );

    const topSelling = topSellingAgg.map((t: any) => ({
      name: t.name,
      unitsSold: t.unitsSold,
      image: t._id ? productImageMap.get(t._id.toString()) || null : null,
    }));

    // ---- Recent orders (last 5) ----
    const recentOrdersRaw = await Order.find()
      .populate("customer", "name")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const recentOrders = recentOrdersRaw.map((o: any) => {
      const firstItem = o.items?.[0];
      const product =
        o.items.length > 1
          ? `${firstItem?.name || ""} (+${o.items.length - 1} more)`
          : firstItem?.name || "";

      return {
        _id: o._id.toString(),
        id: o.orderNumber,
        customer: o.customer?.name || "Unknown",
        product,
        status: o.status,
        total: o.total,
        date: new Date(o.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
      };
    });

    return NextResponse.json({
      stats: {
        totalOrders,
        ordersTrend,
        totalRevenue,
        revenueTrend,
        totalProducts,
        newProductsThisWeek,
        pendingOrders,
        pendingDelta,
      },
      revenueByDay,
      topSelling,
      recentOrders,
    });
  } catch (error) {
    console.error("GET /api/admin/dashboard error:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard data" },
      { status: 500 }
    );
  }
}