import { Table } from "@material-ui/core";
import SponsorTableHeader from "./sponsor-table-header";
import SponsorTableBody from "./sponsor-table-body";

export default function DirectSponsorTable() {
  return (
    <Table aria-label="customized table">
      <SponsorTableHeader />
      <SponsorTableBody />
    </Table>
  );
}
