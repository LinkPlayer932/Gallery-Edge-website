import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { getCurrentCustomerId } from "@/lib/customer-auth";

const CANCELLABLE_STATUSES = ["Pending", "Processing"];

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customerId = await getCurrentCustomerId();
  if (!customerId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  await connectDB();
  const order = await Order.findById(id);

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (order.customer.toString() !== customerId) {
    return NextResponse.json({ error: "Not your order" }, { status: 403 });
  }

  if (!CANCELLABLE_STATUSES.includes(order.status)) {
    return NextResponse.json(
      { error: `Cannot cancel an order that is already ${order.status}` },
      { status: 400 }
    );
  }

  order.status = "Cancelled";
  await order.save();

  return NextResponse.json({ success: true, order });
}