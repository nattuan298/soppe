import { useTranslation } from "react-i18next";
import {
  routeHomePageTemplateManagement,
  routeManagementBannerLoopListBase,
  routeSectionBannerSlideManagement,
  routeSectionProductSlideList,
} from "src/constants/routes";
import { AppearanceManagementIcon } from "../icons";
import MultipleMenu from "./multiple-menu";

export default function AppearanceMenu() {
  const { t } = useTranslation("common");

  const routes = [
    { route: routeManagementBannerLoopListBase, name: t("home-banner-management") },
    { route: routeSectionBannerSlideManagement, name: t("section-banner-slide-management") },
    { route: routeSectionProductSlideList, name: t("section-product-slide-management") },
    { route: routeHomePageTemplateManagement, name: t("home-page-template-management") },
  ];
  return (
    <MultipleMenu
      title={t("appearance")}
      icon={<AppearanceManagementIcon />}
      routes={routes}
      rootRoute="appearance-management"
    />
  );
}
