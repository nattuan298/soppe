import { NoDataIcon } from "src/components/icons";
import { useTranslation } from "react-i18next";

export default function NoData() {
  const { t } = useTranslation("common");
  return (
    <div className="w-full h-72 grid justify-items-center text-center">
      <div className="mt-8">
        <NoDataIcon />
      </div>
      <p className="txt-no-data-notify font-medium">{t`no-data`}</p>
    </div>
  );
}
