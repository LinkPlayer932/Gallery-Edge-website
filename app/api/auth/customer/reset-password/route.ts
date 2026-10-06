import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and new password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    await connectDB();

    const customer = await Customer.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() },
    }).select("+resetToken +resetTokenExpiry");

    if (!customer) {
      return NextResponse.json(
        { error: "Reset link is invalid or has expired" },
        { status: 400 }
      );
    }

    customer.password = password; // hashed automatically by pre("save") hook
    customer.resetToken = undefined;
    customer.resetTokenExpiry = undefined;
    await customer.save();

    return NextResponse.json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}