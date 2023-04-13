import { useTranslation } from "react-i18next";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";

import { Th } from "src/components/generic-table/th";

export function RoleAndPermissionTableHead() {
  const { t } = useTranslation("common");

  return (
    <TableRow>
      <Th align="left">
        <Box className="wide:min-w-[250px] min-w-[200px]">{t("role-name")}</Box>
      </Th>
      <Th align="center">{t("number-of-user")}</Th>
      <Th align="center">{t("number-of-accessible-feature")}</Th>
      <Th align="left" width="12%">
        {t("created-date")}
      </Th>
      <Th align="left" width="12%">
        {t("last-modified")}
      </Th>
      <Th align="center">{t("status")}</Th>
      <Th align="left">{t("action")}</Th>
    </TableRow>
  );
}
