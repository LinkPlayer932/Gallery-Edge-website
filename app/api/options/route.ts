import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Option from "@/models/Option";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const type = request.nextUrl.searchParams.get("type"); // "size" | "color" | null

    const query = type ? { type } : {};
    const options = await Option.find(query).sort({ createdAt: 1 });

    return NextResponse.json({ options });
  } catch (error) {
    console.error("GET /api/options error:", error);
    return NextResponse.json({ error: "Failed to fetch options" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.type || !["size", "color"].includes(body.type)) {
      return NextResponse.json({ error: "Valid type ('size' or 'color') is required" }, { status: 400 });
    }
    if (!body.value || !body.value.trim()) {
      return NextResponse.json({ error: "Value is required" }, { status: 400 });
    }

    const value = body.value.trim();

    const existing = await Option.findOne({
      type: body.type,
      value: { $regex: `^${value}$`, $options: "i" },
    });
    if (existing) {
      return NextResponse.json({ error: "This option already exists" }, { status: 409 });
    }

    const option = await Option.create({ type: body.type, value });

    return NextResponse.json({ option }, { status: 201 });
  } catch (error) {
    console.error("POST /api/options error:", error);
    return NextResponse.json({ error: "Failed to create option" }, { status: 500 });
  }
}