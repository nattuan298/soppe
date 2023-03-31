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
        return "to_pay";
      case "To Ship":
        return "to_ship";
      case "To Receive":
        return "to_receive";
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
      <div className="grid grid-cols-12 col-span-9 mt-4">
        <div className="col-span-12 sm:col-span-6 flex items-center justify-between sm:justify-start">
          <span className="ml-2.5 mr-2">
            {`${t("order_id")}:`}
            <Link onClick={handleClickFullDetail} className="text-orange ml-2">
              {id}
            </Link>
          </span>

          <span className="ml-2 text-blue">{t(`${getStatus(status)}`)}</span>
        </div>
        <div className="col-span-2 text-center hidden sm:block">{t`quantity`}</div>

        <div className="col-span-2 text-center hidden sm:block">{t`price`}</div>
        <div className="col-span-2 text-center hidden sm:block">{t`received_PV`}</div>
      </div>
      <div className="col-span-1" />
    </div>
  );
}
