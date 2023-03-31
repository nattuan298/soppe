import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { HeaderSignIn, PageLayout } from "src/components";
import { routeAccountBase } from "src/constants/routes";
import { AddressBookList } from "src/modules/address-book/address-book-list";
import { getCookieFromReq } from "src/utils";

export default function ConfirmSCMPoint() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleBack = () => {
    router.push(routeAccountBase);
  };
  return (
    <div className="w-full">
      <NextSeo title={t`address_book`} />
      <main>
        <HeaderSignIn title={t`address_book`} onClickBack={handleBack} />
        <PageLayout>
          <AddressBookList />
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
