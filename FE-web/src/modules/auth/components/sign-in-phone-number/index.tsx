import { ImageDelivery } from "src/components/image-delivery";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { Button, Facebook, LogoMember } from "src/components";
import { SignInPhoneNumber } from "./phone-number";
import Otp from "./otp";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/state/store";
import ReactFacebookLogin from "react-facebook-login-typed";
import { routeSigninMemberId, routeSignupBase } from "src/constants/routes";
import { browserConfig } from "src/constants/browser-config";
import { useCallback, useEffect, useRef, useState } from "react";
import { actionResetState, resetOrder } from "src/feature/signin/sign-in-facebook-slice";
import { fetchSigninFacebook } from "src/feature/signin/sign-in.actions";
import { SigninType, resetSignin } from "src/feature/signin/sign-in-slice";
import { useRouter } from "next/router";
import { notifyToast } from "src/constants/toast";
import { setCookie } from "src/lib/cookie";
import { getOSType, removeToken, updateToken } from "src/lib/common.lib";

export function SignInPhoneNumberForm() {
  const { t } = useTranslation("common");
  const [OSName, setOSName] = useState("Unknown OS");
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const router = useRouter();
  const inputEl = useRef<HTMLButtonElement>(null);

  const clickLoginFacebook = () => {
    inputEl.current?.click();
  };
  useEffect(() => {
    setOSName(getOSType());
  }, []);

  const { status, payload, errorMessage } = useSelector(
    (state: { signinFacebook: SigninType }) => state.signinFacebook,
  );

  const resaveCookie = useCallback(
    async (name: string, payload: string | number | object) => {
      try {
        await setCookie(name, payload);
        router.push("/");
      } catch (error) {}
    },
    [router],
  );

  useEffect(() => {
    const clearState = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const isReset = (await dispatch(actionResetState())) as {
        type?: string;
      };
    };
    return () => {
      clearState();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === "success") {
      const { accessToken, refreshToken, ...member } = payload.data;
      if (accessToken) {
        updateToken(accessToken, refreshToken);
      }
      resaveCookie("member", member);
    } else if (status === "failed") {
      if (errorMessage) {
        notifyToast("error", `${errorMessage}`);
        dispatch(resetOrder());
      }
    }
  }, [payload, errorMessage, router, status, t, dispatch, resaveCookie]);

  useEffect(() => {
    if (token !== "") {
      dispatch(fetchSigninFacebook({ accessToken: token, OSName }));
    }
  }, [token, dispatch, OSName]);
  const responseFacebook = async (response: { accessToken: string }) => {
    setToken(response.accessToken);
  };

  const showOtpPage = useSelector((state: RootState) => state.signinPhoneNumber.showOtp);

  return (
    <div>
      <div className="block min-h-[647px] sm:min-h-62.5">
        <div className="mx-auto w-auto sm:w-1216 relative">
          <div className="hidden sm:block">
            <ImageDelivery />
          </div>
          <div className="form-position sm:absolute bg-white sm:w-signIn h-auto sm:shadow-full sm:p-paddingLogin">
            <div className="text-xl mb-16 font-medium hidden sm:block">{t`sign-in`}</div>
            <div>
              <div className="text-select-method text-center font-kanit font-Regular font-">{t`signin-to-your-account`}</div>
              <div className="form-login-member-id-container">
                {!showOtpPage && <SignInPhoneNumber />}
                {showOtpPage && <Otp />}
                <div className="link-to-signup flex justify-center text-lighterGray text-[13px] sm:text-base">
                  {t`dont-have-an-account`}
                  <Link href={routeSignupBase}>
                    <p className="text-orange cursor-pointer">&nbsp; {t`sign-up`}</p>
                  </Link>
                </div>
                <div className="relative h-9">
                  <div className="border h-0.316 w-4/5 mx-auto bg-lighterGray"></div>
                  <div className="class-or-text absolute w-9 h-9 bg-white text-lighterGray text-center text-[13px] sm:text-base">
                    {t`or`}
                  </div>
                </div>
                <div className="flex justify-center">
                  <div>
                    <Button
                      onClick={clickLoginFacebook}
                      className="button-login-other focus:ring-0 bg-white hover:bg-whiteHover shadow-full mr-5"
                    >
                      <Facebook className="mx-auto" />
                      <p className="hidden">facebook</p>
                    </Button>
                  </div>
                  <div className="hidden" id="facebook">
                    <ReactFacebookLogin
                      appId={browserConfig.appID}
                      autoLoad={false}
                      fields="name,email,picture"
                      callback={responseFacebook}
                      disableMobileRedirect={true}
                      render={(renderProps) => (
                        <button ref={inputEl} onClick={renderProps.onClick}>
                          Custom FB Button
                        </button>
                      )}
                      onFailure={(responseGoogle) => {
                        if (responseGoogle.status === "unknown") {
                          removeToken();
                          dispatch(resetSignin());
                        }
                      }}
                    />
                  </div>
                  <div>
                    <Link href={routeSigninMemberId}>
                      <Button className="button-login-other focus:ring-0 bg-white hover:bg-whiteHover shadow-full">
                        <LogoMember className="mx-auto" />
                        <p className="hidden">memberId</p>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
