/* eslint-disable react-hooks/exhaustive-deps */
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { Button, Facebook, LogoMember, PhoneIcon } from "src/components";
import { ImageDelivery } from "src/components/image-delivery";
import {
  routeHomeBase,
  routeSigninMemberId,
  routeSigninPhoneNumberUrl,
  routeSignupUrl,
} from "src/constants/routes";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SigninType, resetOrder } from "src/feature/signin/sign-in-facebook-slice";
import { fetchSigninFacebook } from "src/feature/signin/sign-in.actions";
import { useRouter } from "next/router";
import { Cookies } from "react-cookie";
import { notifyToast } from "src/constants/toast";
import { browserConfig } from "src/constants/browser-config";
import ReactFacebookLogin from "react-facebook-login-typed";
import { resetSignin } from "src/feature/signin/sign-in-slice";
import { CircularProgress } from "@material-ui/core";
import useLoggedIn from "src/hooks/useLoggedIn";
import { getOSType, removeToken, updateToken } from "src/lib/common.lib";

export function SignInForm() {
  const cookies = new Cookies();
  const { isLoggedIn } = useLoggedIn();
  const { t } = useTranslation("common");
  const [OSName, setOSName] = useState("Unknown OS");
  const inputEl = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState({
    id: false,
    phoneNumber: false,
  });
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);
  useEffect(() => {
    dispatch(resetSignin());
  }, []);
  useEffect(() => {
    setOSName(getOSType());
  }, []);
  const clickLoginFacebook = () => {
    inputEl.current?.click();
  };
  const handleClick = (name: "id" | "phoneNumber") => {
    if (name === "id") {
      setLoading({ ...loading, id: true });
      router.push(routeSigninMemberId);
    }
    if (name === "phoneNumber") {
      setLoading({ ...loading, phoneNumber: true });
      router.push(routeSigninPhoneNumberUrl);
    }
  };
  const { status, payload, errorMessage } = useSelector(
    (state: { signinFacebook: SigninType }) => state.signinFacebook,
  );

  useEffect(() => {
    if (status === "success") {
      const { accessToken, refreshToken, ...member } = payload.data;
      if (accessToken) {
        updateToken(token, refreshToken);
      }
      cookies.set("member", member);
      router.push("/");
    } else if (status === "failed") {
      if (errorMessage) {
        notifyToast("error", `${errorMessage}`);
        dispatch(resetOrder());
      }
    }
  }, [payload, errorMessage, router, status, t, dispatch]);
  const responseFacebook = async (response: { accessToken: string }) => {
    setToken(response.accessToken);
  };

  useEffect(() => {
    if (token !== "") {
      dispatch(fetchSigninFacebook({ accessToken: token, OSName }));
    }
  }, [OSName, dispatch, token]);

  return (
    <div>
      <div className="block min-h-[40rem] sm:min-h-62.5">
        <div className="mx-auto w-auto sm:w-1216 relative">
          <ImageDelivery />

          <div className="relative sm:absolute top-7 sm:top-[76px] sm:left-[50px] rounded-0.625 bg-white w-[355px] mx-auto sm:w-signIn h-auto sm:z-0 z-10 shadow-full p-paddingLogin">
            <div className="text-xl mb-16 font-medium">{t`sign-in`}</div>
            <div className="text-center">
              <div className="text-select-method">{t`select-signin-method`}</div>
              <div>
                <Button
                  onClick={() => handleClick("id")}
                  className="button-login hover:bg-whiteHover mb-5 w-[280px] sm:w-23.5 "
                >
                  {loading.id ? (
                    <div className="m-auto">
                      <CircularProgress size={30} />
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <div>{t`with-member-id`}</div>
                    </div>
                  )}
                </Button>
                {/*  */}
                <div className="hidden" id="facebook">
                  <ReactFacebookLogin
                    appId={browserConfig.appID}
                    autoLoad={false}
                    fields="first_name, last_name ,email, picture"
                    callback={responseFacebook}
                    render={(renderProps) => (
                      <button ref={inputEl} onClick={renderProps.onClick}>
                        Custom FB Button
                      </button>
                    )}
                    disableMobileRedirect={true}
                    onFailure={(responseGoogle) => {
                      if (responseGoogle.status === "unknown") {
                        removeToken();
                        dispatch(resetSignin());
                      }
                    }}
                  />
                </div>
                <div className="relative h-9">
                  <div className="border h-0.316 bg-lighterGray"></div>
                  <div className="class-or-text absolute w-9 h-9 bg-white text-lighterGray text-center">
                    {t`or`}
                  </div>
                </div>
                <Link href={routeHomeBase}>
                  <div className="text-lighterGray mb-5 cursor-pointer">{t`skip-for-now`}</div>
                </Link>
                <div className="flex justify-center">
                  {t`dont-have-an-account`}
                  <Link href={routeSignupUrl}>
                    <p className="text-orange cursor-pointer">&nbsp; {t`sign-up`}</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
