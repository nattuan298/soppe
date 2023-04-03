/* eslint-disable react-hooks/exhaustive-deps */
import useTranslation from "next-translate/useTranslation";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
} from "src/components";
import Input from "src/components/input/input";
import { useFormInput } from "src/hooks/use-form-input-sign-in";
import classnames from "classnames";
import { useRouter } from "next/router";
import { Cookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { SigninType, resetSignin } from "src/feature/signin/sign-in-slice";
import { routeForgotPassUrl, routeSignin2faBase, routeSigninPhoneNumber, routeSignupUrl } from "src/constants/routes";
import { notifyToast } from "src/constants/toast";
import styles from "./styles.module.css";
import useLoggedIn from "src/hooks/useLoggedIn";
import { setCookie } from "src/lib/cookie";
import { getOSType, removeToken, updateToken } from "src/lib/common.lib";
import { fetchSigninFacebook, signinAction } from "src/feature/signin/sign-in.actions";
import { forgotAction } from "../../../../feature/forgot-password/forgot-password.action";
import { ForgotType, handleChangeField, resetForgot } from "../../../../feature/forgot-password/forgot-password.slice";



const cookies = new Cookies();
type forgotType = {
  username: string,
  email: string,
};

const Input_styles =
  "form-input pl-3 h-[50px] sm:h-12 w-fit sm:w-21.5 ring-customer rounded placeholder-lightestGray text-sm sm:text-base";

export function ForgotPassWordForm() {
  const router = useRouter();
  const [state, setState] = useState<forgotType>({
    username: "",
    email: "",
  });
  const [errors, setErrors] = useState<Partial<forgotType>>({});
  const { isLoggedIn } = useLoggedIn();
  const { t } = useTranslation("common");

  const dispatch = useDispatch();
  const errorMessage = useSelector(
    (state:{forgotPassword: ForgotType}) => state.forgotPassword.errrorMessage,
  );
  const status = useSelector((state:{forgotPassword: ForgotType}) => state.forgotPassword.status);
  const payload = useSelector((state: { signin: SigninType }) => state.signin.payload);
  const loadingSendEmail = useSelector((state: {forgotPassword: ForgotType}) => state.forgotPassword.loadingSendEmail);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);



  const handleValidate = () => {
    const regex = new RegExp(/^([^@\s\."'<>\(\)\[\]\{\}\\/,:;]+\.)*[^@\s\."'<>\(\)\[\]\{\}\\/,:;]+@[^@\s\._"'<>\(\)\[\]\{\}\\/,:;]+(\.[^@\s\."'<>\(\)\[\]\{\}\\/,:;]+)+$/gm);
    if (state.email === "" && state.username === "") {
      return false;
    }
    if (!regex.test(state.email)) {
      setErrors({ ...errors, email: "Email invalidate" });
      return false;
    }

    return true;
  };



  useEffect(() => {
    if (status === "success") {
      notifyToast("default", "sended code in your email!");
      dispatch(resetForgot());

    } else if (status === "failed") {

      if (payload.statusCode === 400) {
        // password.handleChangeError("Bad Request");
      }
      if (payload.statusCode === 500) {
        notifyToast("error", "Something went wrong .Try to refresh this page");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, payload]);
  const handleChange = (name: keyof forgotType) => (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(handleChangeField({ errrorMessage: "" }));
    setState({ ...state, [name]: e.target.value });
    if (name === "email") {
      setErrors({ ...errors, email: "" });
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    handleValidate();
    const resultValidation = handleValidate();
    if (resultValidation) {
      dispatch(forgotAction(state));
    }
  };

  return (
    <div>
      <div className="block">
        <div className="mx-auto w-auto sm:w-1216 relative flex justify-center py-12">
          <div className=" bg-white w-auto sm:w-signIn h-auto sm:shadow-full sm:p-paddingLogin">
            <div>
              <div className="text-select-method text-center font-kanit font-Regular ">Enter the information below</div>
              <div className="form-login-member-id-container">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="username">
                      <p className="mb-1.5 text-sm">{t`username`}</p>
                    </label>
                    <div className="relative">
                      <Input
                        maxLength={255}
                        placeholder="Username"
                        id="username"
                        onChange={handleChange("username")}
                        type="text"
                        className={classnames(Input_styles, {
                          "!ring-error": errors.username,
                        })}
                        value={state.username}
                        errorMessage={errors.username ? errors.username : ""}
                      />
                    </div>
                  </div>
                  <div className="mb-2.5">
                    <label htmlFor="email">
                      <p className="mb-1.5 text-sm">{t`email`}</p>
                    </label>
                    <div className="relative">
                      <Input
                        maxLength={255}
                        placeholder={t`email`}
                        id="email"
                        type="text"
                        onChange={handleChange("email")}
                        className={classnames(Input_styles, `${styles.inputPassword}`, {
                          "!ring-error": errors.email,
                        })}
                        value={state.email}
                      />
                    </div>
                    <div className="errorMessage text-sm">
                      {errors.email ? errors.email : ""}
                    </div>
                    <div className="errorMessage text-sm">{errorMessage}</div>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      loadingSize={30}
                      colorClass="text-white"
                      className="bg-orange hover:bg-lighterOrange focus:ring-0 h-12 w-full sm:w-21.5 rounded-md mb-6 text-white font-bold text-base"
                      loading={loadingSendEmail}
                    >
                      Send
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
