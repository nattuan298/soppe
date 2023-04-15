import useTranslation from "next-translate/useTranslation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FormHelperText } from "@material-ui/core";
import { Button } from "src/components";
import { ImageDelivery } from "src/components/image-delivery";
import { useRouter } from "next/router";
import { Cookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { SigninType } from "src/feature/signin/sign-in-slice";
import { fetchSignin2FA } from "src/feature/signin/sign-in.actions";
import InputOnlyNumber from "src/components/input/only-number";
import styles from "./style.module.css";
import useLoggedIn from "src/hooks/useLoggedIn";
import Link from "next/link";
import { getOSType, updateToken } from "src/lib/common.lib";
const cookies = new Cookies();

export function SignIn2FA() {
  const { isLoggedIn } = useLoggedIn();
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const [OSName, setOSName] = useState("Unknown OS");
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const status2fa = useSelector((state: { signin: SigninType }) => state.signin.status2fa);
  const payload = useSelector((state: { signin: SigninType }) => state.signin.payload);
  const router = useRouter();
  useEffect(() => {
    setOSName(getOSType());
  }, []);
  const handleValidate = () => {
    if (code === "") {
      setError("required_fields");
      setLoading(false);
      return false;
    }
    return true;
  };
  const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    setError("");
    setErrorMessage("");
  };
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (status2fa === "success") {
      setLoading(false);
      const { accessToken, refreshToken, ...member } = payload.data;
      if (accessToken) {
        updateToken(accessToken, refreshToken);
      }
      cookies.remove("jwtToken");
      cookies.set("member", member);
      router.push("/");
    } else if (status2fa === "failed") {
      setLoading(false);
      if (payload.statusCode === 400) {
        setErrorMessage(payload.message);
      }
    }
  }, [status2fa, payload, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    setLoading(true);
    e.preventDefault();
    handleValidate();
    const resultValidation = handleValidate();
    if (resultValidation) {
      dispatch(fetchSignin2FA({ code, OSName }));
    }
  };

  return (
    <div>
      <div className="block min-h-[647px] sm:min-h-62.5">
        <div className="mx-auto  w-auto sm:w-1216 relative">
          <div className="hidden sm:block">
            <ImageDelivery />
          </div>
          <div className="form-position sm:absolute rounded-0.625 bg-white w-auto sm:w-signIn h-auto sm:shadow-full sm:p-paddingLogin">
            <div className="text-xl mb-16 font-medium hidden sm:block">{t`sign-in`}</div>
            <div>
              <div className="text-select-method text-center font-kanit font-Regular font-">{t`signin-to-your-account`}</div>
              <div className="form-login-member-id-container">
                <form onSubmit={handleSubmit}>
                  <div className="mb-2.5">
                    <label htmlFor="username">
                      <p className="mb-1.5 text-sm">{t`google_verification`}</p>
                    </label>
                    <div className="relative">
                      <InputOnlyNumber
                        placeholder={t`6_digits_google_verification_code`}
                        maxlegth={6}
                        onChange={handleChangeCode}
                        value={code}
                        helperText={error}
                        error={!!error}
                        t={t}
                      />
                      {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
                    </div>
                  </div>
                  <div className="mb-5">
                    <Link href={""}>
                      <a
                        target={"_blank"}
                        className={`${styles.unavailable_code} cursor-pointer hover:underline hover:text-orange`}
                      >{t`security-code-unavailable`}</a>
                    </Link>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      loadingSize={30}
                      colorClass="text-white"
                      className="bg-orange hover:bg-lighterOrange focus:ring-0 h-12 w-21.5 rounded-md mb-6 text-white font-bold text-base"
                      loading={loading}
                    >
                      {t`submit`}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
