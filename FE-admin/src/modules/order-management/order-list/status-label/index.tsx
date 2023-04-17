import clsx from "clsx";
import "./styles.css";

interface StatusLabelProps {
  status: string;
  name?: string;
}

const STATUS_LABEL_CLASS: Record<string, string> = {
  waiting_approve: "waiting_approve",
  delivery: "delivery",
  receipted: "receipted",
};

function StatusLabel({ status = "", name }: StatusLabelProps) {
  console.log(status);
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
