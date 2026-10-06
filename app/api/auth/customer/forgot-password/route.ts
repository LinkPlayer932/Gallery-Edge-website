import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectDB();

    const customer = await Customer.findOne({ email: email.toLowerCase() });

    // Always return success even if customer not found — avoids leaking
    // which emails are registered.
    if (!customer) {
      return NextResponse.json({
        success: true,
        message: "If an account exists, a reset link has been sent.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    customer.resetToken = resetToken;
    customer.resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes
    await customer.save();

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/account/reset-password/${resetToken}`;

    await sendEmail({
      to: customer.email,
      subject: "Reset your Gallery Edge password",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
          <h2>Reset your password</h2>
          <p>Hi ${customer.name},</p>
          <p>Click the button below to reset your Gallery Edge account password. This link expires in 30 minutes.</p>
          <a href="${resetUrl}" style="display:inline-block;margin:16px 0;padding:12px 24px;background:#171717;color:#fff;text-decoration:none;border-radius:6px;">
            Reset Password
          </a>
          <p>If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "If an account exists, a reset link has been sent.",
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}