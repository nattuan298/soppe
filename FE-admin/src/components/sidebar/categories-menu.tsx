import { routeArticleCategoryList, routeFAQCategoryList } from "src/constants/routes";
import MultipleMenu from "./multiple-menu";
import { CategoryIcon } from "../icons";
import { useTranslation } from "react-i18next";

export default function CategoriesMenu() {
  const { t } = useTranslation("common");

  const routes = [
    { route: routeArticleCategoryList, name: t`news-&-article-category` },
    { route: routeFAQCategoryList, name: t`faq-category` },
  ];
  return (
    <MultipleMenu
      title={t`categories`}
      icon={<CategoryIcon />}
      routes={routes}
      rootRoute="category-management"
    />
  );
}
