import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { HeaderSignIn, PageLayout } from "src/components";
import { getCookieFromReq } from "src/utils";
import { TravelPVHistory } from "src/modules/travel-pv-history";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { routeReportAnalysisBase } from "src/constants/routes";
// import axios from "src/lib/client/request";
// import { TripType } from "src/feature/travel-pv-history/types";

export default function TravelPVHistoryPage() {
  const { t } = useTranslation("common");
  const [from, setFrom] = useState<Date>(dayjs().subtract(1, "month").toDate());
  const [to, setTo] = useState<Date>(new Date());
  const router = useRouter();

  useEffect(() => {
    const now = dayjs();
    const month = now.month();
    const days = now.daysInMonth();
    const year = now.year();
    setFrom(new Date(year, month, 1));
    setTo(new Date(year, month, days));
  }, []);

  const handleSelectDateRange = (from: Date, to: Date) => {
    setFrom(from);
    setTo(to);
  };

  const handleBack = () => {
    router.push(routeReportAnalysisBase);
  };

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`travel_tp_history`} />
      <main>
        <HeaderSignIn
          title={t`travel_tp_history`}
          showDateRange
          handleSelectDateRange={handleSelectDateRange}
          dateData={{ from, to }}
          onClickBack={handleBack}
        />
        <PageLayout className="md:mt-20 md:mt-0">
          <TravelPVHistory from={from} to={to} />
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
