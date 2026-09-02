import { NextResponse } from "next/server";
import { Types } from "mongoose";

import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import "@/models/Customer";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
    }

    const order = await Order.findById(id)
      .populate("customer", "name email phone totalOrders totalSpent")
      .lean();

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const o: any = order;

    const formatted = {
      _id: o._id.toString(),
      id: o.orderNumber,
      status: o.status,
      payment: o.payment,
      date: new Date(o.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      total: o.total,
      customer: {
        name: o.customer?.name || "Unknown",
        email: o.customer?.email || "",
        totalOrders: o.customer?.totalOrders || 0,
        totalSpent: o.customer?.totalSpent || 0,
      },
      shippingAddress: o.shippingAddress,
      items: o.items.map((i: any) => ({
        name: i.name,
        size: i.size,
        finish: i.finish,
        quantity: i.quantity,
        price: i.price,
      })),
    };

    return NextResponse.json({ order: formatted }, { status: 200 });
  } catch (error) {
    console.error("GET /api/admin/orders/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}