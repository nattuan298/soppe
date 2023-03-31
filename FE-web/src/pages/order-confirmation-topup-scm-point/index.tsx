import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { HeaderSignIn, PageLayout } from "src/components";
import { routePointTopupBase } from "src/constants/routes";
import { resetOrder } from "src/feature/scm-point-topup/slice";
import { OrderDetail } from "src/modules/scm-pont-topup/confirmation";
import { getCookieFromReq } from "src/utils";

export default function ConfirmSCMPoint() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();
  const handleBack = () => {
    dispatch(resetOrder());
    router.push(routePointTopupBase);
  };
  return (
    <div className="w-full">
      <NextSeo title={t`order_confirmation`} />
      <main>
        <HeaderSignIn title={t`order_confirmation`} onClickBack={handleBack} />
        <PageLayout>
          <OrderDetail />
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
