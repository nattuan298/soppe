import clsx from "clsx";
import "./styles.css";

interface StatusLabelProps {
  status: string;
  name?: string;
}

const STATUS_LABEL_CLASS: Record<string, string> = {
  "To Receive": "order-status-receive",
  Complete: "order-status-complete",
  "To Ship": "order-status-ship",
  "To Pay": "order-status-pay",
  "To Review": "order-status-review",
  "Cancel-Refund": "order-status-cancel-refund",
  Pending: "order-status-pending",
};

function StatusLabel({ status = "", name }: StatusLabelProps) {
  const statusLabelClass = clsx(
    "order-status-label text-center text-base font-normal text-white",
    STATUS_LABEL_CLASS[status],
  );

  function getStatusLabel() {
    if (status === "Cancel-Refund") return "Cancel/Refund";
    return name;
  }

  return <div className={statusLabelClass}>{getStatusLabel()}</div>;
}

export default StatusLabel;
