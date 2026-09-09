import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page itself, so people can actually log in
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Protect everything else under /admin
  if (pathname.startsWith("/admin")) {
    const session = request.cookies.get("admin_session");

    if (!session || session.value !== "true") {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};