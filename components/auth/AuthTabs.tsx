"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthTabs() {
  const pathname = usePathname();
  const isLogin = pathname === "/account/login";

  return (
    <div className="mx-auto flex max-w-md overflow-hidden rounded-md border border-neutral-200">
      <Link
        href="/account/login"
        className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
          isLogin ? "bg-neutral-900 text-white" : "bg-white text-neutral-700"
        }`}
      >
        Sign In
      </Link>
      <Link
        href="/account/register"
        className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
          !isLogin ? "bg-neutral-900 text-white" : "bg-white text-neutral-700"
        }`}
      >
        Create Account
      </Link>
    </div>
  );
}