import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { HeaderSignIn, PageLayout } from "src/components";
import { routeSettingsBase } from "src/constants/routes";
import { SettingsEdit } from "src/modules/settings/settings-edit";
import { getCookieFromReq } from "src/utils";

export default function NoteList() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleBack = () => {
    router.push(routeSettingsBase);
  };
  return (
    <div className="w-full">
      <NextSeo title={t`settings`} />
      <main>
        <HeaderSignIn title={t`settings`} onClickBack={handleBack} />
        <PageLayout className="min-h-[591px] sm:min-h-0">
          <SettingsEdit />
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
