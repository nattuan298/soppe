import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "src/state/store";

import { HeaderSignIn, PageLayout } from "src/components";
import LeftNavinationReport from "src/components/left-navigation/left_navigation_report";
import { getCookieFromReq } from "src/utils";
import Organization from "src/modules/organization";
import { ModalUserSummaryInfo } from "src/components/user-summary";
import { updateKeyWord } from "src/feature/organization/organization.slice";

export default function FavoriteMemberPage() {
  const { t } = useTranslation("common");
  const { loading } = useSelector((state: RootState) => state.organization);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleBack = () => {
    router.push("/report-analysis");
  };

  useEffect(() => {
    dispatch(updateKeyWord(""));
  }, [dispatch]);

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`organization_chart`} />
      <main>
        <HeaderSignIn
          // search
          diableSearch={loading}
          title={t`organization_chart`}
          onClickBack={handleBack}
          // searchPlaceHoder={t`search-member-id`}
          // handleSearch={handleSearch}
        />
        <PageLayout className="mx-auto w-auto sm:w-1216 mb-8 mt-6 flex relative">
          <div className="flex mt-6 justify-center sm:justify-start w-screen sm:w-full sm:flex-grow-0">
            <div className="col-span-2">
              <LeftNavinationReport />
            </div>
            <ModalUserSummaryInfo
              showDate
              className="left-80 right-auto hidden sm:block"
              width={340}
            />
            <div className="sm:pl-20 sm:flex-grow">
              <Organization />
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
