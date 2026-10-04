import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Name, email and password are required" },
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

        const existing = await Customer.findOne({ email: email.toLowerCase() });
        if (existing) {
            return NextResponse.json(
                { error: "An account with this email already exists" },
                { status: 409 }
            );
        }

        const customer = await Customer.create({
            name,
            email: email.toLowerCase(),
            password,
        });

        const token = jwt.sign(
            { customerId: customer._id },
            process.env.JWT_SECRET!,
            { expiresIn: "30d" }
        );

        const response = NextResponse.json({
            success: true,
            customer: { id: customer._id, name: customer.name, email: customer.email },
        });

        response.cookies.set("customer_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
        });

        return response;
    } catch (err) {
        console.error("Signup error:", err);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}