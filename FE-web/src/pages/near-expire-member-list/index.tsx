import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { HeaderSignIn, PageLayout } from "src/components";
import { getCookieFromReq } from "src/utils";
import { NearExpireMemberList } from "src/modules/near-expire-member-list";
import { useState } from "react";
import { routeReportAnalysisBase } from "src/constants/routes";
import { useRouter } from "next/router";

export default function NearExpireMemberListPage() {
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
      <NextSeo title={t`near_expire_member_list`} />
      <main>
        <HeaderSignIn
          title={t`near_expire_member_list`}
          search
          handleSearch={handleSearch}
          searchPlaceHoder={t("search-member-id")}
          onClickBack={handleBack}
        />
        <PageLayout>
          <NearExpireMemberList keyword={keyword} />
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
