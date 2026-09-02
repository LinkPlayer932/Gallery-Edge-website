import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import CategoryForm from "@/components/admin/categories/CategoryForm";

export default function AdminNewCategoryPage() {
  return (
    <div>
      <AdminTopbar title="Categories" />
      <div className="px-8 py-6">
        <CategoryForm />
      </div>
    </div>
  );
}