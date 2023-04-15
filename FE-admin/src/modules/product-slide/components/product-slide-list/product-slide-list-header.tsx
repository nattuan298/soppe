import { useTranslation } from "react-i18next";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";

import { Th } from "src/components/generic-table/th";

export function ProductSlideListHeader() {
  const { t } = useTranslation("common");
  return (
    <TableRow>
      <Th align="left">
        <Box width={350}>{t`section-product-slide-name`}</Box>
      </Th>
      <Th align="left">{t`create-date`}</Th>
      <Th align="center">{t`number-of-product`}</Th>
      <Th align="center">
        <Box width={110}>{t`status`}</Box>
      </Th>
      <Th align="center">
        <Box width={300}>{t`action`}</Box>
      </Th>
    </TableRow>
  );
}
