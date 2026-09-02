import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import CategoriesTable from "@/components/admin/categories/CategoriesTable";

export default function AdminCategoriesPage() {
  return (
    <div>
      <AdminTopbar title="Categories" />
      <div className="px-8 py-6">
        <CategoriesTable />
      </div>
    </div>
  );
}