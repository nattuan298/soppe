import { useCallback, useEffect } from "react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

import { GoogleAuthentication, HeaderSignIn, LeftNavination, PageLayout } from "src/components";
import { getCookieFromReq } from "src/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  setHidenContent,
  turnOffSecurityGoogle,
  turnOnSecurityGoogle,
} from "src/feature/security/security.slice";
import { fetchGenerateSecurity2FA, fetchSecurityState } from "src/feature/security/security.action";
import { RootState } from "src/state/store";
import { ModalUserSummaryInfo } from "src/components/user-summary";
import useGetScreenWidth from "src/hooks/useGetScreenWidth";

export default function SecurityPage() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSecurityState());
  }, [dispatch]);

  const { securityState, loading, isHidenContent } = useSelector(
    (state: RootState) => state.security,
  );

  const generateSecurity = useCallback(() => dispatch(fetchGenerateSecurity2FA()), [dispatch]);

  const setIsHidenContent = useCallback(
    (value: boolean) => dispatch(setHidenContent(value)),
    [dispatch],
  );

  const handleBack = () => {
    if (isHidenContent) {
      router.push("/my-account");
    } else {
      setIsHidenContent(true);
    }
  };

  const handleTurnOn2FA = useCallback(
    async (authenticationCode: string) => {
      try {
        const response = await turnOnSecurityGoogle(authenticationCode);
        if (response.status === 200) {
          dispatch(fetchSecurityState());
        }
        return null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        const message = e.response?.data?.message || "";
        return message;
      }
    },
    [dispatch],
  );

  const handleTurnOff2FA = useCallback(
    async (authenticationCode: string) => {
      try {
        const response = await turnOffSecurityGoogle(authenticationCode);
        if (response.status === 204) {
          dispatch(fetchSecurityState());
        }
        return null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        const message = e.response?.data?.message || "";
        return message;
      }
    },
    [dispatch],
  );
  const width = useGetScreenWidth();

  return (
    <div className="md:w-full text-black-dark ">
      <NextSeo title={t`security`} />
      <main>
        <HeaderSignIn title={t`security`} onClickBack={handleBack} />
        <PageLayout className="mx-auto md:w-1216 px-4 md:px-0 mb-8 mt-6 md:flex relative min-h-[591px] sm:min-h-0">
          <div className="w-1/4 mr-6 hidden md:block">
            <LeftNavination />
          </div>
          {width !== "Mobile" && <ModalUserSummaryInfo />}{" "}
          <div className={`md:w-3/4 md:flex mt-4 md:mt-0 ${loading ? "hidden" : ""}`}>
            <div className="md:w-3/4">
              <div className="md:flex">
                <GoogleAuthentication
                  isHidenContent={isHidenContent}
                  setIsHidenContent={setIsHidenContent}
                  securityState={securityState}
                  generateSecurity={generateSecurity}
                  handleTurnOn2FA={handleTurnOn2FA}
                  handleTurnOff2FA={handleTurnOff2FA}
                />
              </div>
            </div>
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
        permanent: false,
        destination: "/signin",
      },
    };
  }

  return {
    props: {},
  };
};
