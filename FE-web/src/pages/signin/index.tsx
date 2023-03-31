import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { PageLayout } from "src/components";
import { TopBarBack } from "src/components/topBarBack";
import { SignInForm } from "src/modules/auth/components/sign-in/sign-in-form";

export default function SigninPag() {
  const { t } = useTranslation("common");

  return (
    <div className="w-full">
      <NextSeo title={t`signin`} />
      <main>
        <TopBarBack url="/" />
        <PageLayout>
          <SignInForm />
        </PageLayout>
      </main>
    </div>
  );
}
export async function getServerSideProps() {
  return {
    props: {},
  };
}
