import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { HeaderSignIn, PageLayout } from "src/components";
import { routeMyOrderBase } from "src/constants/routes";
import { ReviewProduct } from "src/modules/review-product";
import { getCookieFromReq } from "src/utils";

export default function ReviewProductPage() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleBack = () => {
    router.push(routeMyOrderBase);
  };
  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`productReview`} />
      <main>
        <HeaderSignIn title={t`productReview`} onClickBack={handleBack} />
        <PageLayout>
          <ReviewProduct />
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
