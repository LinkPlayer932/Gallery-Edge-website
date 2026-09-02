import AdminSidebar from "@/components/admin/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <AdminSidebar />
      <div className="ml-60 min-h-screen overflow-y-auto">{children}</div>
    </div>
  );
}