import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import ProductsTable from "@/components/admin/products/ProductsTable";

export default function AdminProductsPage() {
  return (
    <div>
      <AdminTopbar title="Products" />
      <div className="px-8 py-6">
        <ProductsTable />
      </div>
    </div>
  );
}