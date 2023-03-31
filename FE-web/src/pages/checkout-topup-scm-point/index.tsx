import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { HeaderSignIn, PageLayout } from "src/components";
import { resetOrder } from "src/feature/scm-point-topup/slice";
import { CheckoutPointTopup } from "src/modules/scm-pont-topup/checkout-1";
import { useDispatch } from "react-redux";
import { getCookieFromReq } from "src/utils";
import { GetServerSideProps } from "next";
import { routePointTopupBase } from "src/constants/routes";

export default function CheckoutSCMPoint() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();
  const handleBack = async () => {
    dispatch(resetOrder());
    router.push(routePointTopupBase);
  };
  return (
    <div className="w-full">
      <NextSeo title={t`checkout`} />
      <main>
        <HeaderSignIn title={t`checkout`} onClickBack={handleBack} />
        <PageLayout>
          <CheckoutPointTopup />
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
