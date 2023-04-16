import { useTranslation } from "react-i18next";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";

import { Th } from "src/components/generic-table/th";

export function BannerListHeader() {
  const { t } = useTranslation("common");
  return (
    <TableRow>
      <Th align="left" className="w-84">
        <Box>Banner Name</Box>
      </Th>
      <Th align="left">{t`create-date`}</Th>
      <Th align="center">
        <Box >{t`status`}</Box>
      </Th>
      <Th align="center">
        <Box>{t`action`}</Box>
      </Th>
    </TableRow>
  );
}
