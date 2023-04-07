/* eslint-disable react-hooks/exhaustive-deps */
import useTranslation from "next-translate/useTranslation";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
} from "src/components";
import Input from "src/components/input/input";
import classnames from "classnames";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { SigninType, resetSignin } from "src/feature/signin/sign-in-slice";
import { notifyToast } from "src/constants/toast";
import styles from "./styles.module.css";
import useLoggedIn from "src/hooks/useLoggedIn";
import { ForgotType, handleChangeField, resetForgot } from "../../../../feature/forgot-password/forgot-password.slice";
import { RecoverAction } from "../../../../feature/forgot-password/forgot-password.action";
import { routeSigninMemberId } from "../../../../constants/routes";


type forgotType = {
  code: string,
  newPassword: string,
};

const Input_styles = "form-input pl-3 h-[50px] sm:h-12 w-fit sm:w-21.5 ring-customer rounded placeholder-lightestGray text-sm sm:text-base";

export function RecoverPassWordForm() {
  const router = useRouter();
  const [state, setState] = useState<forgotType>({
    code: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState<Partial<forgotType>>({});
  const { isLoggedIn } = useLoggedIn();
  const { t } = useTranslation("common");

  const dispatch = useDispatch();
  const errrorMessageCode = useSelector(
    (state:{forgotPassword: ForgotType}) => state.forgotPassword.errrorMessageCode,
  );
  const status = useSelector((state:{forgotPassword: ForgotType}) => state.forgotPassword.statusSendCode);
  const payload = useSelector((state: { signin: SigninType }) => state.signin.payload);
  const loadingSendEmail = useSelector((state: {forgotPassword: ForgotType}) => state.forgotPassword.loadingSendCode);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  const handleValidate = () => {
    if (state.code === "" && state.newPassword === "") {
      return false;
    }
    return true;
  };
  console.log(status);
  useEffect(() => {
    if (status === "success") {
      notifyToast("default", "change password successfully!");
      dispatch(resetForgot());
      router.push(routeSigninMemberId);

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
    if (name === "code") {
      if (e.target.value.length > 6) return;
    }
    dispatch(handleChangeField({ errrorMessage: "" }));
    setState({ ...state, [name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    handleValidate();
    const resultValidation = handleValidate();
    if (resultValidation) {
      dispatch(RecoverAction(state));
    }
  };

  return (

    <div className="block">
      <div className="mx-auto w-auto sm:w-1216 relative flex justify-center py-12">
        <div className=" bg-white w-auto sm:w-signIn h-auto sm:shadow-full sm:p-paddingLogin">
          <div className="form-login-member-id-container">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="code">
                  <p className="mb-1.5 text-sm">Code</p>
                </label>
                <div className="relative">
                  <Input
                    maxLength={6}
                    placeholder="Enter code"
                    id="code"
                    onChange={handleChange("code")}
                    type="number"
                    className={classnames(Input_styles, {
                      "!ring-error": errors.code,
                    })}
                    value={state.code}
                    errorMessage={errors.code ? errors.code : ""}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword">
                  <p className="mb-1.5 text-sm">New Password</p>
                </label>
                <div className="relative">
                  <Input
                    maxLength={255}
                    placeholder="New Password"
                    id="newPassword"
                    type="text"
                    onChange={handleChange("newPassword")}
                    className={classnames(Input_styles, `${styles.inputPassword}`, {
                      "!ring-error": errors.newPassword,
                    })}
                    value={state.newPassword}
                  />
                </div>
                <div className="errorMessage text-sm">
                  {errors.newPassword ? errors.newPassword : ""}
                </div>
                <div className="errorMessage text-sm">{errrorMessageCode}</div>
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
  );
}
