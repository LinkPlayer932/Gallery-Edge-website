import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import { getCurrentCustomerId } from "@/lib/customer-auth";

export async function GET() {
  const customerId = await getCurrentCustomerId();
  if (!customerId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  await connectDB();
  const customer = await Customer.findById(customerId);
  if (!customer) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: customer._id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
  });
}