import { useTranslation } from "react-i18next";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";

import { Th } from "src/components/generic-table/th";

export default function NotificationListHeader() {
  const { t } = useTranslation("common");
  return (
    <TableRow>
      <Th align="left">
        <Box className="wide:min-w-[300px] min-w-[250px]">{t`topic`}</Box>
      </Th>
      <Th align="left">{t`created-date`}</Th>
      <Th align="left">{t`publish-date`}</Th>
      <Th align="center">{t`target`}</Th>
      <Th align="center">{t`category`}</Th>
      <Th align="center">
        <Box width={110}>{t`status`}</Box>
      </Th>
      <Th align="center">
        <Box>{t`action`}</Box>
      </Th>
    </TableRow>
  );
}
