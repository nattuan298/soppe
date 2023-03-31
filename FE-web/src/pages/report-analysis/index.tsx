import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HeaderSignIn, PageLayout } from "src/components";
import { ModalUserSummaryInfo } from "src/components/user-summary";
import { apiRoute } from "src/constants/apiRoutes";
import { routeAccountBase } from "src/constants/routes";
import axios from "src/lib/client/request";
import ReportAnalysis from "src/modules/report_analysis";
import { getCookieFromReq } from "src/utils";
import { PersonalStatisticType } from "types/api-response-type";

export default function ReportAnalysisPage() {
  const { t } = useTranslation("common");
  const [report, setReport] = useState<PersonalStatisticType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const callAPI = async () => {
      try {
        const ress = await axios.get(`${apiRoute.members.personalStatistic}`);

        setReport(ress.data);
      } catch (e) {}
    };

    callAPI();
  }, []);

  const onClickBack = () => {
    router.push(routeAccountBase);
  };

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`report-analysis`} />
      <main>
        <HeaderSignIn
          title={t`report-analysis`}
          onClickBack={onClickBack}
          userInfo={<ModalUserSummaryInfo showDate width={330} />}
        />
        <PageLayout>
          <ReportAnalysis report={report} />
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
