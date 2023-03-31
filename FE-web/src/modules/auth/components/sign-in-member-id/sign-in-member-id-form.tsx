/* eslint-disable react-hooks/exhaustive-deps */
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Facebook,
  MemberIdIcon,
  PasswordIcon,
  PhoneIcon,
  UnVisibilityEye,
} from "src/components";
import { ImageDelivery } from "src/components/image-delivery";
import Input from "src/components/input/input";
import { useFormInput } from "src/hooks/use-form-input-sign-in";
import classnames from "classnames";
import { useRouter } from "next/router";
import { Cookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { SigninType, resetSignin } from "src/feature/signin/sign-in-slice";
import { routeSignin2faBase, routeSigninPhoneNumber, routeSignupUrl } from "src/constants/routes";
import { notifyToast } from "src/constants/toast";
import ReactFacebookLogin from "react-facebook-login-typed";
import { browserConfig } from "src/constants/browser-config";
import { resetOrder } from "src/feature/signin/sign-in-facebook-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.css";
import useLoggedIn from "src/hooks/useLoggedIn";
import { setCookie } from "src/lib/cookie";
import { getOSType, removeToken, updateToken } from "src/lib/common.lib";
import { fetchSigninFacebook, signinAction } from "src/feature/signin/sign-in.actions";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const cookies = new Cookies();
interface props {
  openModal: Function;
}

const Input_styles =
  "form-input pl-14 h-[50px] sm:h-12 w-fit sm:w-21.5 ring-customer rounded placeholder-lightestGray text-sm sm:text-base";

export function SignInMemberIdForm(props: props) {
  const router = useRouter();
  const { openModal } = props;
  const [OSName, setOSName] = useState("Unknown OS");
  const userID = useFormInput("");
  const password = useFormInput("");
  const { isLoggedIn } = useLoggedIn();
  const { t } = useTranslation("common");
  const [toggle, setToggle] = useState("password");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const inputEl = useRef<HTMLButtonElement>(null);
  const [token, setToken] = useState("");
  const { errorMessage } = useSelector(
    (state: { signinFacebook: SigninType }) => state.signinFacebook,
  );
  const status = useSelector((state: { signin: SigninType }) => state.signin.status);
  const payload = useSelector((state: { signin: SigninType }) => state.signin.payload);
  const statusfb = useSelector(
    (state: { signinFacebook: SigninType }) => state.signinFacebook.status,
  );
  const payloadfb = useSelector(
    (state: { signinFacebook: SigninType }) => state.signinFacebook.payload,
  );
  const [errorApi, setErrorApi] = useState<string>("");

  const clickLoginFacebook = () => {
    inputEl.current?.click();
  };
  useEffect(() => {
    setOSName(getOSType());
  }, []);
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);
  useEffect(() => {
    if (statusfb === "success") {
      const { accessToken, refreshToken, ...member } = payloadfb.data;
      if (accessToken) {
        updateToken(accessToken, refreshToken);
      }
      cookies.set("member", member);
      router.push("/");
    } else if (statusfb === "failed") {
      if (errorMessage) {
        notifyToast("error", `${errorMessage}`);
        dispatch(resetOrder());
      }
    }
  }, [payloadfb, errorMessage, router, statusfb, t, dispatch]);
  useEffect(() => {
    if (token !== "") {
      dispatch(fetchSigninFacebook({ accessToken: token, OSName }));
    }
  }, [token, dispatch, OSName]);
  const responseFacebook = async (response: { accessToken: string }) => {
    setToken(response.accessToken);
  };
  function showModal() {
    openModal();
  }
  const handleToggle = () => {
    if (toggle === "password") {
      setToggle("text");
    } else if (toggle === "text") {
      setToggle("password");
    }
  };
  const handleValidate = () => {
    if (userID.value === "" && password.value === "") {
      userID.handleChangeError("both empty");
      password.handleChangeError("both empty");
      setLoading(false);
      return false;
    }
    if (userID.value === "") {
      userID.handleChangeError("user ID empty");
      setLoading(false);
      return false;
    }
    if (password.value === "") {
      password.handleChangeError("password empty");
      setLoading(false);
      return false;
    }
    return true;
  };

  const resaveCookie = async (name: string, payload: string | number | object) => {
    await setCookie(name, payload);
    router.push("/");
  };

  useEffect(() => {
    if (status === "success") {
      setLoading(false);
      const { accessToken, refreshToken, ...member } = payload.data;
      if (accessToken && member.googleAuth) {
        cookies.set("jwtToken", accessToken);
        router.push(routeSignin2faBase);
      } else {
        if (accessToken) {
          updateToken(accessToken, refreshToken);
        }
        cookies.set("member", member);
        if (!cookies.get("member")) {
          resaveCookie("member", member);
        } else {
          router.push("/");
        }
      }
    } else if (status === "failed") {
      setLoading(false);
      if (payload.statusCode === 400) {
        userID.handleChangeError("Bad Request");
        setErrorApi(payload.message);
        // password.handleChangeError("Bad Request");
      }
      if (payload.statusCode === 500) {
        notifyToast("error", "Something went wrong .Try to refresh this page");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, payload]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    setLoading(true);
    setErrorApi("");
    e.preventDefault();
    handleValidate();
    const resultValidation = handleValidate();
    if (resultValidation) {
      dispatch(signinAction({ userID: userID.value, password: password.value, OSName }));
    }
  };

  return (
    <div>
      <div className="block min-h-[647px] sm:min-h-62.5">
        <div className="mx-auto w-auto sm:w-1216 relative">
          <div className="hidden sm:block">
            <ImageDelivery />
          </div>
          <div className="form-position sm:absolute bg-white w-auto sm:w-signIn h-auto sm:shadow-full sm:p-paddingLogin">
            <div className="text-xl mb-16 font-medium hidden sm:block">{t`sign-in`}</div>
            <div>
              <div className="text-select-method text-center font-kanit font-Regular ">{t`signin-to-your-account`}</div>
              <div className="form-login-member-id-container">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="username">
                      <p className="mb-1.5 text-sm">{t`username`}</p>
                    </label>
                    <div className="relative">
                      <Input
                        maxLength={255}
                        icon={<MemberIdIcon />}
                        placeholder={t`member_id_7_digits`}
                        id="username"
                        onChange={userID.handleChange}
                        type="text"
                        className={classnames(Input_styles, {
                          "!ring-error": userID.error.errorUserId,
                        })}
                        value={userID.value}
                        errorMessage={userID.error.errorUserId ? t(userID.error.errorUserId) : ""}
                      />
                    </div>
                  </div>
                  <div className="mb-2.5">
                    <label htmlFor="password">
                      <p className="mb-1.5 text-sm">{t`password`}</p>
                    </label>
                    <div className="relative">
                      <Input
                        maxLength={255}
                        icon={<PasswordIcon />}
                        placeholder={t`password`}
                        id="password"
                        type={toggle}
                        onChange={password.handleChange}
                        className={classnames(Input_styles, `${styles.inputPassword}`, {
                          "!ring-error": password.error.errorPassword,
                        })}
                        value={password.value.replace(/[\s]/gm, "")}
                      />
                      {toggle === "password" ? (
                        <div className="iconEye absolute" onClick={handleToggle}>
                          <UnVisibilityEye />
                        </div>
                      ) : (
                        <div className="iconEye absolute" onClick={handleToggle}>
                          <FontAwesomeIcon icon={faEye as IconProp} />
                        </div>
                      )}
                    </div>
                    <div className="errorMessage text-sm">
                      {password.error.errorPassword ? t(password.error.errorPassword) : ""}
                    </div>
                    <div className="errorMessage text-sm">
                      {password.error.errorInvalid ? t(password.error.errorInvalid) : ""}
                    </div>
                    <div className="errorMessage text-sm">{errorApi}</div>
                  </div>
                  <div
                    className="mb-4 text-lighterGray cursor-pointer w-2/4 hover:underline hover:text-orange text-[13px] sm:text-base"
                    onClick={showModal}
                  >{t`forgot-password`}</div>
                  <div>
                    <Button
                      type="submit"
                      loadingSize={30}
                      colorClass="text-white"
                      className="bg-orange hover:bg-lighterOrange focus:ring-0 h-12 w-full sm:w-21.5 rounded-md mb-6 text-white font-bold text-base"
                      loading={loading}
                    >
                      {t`sign-in`}
                    </Button>
                  </div>
                </form>
                <div className="link-to-signup flex justify-center text-lighterGray text-[13px] sm:text-base">
                  {t`dont-have-an-account`}
                  <Link href={routeSignupUrl}>
                    <p className="text-orange cursor-pointer text-[13px] sm:text-base">
                      &nbsp; {t`sign-up`}
                    </p>
                  </Link>
                </div>
                <div className="relative h-9">
                  <div className="border h-0.316  w-4/5 mx-auto bg-lighterGray"></div>
                  <div className="class-or-text absolute w-9 h-9 bg-white text-lighterGray text-center text-[13px] text-base">
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
                    {/* @ts-ignore */}
                    <ReactFacebookLogin
                      appId={browserConfig.appID}
                      autoLoad={false}
                      fields="name,email,picture"
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
                  <div>
                    <Link href={routeSigninPhoneNumber}>
                      <Button className="button-login-other focus:ring-0 bg-white hover:bg-whiteHover shadow-full">
                        <PhoneIcon className="mx-auto" />
                        <p className="hidden">phone</p>
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
