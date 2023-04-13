import { useTranslation } from "react-i18next";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";

import { Th } from "src/components/generic-table/th";

export function BannerListHeader() {
  const { t } = useTranslation("common");
  return (
    <TableRow>
      <Th align="left" className="w-96">
        <Box width={298}>{t`banner-loop-name`}</Box>
      </Th>
      <Th align="left">{t`create-date`}</Th>
      <Th align="left" className="w-56">{t`publish-period`}</Th>
      <Th align="center" className="w-42">{t`number-of-banner`}</Th>
      <Th align="center">{t`total-duration`}</Th>
      <Th align="center">
        <Box width={110}>{t`status`}</Box>
      </Th>
      <Th align="center">
        <Box width={250}>{t`action`}</Box>
      </Th>
    </TableRow>
  );
}
