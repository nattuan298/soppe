import { useState } from "react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

import { HeaderSignIn, PageLayout } from "src/components";
import LeftNavinationReport from "src/components/left-navigation/left_navigation_report";
import { getCookieFromReq } from "src/utils";
import SponsorChart from "src/modules/sponsor-chart";
import { ModalUserSummaryInfo } from "src/components/user-summary";

export default function SponsorChartPage() {
  const { t } = useTranslation("common");
  const [keyWord, setKeyWord] = useState<string>("");
  const router = useRouter();

  const handleBack = () => {
    router.push("/report-analysis");
  };

  const handleSearch = (value: string) => {
    setKeyWord(value);
  };

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`sponsor_chart`} />
      <main>
        <HeaderSignIn
          search
          title={t`sponsor_chart`}
          onClickBack={handleBack}
          searchPlaceHoder={t`search-member-id`}
          handleSearch={handleSearch}
        />
        <PageLayout className="md:mx-auto md:w-1216 relative mb-8 px-3 md:px-0">
          <div className="md:flex mt-6 w-full md:flex-grow-0">
            <div className="col-span-2">
              <LeftNavinationReport />
            </div>
            <ModalUserSummaryInfo
              showDate
              className="left-80 right-auto mt-20 md:mt-0 hidden sm:block"
              width={340}
            />
            <div className="w-full md:pl-20 mt-5 md:mt-0 md:flex-grow">
              <SponsorChart keyWord={keyWord} />
            </div>
          </div>
        </PageLayout>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookie = req.headers.cookie;
  const { cookies } = req;
  let token;
  if (cookie) {
    token = getCookieFromReq(cookie, "token") || cookies.token;
  }
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }
  return {
    props: {},
  };
};
