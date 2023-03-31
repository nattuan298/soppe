import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { HeaderSignIn, PageLayout } from "src/components";
import { apiRoute } from "src/constants/apiRoutes";
import EcommissionStatement from "src/modules/ecommission/ecommission-statement";
import { getCookieFromReq } from "src/utils";
import axios from "src/lib/client/request";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { OneEcomStatementType } from "types/api-response-type";
import { notifyToast } from "src/constants/toast";
import useGetScreenWidth from "../../hooks/useGetScreenWidth";

export default function EcommissionStatementPage() {
  const { t } = useTranslation("common");
  const [from, setFrom] = useState<Date>(dayjs().startOf("month").toDate());
  const [to, setTo] = useState<Date>(dayjs().endOf("month").toDate());
  const [list, setList] = useState<OneEcomStatementType[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const screen = useGetScreenWidth();
  const handleSelectDateRange = (from: Date, to: Date) => {
    setFrom(from);
    setTo(to);
  };

  useEffect(() => {
    const callAPI = async () => {
      setLoading(true);
      try {
        const api = `${apiRoute.agentReports.ecommStatement}?startDate=${dayjs(from).format(
          "YYYY-MM-DD",
        )}&endDate=${dayjs(to).format("YYYY-MM-DD")}&page=${page}&pageSize=${pageSize}`;
        const res = await axios.get(api);

        setList(res.data.data);
        setTotal(res.data.totalPage);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        const message = e.response?.data?.message;
        message && notifyToast("error", message);
      }
      setLoading(false);
    };
    if (from && to) {
      callAPI();
    }
  }, [from, to, page, pageSize]);

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`ecommission_statement`} />
      <main>
        <HeaderSignIn
          title={screen === "Mobile" ? t`ecommission_statement_mobile` : t`ecommission_statement`}
          showDateRange
          handleSelectDateRange={handleSelectDateRange}
          dateData={{ from, to }}
        />
        <PageLayout>
          <EcommissionStatement
            list={list}
            loading={loading}
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            total={total}
          />
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
