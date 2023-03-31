import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { HeaderSignIn, PageLayout } from "src/components";
import { FavoriteProduct } from "src/modules/favorite-product";
import { getCookieFromReq } from "src/utils";
import { routeAccountBase } from "src/constants/routes";

export default function FavoriteProductPage() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleBack = () => {
    router.push(routeAccountBase);
  };
  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`favorite-product-list`} />
      <main>
        <HeaderSignIn title={t`favorite-product-list`} onClickBack={handleBack} />
        <PageLayout>
          <FavoriteProduct />
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
