import { useState } from "react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { HeaderSignIn, PageLayout } from "src/components";
import LeftNavinationReport from "src/components/left-navigation/left_navigation_report";
import { getCookieFromReq } from "src/utils";
import FavoriteMember from "src/modules/favorite-member";

export default function FavoriteMemberPage() {
  const { t } = useTranslation("common");
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const handleBack = () => {
    router.back();
    // router.push("/report-analysis");
  };

  const handleSearch = (value: string) => {
    setSearch(value.trim());
  };

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`favorite_member`} />
      <main>
        <HeaderSignIn
          search
          title={t`favorite_member`}
          onClickBack={handleBack}
          searchPlaceHoder={t`search-member-id`}
          handleSearch={handleSearch}
        />
        <PageLayout className="md:mx-auto md:w-1216 mb-24 sm:mb-8 mt-[15px] md:mt-6 flex">
          <div className="flex md:mt-6 w-full">
            <div className="col-span-2 hidden md:block">
              <LeftNavinationReport />
            </div>
            <div className="md:pl-20 flex-grow">
              <FavoriteMember searchId={search} />
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
