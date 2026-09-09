import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Customer from "@/models/Customer";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const q = request.nextUrl.searchParams.get("q")?.trim();

    if (!q) {
      return NextResponse.json({ orders: [], products: [], customers: [] });
    }

    const regex = { $regex: q, $options: "i" };

    const [orders, products, customers] = await Promise.all([
      Order.find({ orderNumber: regex }).limit(5).select("orderNumber status total").lean(),
      Product.find({ name: regex }).limit(5).select("name slug price").lean(),
      Customer.find({ $or: [{ name: regex }, { email: regex }] })
        .limit(5)
        .select("name email")
        .lean(),
    ]);

    return NextResponse.json({ orders, products, customers });
  } catch (error) {
    console.error("GET /api/admin/search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}