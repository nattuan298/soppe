import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { HeaderSignIn, PageLayout } from "src/components";
import { Sponsor } from "src/modules/sponsor";
import { getCookieFromReq } from "src/utils";

export default function SponsorPage() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleBack = () => {
    router.push("/my-account");
  };

  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`invite_friend`} />
      <main>
        <HeaderSignIn title={t`invite_friend`} onClickBack={handleBack} iconHistory={true} />
        <PageLayout>
          <div className="">
            <Sponsor />
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
