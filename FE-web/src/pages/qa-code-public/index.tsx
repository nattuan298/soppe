import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

import { HeaderSignIn, LeftNavination, PageLayout } from "src/components";
import { getCookieFromReq } from "src/utils";

import { ModalUserSummaryInfo } from "src/components/user-summary";

export default function SecurityPage() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`profile-qa-code`} />
      <main>
        <HeaderSignIn title={t`profile-qa-code`} onClickBack={handleBack} />
        <PageLayout className="mx-auto w-1216 mb-8 mt-6 flex relative">
          <div className="w-1/4 mr-6">
            <LeftNavination />
          </div>
          <ModalUserSummaryInfo />
          <div className="w-3/4 flex">
            <div className="w-3/4">
              <div className="flex justify-center">{t`Comming soon`}</div>
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
        permanent: true,
        destination: "/signin",
      },
    };
  }

  return {
    props: {},
  };
};
