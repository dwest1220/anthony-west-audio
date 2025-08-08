import ProtectedRoute from '@/components/routes/ProtectedRoute';
import InquiryView from '@/components/inquiries/InquiryView';

export default function InquiryPage() {
  return (
    <ProtectedRoute>
      <InquiryView />
    </ProtectedRoute>
  );
}