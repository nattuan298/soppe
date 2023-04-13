/* eslint-disable jsx-a11y/anchor-has-content */
import React, { FormEvent, useEffect, useState } from "react";
import { Asset, Button, InputOnlyNumber, Label } from "src/components";
// import { fakeSignin } from "src/services/authentication.services";
import { Redirect, useHistory } from "react-router-dom";
import { Navbar } from "src/components/navbar";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { routesHomeDashboard } from "src/constants/routes";
import { signinGoogleAuth } from "src/services/authentication.services";

export function SignIn2FAForm() {
  const { t } = useTranslation("common");
  const isLoggedIn = JSON.parse(localStorage.getItem("tokenGoogleVerify") || "{}").jwtAccessToken;
  const [verificationCode, setVerificationCode] = useState("");
  const [errorVerificationCode, setErrorVerificationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();
  const { authenticationDetail } = useSelector((state: RootState) => state.authentications);
  const lang = localStorage.getItem("i18nextLng");

  if (authenticationDetail.jwtAccessToken) {
    history.push(routesHomeDashboard);
  }

  useEffect(() => {
    setErrorVerificationCode("");
  }, [lang]);

  async function handleSignIn2FA(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (verificationCode === "") {
      setErrorVerificationCode(t`required_fields`);
      return;
    }
    setIsSubmitting(true);
    const response = (await signinGoogleAuth(verificationCode)) as any;
    if (response.status !== 200) {
      setErrorVerificationCode(response.data.message);
    }
    if (response.status === 200) {
      if (response.data.jwtAccessToken) {
        window.location.href = "/admin-dashboard/home";
        localStorage.removeItem("tokenGoogleVerify");
        localStorage.setItem("token", JSON.stringify(response.data));
      }
    }
    setIsSubmitting(false);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length > 6) {
      return;
    }
    setVerificationCode(event.target.value);
  }

  if (!isLoggedIn) {
    return <Redirect from="/" to="/signin" exact />;
  }
  return (
    <div className="w-full">
      <Navbar goBackLink="/signin" isAuth={true} />
      <div className="w-2/3 m-auto relative">
        <div className="w-28 mt-24 rounded-lg shadow-formSignIn border border-coolGray-100 absolute left-0 z-20 bg-white">
          <form onSubmit={handleSignIn2FA} className="pl-12 pt-7 pr-12 pb-14">
            <span className="text-black text-xl font-medium">{t`sign-in`}</span>
            <div>
              <div className="pt-4 mb-2">
                <div className="flex flex-col pt-8">
                  <Label>{t`enter-google-verification-code`}</Label>
                  <InputOnlyNumber
                    maxLength={6}
                    placeholder={t`6-digits-google-verification-code`}
                    value={verificationCode}
                    onChange={handleInputChange}
                    errorMessage={errorVerificationCode}
                  />
                </div>
                <div className="flex flex-col pt-4">
                  <span
                    className="float-left txt-forgot hover:underline hover:text-orange-light cursor-pointer"
                    onClick={() =>
                      window.open(
                        "https://scmconnext.com/help-center-3/61b184a8133b4625e0c54510",
                        "_blank",
                      )
                    }
                  >
                    {t`security-verification-code-unavailable`}?
                  </span>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-orange-light hover:bg-orange-hover mt-4 h-12 rounded-md"
                loading={isSubmitting}
                loadingSize={20}
              >
                <span className="text-white font-semibold text-base">{t`submit`}</span>
              </Button>
            </div>
          </form>
        </div>

        <Asset className="absolute right-0 mt-16" />
      </div>
    </div>
  );
}
