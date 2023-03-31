import useTranslation from "next-translate/useTranslation";
import Link from "src/components/text/link";

interface HeaderType {
  id?: string;
  handleClickFullDetail?: () => void;
}

export default function Header({ id, handleClickFullDetail }: HeaderType) {
  const { t } = useTranslation("common");
  return (
    <div className="grid grid-cols-11 col-span-9 mt-4">
      <div className="col-span-11 sm:col-span-6 flex items-center">
        <span className="sm:ml-2.5 mr-2">
          {`${t("order_id")}:`}
          <Link className="text-orange ml-2" onClick={handleClickFullDetail}>
            {id}
          </Link>
        </span>
      </div>
      <div className="col-span-2 text-center hidden sm:block">{t`quantity`}</div>
      <div className="col-span-3 text-center hidden sm:block">{t`total_pv`}</div>
    </div>
  );
}
