import { NextResponse } from "next/server";
import { Types } from "mongoose";

import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import "@/models/Customer"; // ensure Customer schema is registered for populate

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find()
      .populate("customer", "name")
      .sort({ createdAt: -1 })
      .lean();

    const formatted = orders.map((order: any) => ({
      id: order.orderNumber,
      customer: order.customer?.name || "Unknown",
      items: order.items.map((i: any) => i.name).join(", "),
      qty: order.items.reduce((sum: number, i: any) => sum + i.quantity, 0),
      total: `Rs. ${order.total.toLocaleString()}`,
      payment: order.payment,
      status: order.status,
      date: new Date(order.createdAt).toLocaleDateString(),
      _id: order._id.toString(), // real id, needed for PATCH
    }));

    return NextResponse.json({ orders: formatted }, { status: 200 });
  } catch (error) {
    console.error("GET /api/admin/orders error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    await connectDB();

    const { orderId, status } = await request.json();

    if (!orderId || !Types.ObjectId.isValid(orderId)) {
      return NextResponse.json(
        { error: "Invalid order ID" },
        { status: 400 }
      );
    }

    const validStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    const updated = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order: updated }, { status: 200 });
  } catch (error) {
    console.error("PATCH /api/admin/orders error:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}