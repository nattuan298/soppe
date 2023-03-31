import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { PageLayout } from "src/components";
import { TopBarBack } from "src/components/topBarBack";
import { SignInPhoneNumberForm } from "src/modules/auth/components/sign-in-phone-number";
import { routeSigninBase } from "../../constants/routes";

export default function SigninPhoneNumberPage() {
  const { t } = useTranslation("common");

  return (
    <div className="w-full">
      <NextSeo title={t`signin`} />
      <main>
        <TopBarBack url={routeSigninBase} />
        <PageLayout>
          <SignInPhoneNumberForm />
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
