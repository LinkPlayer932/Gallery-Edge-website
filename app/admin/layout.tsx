"use client";

import { usePathname } from "next/navigation";
import ToastProvider from "@/components/system/ToastProvider";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <ToastProvider>{children}</ToastProvider>;
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#FAF7F2]">
        <AdminSidebar />
        <div className="ml-60 min-h-screen overflow-y-auto">{children}</div>
      </div>
    </ToastProvider>
  );
}