import { useState } from "react";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

import { HeaderSignIn, PageLayout } from "src/components";
import { getCookieFromReq } from "src/utils";
import LeftNavinationReport from "src/components/left-navigation/left_navigation_report";
import G1Analysis from "src/modules/g1-analysis";

export default function DirectSponsorAnalysisPage() {
  const [searchMemberId, setSearchMemberId] = useState<string>("");

  const router = useRouter();
  const { t } = useTranslation("common");
  const handleBack = async () => {
    router.push("/report-analysis");
  };

  const handleSearch = (value: string) => {
    setSearchMemberId(value.trim());
  };

  return (
    <div className="w-full">
      <NextSeo title={t`g1_analysis`} />
      <main>
        <HeaderSignIn
          title={t`g1_analysis`}
          onClickBack={handleBack}
          handleSearch={handleSearch}
          search
          searchPlaceHoder={t`search-member-id`}
        />
        <PageLayout className="md:mx-auto md:w-1216 relative mb-8 px-3 md:px-0">
          <div className="md:flex mt-6">
            <div className="md:col-span-2">
              <LeftNavinationReport />
            </div>
            <div className="md:pl-20 md:flex-grow mt-4 md:mt-0">
              <G1Analysis keyword={searchMemberId} />
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
