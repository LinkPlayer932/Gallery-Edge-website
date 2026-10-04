import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        await connectDB();

        // password field has select:false, so explicitly request it
        const customer = await Customer.findOne({ email: email.toLowerCase() }).select("+password");

        if (!customer || !customer.password) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        const isMatch = await customer.comparePassword(password);
        if (!isMatch) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

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
        console.error("Login error:", err);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}