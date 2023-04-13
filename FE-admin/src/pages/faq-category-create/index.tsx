import { GoBack } from "src/components";
import { routeFAQCategoryList } from "src/constants/routes";
import FAQCategoryForm from "src/modules/faq-categories/faq-catefories-form";

export default function NewsFAQCategory() {
  return (
    <main className="p-5">
      <GoBack url={routeFAQCategoryList} />
      <FAQCategoryForm mode="create" />
    </main>
  );
}
