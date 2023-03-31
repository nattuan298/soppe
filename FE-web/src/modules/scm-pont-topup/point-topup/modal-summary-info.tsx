import { ScmpSummary } from "./scmp-summary";
import { ModalUserSummaryInfo } from "src/components/user-summary";

export function ModalSummaryInfo() {
  return (
    <div className="flex max-w-96 h-4.375 absolute rounded-0.625 -top-27 right-0">
      <div className="mr-5">
        <ScmpSummary />
      </div>
      <ModalUserSummaryInfo className="relative top-0" />
    </div>
  );
}
