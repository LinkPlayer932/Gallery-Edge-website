import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";

const LOW_STOCK_THRESHOLD = 5;

export async function GET() {
  try {
    await connectDB();

    const newOrders = await Order.find({ status: "Pending" })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("orderNumber total createdAt")
      .lean();

    const lowStockProducts = await Product.find({ stock: { $lte: LOW_STOCK_THRESHOLD } })
      .sort({ stock: 1 })
      .limit(5)
      .select("name stock")
      .lean();

    const notifications = [
      ...newOrders.map((o: any) => ({
        id: String(o._id),
        type: "order" as const,
        message: `New order ${o.orderNumber} — Rs. ${o.total.toLocaleString()}`,
      })),
      ...lowStockProducts.map((p: any) => ({
        id: String(p._id),
        type: "stock" as const,
        message: `Low stock: ${p.name} (${p.stock} left)`,
      })),
    ];

    return NextResponse.json({ count: notifications.length, notifications });
  } catch (error) {
    console.error("GET /api/admin/notifications error:", error);
    return NextResponse.json({ error: "Failed to load notifications" }, { status: 500 });
  }
}