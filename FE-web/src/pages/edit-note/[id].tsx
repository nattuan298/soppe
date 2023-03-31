import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { HeaderSignIn, PageLayout } from "src/components";
import { routeNotesBase } from "src/constants/routes";
import { NoteFormModule } from "src/modules/notes/notes-form";
import { getCookieFromReq } from "src/utils";

export default function ConfirmSCMPoint() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleBack = () => {
    router.push(routeNotesBase);
  };
  return (
    <div className="w-full">
      <NextSeo title={t`edit_note`} />
      <main>
        <HeaderSignIn title={t`edit_note`} onClickBack={handleBack} />
        <PageLayout>
          <NoteFormModule mode="edit" />
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
