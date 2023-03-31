import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState } from "react";

import { HeaderSignIn, PageLayout } from "src/components";
import LeftNavinationReport from "src/components/left-navigation/left_navigation_report";
import DirectSponsorAnalysis from "src/modules/direct-sponsor-analysis";
import { getCookieFromReq } from "src/utils";

export default function DirectSponsorAnalysisPage() {
  const [search, setSearch] = useState<string>("");

  const router = useRouter();
  const { t } = useTranslation("common");
  const handleBack = async () => {
    router.push("/report-analysis");
  };

  const handleSearch = (value: string) => {
    setSearch(value.trim());
  };

  return (
    <div className="w-full">
      <NextSeo title={t`direct-sponsor-team-analysis`} />
      <main>
        <HeaderSignIn
          title={t`direct-sponsor-team-analysis`}
          onClickBack={handleBack}
          handleSearch={handleSearch}
          search
          searchPlaceHoder={t`search-member-id`}
        />
        <PageLayout className="md:mx-auto md:w-1216 relative mb-8 px-3 md:px-0">
          <div className="md:flex mt-6">
            <div className="col-span-2">
              <LeftNavinationReport />
            </div>
            <div className="md:pl-20 md:flex-grow mt-4 md:mt-0">
              <DirectSponsorAnalysis searchId={search} />
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
