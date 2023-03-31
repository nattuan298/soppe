import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import useTranslation from "next-translate/useTranslation";
import NoDataIcon from "src/components/svgs/no-data";
import { HeaderSignIn, PageLayout } from "src/components";

export default function Custom404Page() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="w-full text-black-dark">
      <NextSeo title={`404 ${t("not_found")}`} />
      <main>
        <HeaderSignIn title={`404 ${t("not_found")}`} onClickBack={handleBack} />
        <div className="body flex-grow mb-16">
          <PageLayout className="mx-auto w-auto sm:w-1216 h-full flex items-center justify-center">
            <div className="mt-12 mb-5 flex flex-col justify-center items-center">
              <NoDataIcon />
              <div className="flex items-center justify-center">
                <span className="text-orange mr-6 text-4xl font-medium">404</span>
                <div className="border" style={{ borderColor: "#BCBCBC", height: 35 }}></div>
                <span className="flex text-black-dark text-2xl ml-6">{t`not_found`}</span>
              </div>
            </div>
          </PageLayout>
        </div>
      </main>
    </div>
  );
}
