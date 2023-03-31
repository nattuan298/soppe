import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { HeaderSignIn, PageLayout } from "src/components";
import { PointTopup } from "src/modules/scm-pont-topup/point-topup";
import { getCookieFromReq } from "src/utils";
import { GetServerSideProps } from "next";
import { routeAccountBase } from "src/constants/routes";
import { useRouter } from "next/router";

export default function SCMPoint() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleBack = () => {
    router.push(routeAccountBase);
  };
  return (
    <div className="w-full">
      <NextSeo title={t`scm_point_topup`} />
      <main>
        <HeaderSignIn title={t`scm_point_topup`} onClickBack={handleBack} />
        <PageLayout>
          <PointTopup />
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
