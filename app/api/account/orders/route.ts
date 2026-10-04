import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { getCurrentCustomerId } from "@/lib/customer-auth";

export async function GET() {
  const customerId = await getCurrentCustomerId();
  if (!customerId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  await connectDB();
  const orders = await Order.find({ customer: customerId }).sort({ createdAt: -1 });

  return NextResponse.json(orders);
}