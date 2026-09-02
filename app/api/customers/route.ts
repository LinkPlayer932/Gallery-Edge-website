import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";

export async function GET() {
  try {
    await connectDB();
    const customers = await Customer.find().sort({ createdAt: -1 });
    return NextResponse.json({ customers });
  } catch (err) {
    console.error("GET /api/customers error:", err);
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, phone } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Reuse the existing customer record for repeat orders from the same email,
    // instead of creating a duplicate customer each time.
    const existing = await Customer.findOne({ email: email.toLowerCase().trim() });

    if (existing) {
      // Keep contact details up to date in case the customer's info changed
      existing.name = name;
      if (phone) existing.phone = phone;
      await existing.save();
      return NextResponse.json({ customer: existing }, { status: 200 });
    }

    const customer = await Customer.create({
      name,
      email: email.toLowerCase().trim(),
      phone: phone ?? "",
      totalOrders: 0,
      totalSpent: 0,
    });

    return NextResponse.json({ customer }, { status: 201 });
  } catch (err) {
    console.error("POST /api/customers error:", err);
    return NextResponse.json({ error: "Failed to save customer" }, { status: 500 });
  }
}
