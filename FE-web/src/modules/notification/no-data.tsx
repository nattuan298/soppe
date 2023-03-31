import useTranslation from "next-translate/useTranslation";

import NoDataIcon from "src/components/svgs/no-data";

export default function NoData() {
  const { t } = useTranslation("common");
  return (
    <div className="w-full h-72 grid justify-items-center text-center">
      <div className="mt-8">
        <NoDataIcon />
      </div>
      <p className="txt-no-data font-light">{t`no_data`}</p>
    </div>
  );
}
