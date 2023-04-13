import { useTranslation } from "react-i18next";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";

import { Th } from "src/components/generic-table/th";

export function TemplateHomeListHeader() {
  const { t } = useTranslation("common");
  return (
    <TableRow>
      <Th align="left">
        <Box minWidth={280}>{t`template-name`}</Box>
      </Th>
      <Th align="left">{t`create-date`}</Th>
      <Th align="center">{t`number-product-slide`}</Th>
      <Th align="center">{t`number-banner-slide`}</Th>
      <Th align="center">
        <Box width={125}>{t`action`}</Box>
      </Th>
    </TableRow>
  );
}
