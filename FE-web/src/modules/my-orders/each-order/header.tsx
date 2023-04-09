import useTranslation from "next-translate/useTranslation";
import Link from "src/components/text/link";

interface HeaderType {
  id?: string;
  status: string;
  handleClickFullDetail: () => void;
}

export default function Header({ id, status, handleClickFullDetail }: HeaderType) {
  const { t } = useTranslation("common");

  const getStatus = (status: string) => {
    switch (status) {
      case "To Pay":
        return "waiting_approve";
      case "To Ship":
        return "delivery";
      case "To Receive":
        return "receipted";
      case "To Review":
        return "to_review";
      case "Complete":
        return "complete";
      case "Cancel-Refund":
        return "cancel_refund";
      case "Pending":
        return "pending";
    }
  };

  return (
    <div className="grid sm:grid-cols-10 mt-4">
      <div className="grid grid-cols-12 col-span-10 mt-4">
        <div className="col-span-12 sm:col-span-8 flex items-center justify-between sm:justify-start">
          <span className="ml-2.5 mr-2">
            {`${t("order_id")}:`}
            <Link onClick={handleClickFullDetail} className="text-orange ml-2">
              {id}
            </Link>
          </span>

          <span className="ml-2 text-blue">{t(status)}</span>
        </div>
        <div className="col-span-2 text-center hidden sm:block">{t`quantity`}</div>
        <div className="col-span-2 text-center hidden sm:block">{t`price`}</div>
      </div>
    </div>
  );
}
