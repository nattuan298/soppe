import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState } from "react";
import { HeaderSignIn, PageLayout } from "src/components";
import { SponsoredUserHistory } from "src/modules/sponsored-user-history";
import { getCookieFromReq } from "src/utils";

export default function SponsoredUserHistoryPage() {
  const [search, setSearch] = useState<string>("");
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleBack = () => {
    router.back();
  };
  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`sponsored-user-history`} />
      <main>
        <HeaderSignIn
          title={t`sponsored-user-history`}
          onClickBack={handleBack}
          iconHistory={true}
          search={true}
          refresh={true}
          handleSearch={handleSearch}
        />
        <PageLayout>
          <SponsoredUserHistory search={search} />
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
