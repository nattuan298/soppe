import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { HeaderSignIn, PageLayout } from "src/components";
import { ModalUserSummaryInfo } from "src/components/user-summary";
import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";
import ReportAnalysis from "src/modules/report_analysis";
import { getCookieFromReq } from "src/utils";
import { PersonalStatisticType } from "types/api-response-type";

export default function MyAccountPage() {
  const { t } = useTranslation("common");
  const [report, setReport] = useState<PersonalStatisticType | null>(null);

  useEffect(() => {
    const callAPI = async () => {
      try {
        const ress = await axios.get(`${apiRoute.members.accountInformation}`);

        setReport(ress.data);
      } catch (e) {}
    };

    callAPI();
  }, []);

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`account`} />
      <main>
        <HeaderSignIn title={t`account`} userInfo={<ModalUserSummaryInfo showDate width={330} />} />
        <PageLayout className="mx-auto md:w-1216 mb-8 flex relative">
          <ReportAnalysis report={report} isMyAccount />
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
        permanent: true,
        destination: "/signin",
      },
    };
  }

  return {
    props: {},
  };
};
