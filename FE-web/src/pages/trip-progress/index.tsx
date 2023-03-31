import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { HeaderSignIn, PageLayout } from "src/components";
import { routeReportAnalysisBase } from "src/constants/routes";
import { getCookieFromReq } from "src/utils";
import axios from "src/lib/client/request";
import { apiRoute } from "src/constants/apiRoutes";
import { PersonalStatisticType } from "types/api-response-type";
import React from "react";
import { TripProcess } from "src/modules/trip-process";
import { ModalUserSummaryInfo } from "src/components/user-summary";

export default function Index({ report }: { report: PersonalStatisticType | undefined }) {
  const { t } = useTranslation("common");
  const router = useRouter();

  const onClickBack = () => {
    router.push(routeReportAnalysisBase);
  };

  if (!report) {
    return null;
  }

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`trip-pv`} />
      <main>
        <HeaderSignIn
          title={t`trip-pv`}
          onClickBack={onClickBack}
          userInfo={<ModalUserSummaryInfo showDate width={330} />}
        />
        <PageLayout className="pt-4 md:pt-0">
          <TripProcess />
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

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  let report: PersonalStatisticType | null = null;
  try {
    const ress = await axios.get(`${apiRoute.members.personalStatistic}`);
    report = ress.data;
  } catch (e) {}

  return {
    props: {
      report,
    },
  };
};
