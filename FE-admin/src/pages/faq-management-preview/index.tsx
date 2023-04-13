import { GoBack } from "src/components";
import { routeFAQManagement } from "src/constants/routes";
import { FAQPreview } from "src/modules/FAQ-management";

export default function FAQFullDetail() {
  return (
    <main className="p-5">
      <GoBack url={routeFAQManagement} />
      <FAQPreview />
    </main>
  );
}
