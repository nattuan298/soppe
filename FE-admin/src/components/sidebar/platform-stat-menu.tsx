import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  routeDataHistoryList,
  routeInternalUserHistoryList,
  routePlatformHome,
  routeUserHistoryList,
} from "src/constants/routes";
import { PlatformStatIcon } from "../icons";
import MultipleMenu from "./multiple-menu";

export default function PlatformStatMenu() {
  const { t } = useTranslation("common");
  const routes = useMemo(
    () => [
      { route: routePlatformHome, name: t("home") },
      {
        route: routeUserHistoryList,
        name: t("user-access-history"),
      },
      {
        route: routeInternalUserHistoryList,
        name: t("internal-user-access-history"),
      },
      {
        route: routeDataHistoryList,
        name: t("data-export-history"),
      },
    ],
    [t],
  );
  return (
    <MultipleMenu
      title={t`platforms_stat`}
      icon={<PlatformStatIcon />}
      routes={routes}
      rootRoute="platform-statistic"
    />
  );
}
