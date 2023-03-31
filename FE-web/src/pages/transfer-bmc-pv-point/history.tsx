import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { HeaderSignIn, PageLayout } from "src/components";
import History from "src/modules/bmc_pv_point/history";
import { getCookieFromReq } from "src/utils";

export default function AccountInformationPage() {
  const { t } = useTranslation("common");
  const [keySearch, setKeySearch] = useState("");

  const handleSearch = (value: string) => {
    setKeySearch(value);
  };

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`transfer_BMC_PV_point_history`} />
      <main>
        <HeaderSignIn title={t`transfer_BMC_PV_point_history`} search handleSearch={handleSearch} />
        <PageLayout>
          <History keySearch={keySearch} />
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
