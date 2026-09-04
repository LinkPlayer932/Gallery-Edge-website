import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";

export async function GET() {
  try {
    await connectDB();

    const customers = await Customer.find().sort({ createdAt: -1 }).lean();

    const formatted = customers.map((c: any) => ({
      _id: c._id.toString(),
      name: c.name,
      email: c.email,
      phone: c.phone || "",
      orders: c.totalOrders || 0,
      spent: `Rs. ${(c.totalSpent || 0).toLocaleString()}`,
      joined: new Date(c.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));

    return NextResponse.json({ customers: formatted }, { status: 200 });
  } catch (error) {
    console.error("GET /api/customers error:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}