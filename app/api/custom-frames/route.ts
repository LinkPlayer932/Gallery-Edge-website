import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CustomFrameRequest from "@/models/CustomFrameRequest";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const {
      name, email, phone, material, color, size, width, height, unit, notes, referenceImageUrl,
    } = body;

    if (!name || !email || !phone || !material || !color || !size || !width || !height) {
      return NextResponse.json({ error: "Please fill all required fields" }, { status: 400 });
    }

    const saved = await CustomFrameRequest.create({
      name, email, phone, material, color, size, width, height, unit, notes, referenceImageUrl,
    });
    return NextResponse.json({ success: true, id: saved._id }, { status: 201 });
  } catch (error) {
    console.error("POST /api/custom-frames error:", error);
    return NextResponse.json({ error: "Failed to save request" }, { status: 500 });
  }
}