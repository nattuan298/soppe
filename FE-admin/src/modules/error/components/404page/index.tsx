import { useTranslation } from "react-i18next";

import NoDataIcon from "src/components/icons/noDataIcon";

export function Custom404Page() {
  const { t } = useTranslation();
  return (
    <div className="w-full h-full text-black-dark">
      <div className="body flex-grow mb-16">
        <div className="mx-auto w-1216 h-full flex items-center justify-center">
          <div className="mt-12 mb-5 flex flex-col justify-center items-center">
            <NoDataIcon />
            <div className="flex items-center justify-center">
              <span className="text-orange mr-6 text-4xl font-medium">404</span>
              <div className="border" style={{ borderColor: "#BCBCBC", height: 35 }}></div>
              <span className="flex text-black-dark text-2xl ml-6">{t`Not Found`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
