import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import CustomersTable from "@/components/admin/customers/CustomersTable";

export default function AdminCustomersPage() {
  return (
    <div>
      <AdminTopbar title="Customers" />
      <div className="px-8 py-6">
        <CustomersTable />
      </div>
    </div>
  );
}