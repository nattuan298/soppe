import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { HeaderSignIn, PageLayout } from "src/components";
import { clickBack, handleChangeField } from "src/feature/signup/slice";
import { SignUpForm } from "src/modules/auth";
import { RootState } from "src/state/store";
import { routeHomeUrl } from "src/constants/routes";
import { useEffect } from "react";
import { fetchGetSponserInfo } from "src/feature/signup/action";
import { GetServerSideProps } from "next";
import { getCookieFromReq } from "src/utils";

export default function SignupPage() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();
  const { mainStep, showOtpPage } = useSelector((state: RootState) => state.signup);

  const { sponsorId, memberType, side } = router.query;

  useEffect(() => {
    if (sponsorId && typeof sponsorId === "string") {
      dispatch(fetchGetSponserInfo(sponsorId));
    }
  }, [dispatch, sponsorId]);

  useEffect(() => {
    if (memberType && memberType === "2") {
      dispatch(handleChangeField({ memberType }));
    }
    if (side && typeof side === "string") {
      dispatch(handleChangeField({ side }));
    }
  }, [dispatch, memberType, side]);

  const backStep = () => {
    if (mainStep === 0 && !showOtpPage) {
      return router.back();
    }
    if (mainStep === 6) {
      return router.push(routeHomeUrl);
    }
    dispatch(clickBack());
  };

  return (
    <div className="w-full text-black-dark" id="signup-screen">
      <NextSeo title={t`signup`} />
      <main>
        <HeaderSignIn
          title={t`sign-up` + (mainStep === 5 ? " > " + t`checkout` : "")}
          onClickBack={backStep}
          hidden={mainStep === 7}
        />
        <PageLayout>
          <SignUpForm />
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
  if (token) {
    return {
      redirect: {
        permanent: true,
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
};
