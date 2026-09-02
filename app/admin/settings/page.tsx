import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import StoreInfoCard from "@/components/admin/settings/StoreInfoCard";
import ShippingSettingsCard from "@/components/admin/settings/ShippingSettingsCard";
import PaymentMethodsCard from "@/components/admin/settings/PaymentMethodsCard";
import TaxSettingsCard from "@/components/admin/settings/TaxSettingsCard";
import NotificationsCard from "@/components/admin/settings/NotificationsCard";

export default function AdminSettingsPage() {
  return (
    <div>
      <AdminTopbar title="Settings" />
      <div className="mx-auto max-w-3xl px-8 py-6">
        <StoreInfoCard />
        <ShippingSettingsCard />
        <PaymentMethodsCard />
        <TaxSettingsCard />
        <NotificationsCard />
      </div>
    </div>
  );
}