import { useTranslation } from "react-i18next";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";

import { Th } from "src/components/generic-table/th";

export function ProductsHeader() {
  const { t } = useTranslation("common");
  return (
    <TableRow>
      <Th align="left">
        <Box minWidth={300}>{t`product-name`}</Box>
      </Th>
      <Th>{t`sku`}</Th>
      <Th>{t`price-retail`}</Th>
      <Th>{t`price-member`}</Th>
      <Th>{t`pv`}</Th>
      <Th>{t`rating`}</Th>
    </TableRow>
  );
}
