import { Table } from "@material-ui/core";
import { G1AnalysisTableHeader } from "./g1-analysis-table-header";
import { G1AnalysisTableBody } from "./g1-analysis-table-body";

export function G1AnalysisTable() {
  return (
    <Table aria-label="customized table">
      <G1AnalysisTableHeader />
      <G1AnalysisTableBody />
    </Table>
  );
}
