import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

async function getOrCreateProfile() {
  let profile = await Admin.findOne();
  if (!profile) {
    profile = await Admin.create({
      name: "Admin",
      email: process.env.ADMIN_USER || "admin@galleryedge.com",
      role: "Store Owner",
    });
  }
  return profile;
}

export async function GET() {
  try {
    await connectDB();
    const profile = await getOrCreateProfile();
    return NextResponse.json({ profile });
  } catch (error) {
    console.error("GET /api/admin/profile error:", error);
    return NextResponse.json({ error: "Failed to load profile" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, email, role, avatarUrl } = body;

    const profile = await getOrCreateProfile();
    if (name !== undefined) profile.name = name;
    if (email !== undefined) profile.email = email;
    if (role !== undefined) profile.role = role;
    if (avatarUrl !== undefined) profile.avatarUrl = avatarUrl;
    await profile.save();

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("PUT /api/admin/profile error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}