import { useTranslation } from "react-i18next";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";

import { Th } from "src/components/generic-table/th";

interface Props {
  bannerLoopName: string;
}

export function BannerListHeader({ bannerLoopName }: Props) {
  const { t } = useTranslation("common");
  return (
    <TableRow>
      <Th align="left">
        <Box minWidth={250}>{bannerLoopName}</Box>
      </Th>
      <Th align="left">{t`create-date`}</Th>
      <Th align="center">{t`type`}</Th>
      <Th align="center">
        <Box width={110}>{t`status`}</Box>
      </Th>
      <Th align="center">
        <Box>{t`action`}</Box>
      </Th>
    </TableRow>
  );
}
