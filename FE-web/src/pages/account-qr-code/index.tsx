import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { HeaderSignIn, PageLayout } from "src/components";
import { routeMyAccountBase } from "src/constants/routes";
import { AccountQRCode } from "src/modules/account-qr-code";
import { getCookieFromReq } from "src/utils";

export default function AccountQRCodePage() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleBack = () => {
    router.push(routeMyAccountBase);
  };
  return (
    <div className="w-full text-black-dark">
      <NextSeo title={t`profile-qr-code`} />
      <main>
        <HeaderSignIn title={t`profile-qr-code`} onClickBack={handleBack} />
        <PageLayout>
          <div className="">
            <AccountQRCode />
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
