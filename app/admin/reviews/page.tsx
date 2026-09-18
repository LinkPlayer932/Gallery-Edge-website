import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import ReviewsManager from "@/components/admin/reviews/ReviewsManager";

export default function AdminReviewsPage() {
  return (
    <div>
      <AdminTopbar title="Customer Reviews" />
      <div className="px-8 py-6">
        <ReviewsManager />
      </div>
    </div>
  );
}
