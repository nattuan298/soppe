import { Table } from "@material-ui/core";

import TableHeader from "./favorite-member-header";
import TabelBody from "./favorite-member-body";
import { FavoriteMemberModel } from "src/feature/favorite-member/types";
interface DirectSponsorTableProps {
  members: Array<FavoriteMemberModel>;
  widthScreen: string;
}
export default function DirectSponsorTable({ members, widthScreen }: DirectSponsorTableProps) {
  return (
    <Table aria-label="customized table">
      <TableHeader screen={widthScreen} />
      <TabelBody members={members} screen={widthScreen} />
    </Table>
  );
}
