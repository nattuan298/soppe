import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { HeaderSignIn, PageLayout } from "src/components";
import { routeSigninMemberId } from "src/constants/routes";
import { resetSignin } from "src/feature/signin/sign-in-slice";
import { SignIn2FA } from "src/modules/auth";

export default function SigninPhoneNumberPage() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();
  const handleBack = () => {
    dispatch(resetSignin());
    router.push(routeSigninMemberId);
  };
  return (
    <div className="w-full">
      <NextSeo title={t`signin`} />
      <main>
        <HeaderSignIn title={t`signin`} onClickBack={handleBack} />
        <PageLayout>
          <SignIn2FA />
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
