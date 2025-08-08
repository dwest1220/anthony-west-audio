import ProtectedRoute from '@/components/routes/ProtectedRoute';
import InquiryView from '@/components/inquiries/InquiryPage';

export default function InquiryPage() {
  return (
    <ProtectedRoute>
      <InquiryView />
    </ProtectedRoute>
  );
}