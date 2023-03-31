import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { HeaderSignIn, PageLayout } from "src/components";
import { getCookieFromReq } from "src/utils";
import { ExpiredMemberList } from "src/modules/expired-member-history";
import { useState } from "react";
import { useRouter } from "next/router";
import { routeReportAnalysisBase } from "src/constants/routes";

export default function ExpiredMemberListPage() {
  const { t } = useTranslation("common");
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();

  const handleSearch = (value: string) => {
    setKeyword(value.trim());
  };

  const handleBack = () => {
    router.push(routeReportAnalysisBase);
  };

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`expired_member_list`} />
      <main>
        <HeaderSignIn
          title={t`expired_member_list`}
          search
          handleSearch={handleSearch}
          searchPlaceHoder={t("search-member-id")}
          onClickBack={handleBack}
        />
        <PageLayout>
          <ExpiredMemberList keyword={keyword} />
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
