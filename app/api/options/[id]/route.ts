import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Option from "@/models/Option";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const deleted = await Option.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Option not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/options/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete option" }, { status: 500 });
  }
}