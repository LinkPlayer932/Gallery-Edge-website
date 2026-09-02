import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import ProductForm from "@/components/admin/products/ProductForm";

export default function AdminNewProductPage() {
  return (
    <div>
      <AdminTopbar title="Products" />
      <div className="px-8 py-6">
        <ProductForm />
      </div>
    </div>
  );
}