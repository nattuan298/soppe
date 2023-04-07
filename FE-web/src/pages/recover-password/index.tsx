import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { HeaderSignIn, PageLayout } from "src/components";

import { routeSigninUrl } from "../../constants/routes";
import { useRouter } from "next/router";
import { ForgotPassWordForm } from "../../modules/auth/components/forgot-password";
import { RecoverPassWordForm } from "../../modules/auth/components/recover-password";


export default function RecoverPage() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleBack = () => {
    router.push(routeSigninUrl);
  };
  return (
    <div className="w-full">
      <NextSeo title="Recover password" />
      <main>
        <HeaderSignIn
          title="Recover password"
          onClickBack={handleBack}
        />
        <PageLayout>
          <RecoverPassWordForm />
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
