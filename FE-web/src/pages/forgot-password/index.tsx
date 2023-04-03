import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { HeaderSignIn, PageLayout } from "src/components";

import { routeSigninUrl } from "../../constants/routes";
import { useRouter } from "next/router";
import { ForgotPassWordForm } from "../../modules/auth/components/forgot-password";


export default function ForgotPage() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleBack = () => {
    router.push(routeSigninUrl);
  };
  return (
    <div className="w-full">
      <NextSeo title="Forgot password" />
      <main>
        <HeaderSignIn
          title="Forgot password"
          onClickBack={handleBack}
        />
        <PageLayout>
          <ForgotPassWordForm />
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
