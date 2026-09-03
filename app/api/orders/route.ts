import { NextResponse } from "next/server";
import { Types } from "mongoose";

import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Customer from "@/models/Customer";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { customer, shippingAddress, items, total, payment } = body;

    if (!customer?.name || !customer?.email || !shippingAddress || !items?.length) {
      return NextResponse.json(
        { error: "Missing required order information" },
        { status: 400 }
      );
    }

    // 1. Find or create Customer
    let customerDoc = await Customer.findOne({ email: customer.email.toLowerCase().trim() });
    if (!customerDoc) {
      customerDoc = await Customer.create({
        name: customer.name.trim(),
        email: customer.email.toLowerCase().trim(),
        phone: customer.phone?.trim() || "",
        totalOrders: 1,
        totalSpent: Number(total) || 0,
      });
    } else {
      customerDoc.name = customer.name.trim();
      if (customer.phone) customerDoc.phone = customer.phone.trim();
      customerDoc.totalOrders = (customerDoc.totalOrders || 0) + 1;
      customerDoc.totalSpent = (customerDoc.totalSpent || 0) + (Number(total) || 0);
      await customerDoc.save();
    }

    // 2. Generate unique orderNumber
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `#ORD-${randomDigits}`;

    // 3. Format items
    const formattedItems = items.map((item: any) => {
      const isValidObjectId = item.productId && Types.ObjectId.isValid(item.productId);
      return {
        productId: isValidObjectId ? new Types.ObjectId(item.productId) : undefined,
        name: item.name,
        size: item.size || "",
        finish: item.finish || "",
        quantity: Number(item.quantity) || 1,
        price: Number(item.price) || 0,
      };
    });

    // 4. Create Order
    const order = await Order.create({
      orderNumber,
      customer: customerDoc._id,
      items: formattedItems,
      total: Number(total) || 0,
      payment: payment || "Unpaid",
      status: "Pending",
      shippingAddress: {
        street: shippingAddress.street || "",
        city: shippingAddress.city || "",
        state: shippingAddress.state || "",
        zip: shippingAddress.zip || "",
      },
    });

    return NextResponse.json(
      { success: true, order: { ...order.toObject(), orderNumber } },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to place order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find()
      .populate("customer", "name email phone")
      .sort({ createdAt: -1 })
      .lean();

    const formatted = orders.map((order: any) => ({
      _id: order._id.toString(),
      id: order.orderNumber,
      customer: order.customer?.name || "Unknown",
      customerEmail: order.customer?.email || "",
      customerPhone: order.customer?.phone || "",
      items: order.items.map((i: any) => i.name).join(", "),
      qty: order.items.reduce((sum: number, i: any) => sum + i.quantity, 0),
      total: `Rs. ${order.total.toLocaleString()}`,
      totalRaw: order.total,
      payment: order.payment,
      status: order.status,
      date: new Date(order.createdAt).toLocaleDateString(),
      shippingAddress: order.shippingAddress,
    }));

    return NextResponse.json({ orders: formatted }, { status: 200 });
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}