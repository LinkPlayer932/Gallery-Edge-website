import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const adminUser = process.env.ADMIN_USER || "admin";
    const adminPass = process.env.ADMIN_PASSWORD || "admin123";

    if (username === adminUser && password === adminPass) {
      const response = NextResponse.json({ success: true, message: "Logged in successfully" });
      response.cookies.set("admin_session", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return response;
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Login failed" }, { status: 500 });
  }
}
