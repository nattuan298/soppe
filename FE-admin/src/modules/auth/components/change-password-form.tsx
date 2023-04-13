/* eslint-disable jsx-a11y/anchor-has-content */
import { useEffect, useState } from "react";
import { Asset, Button, Label, PasswordInput } from "src/components";
import { useHistory } from "react-router-dom";
import { Navbar } from "src/components/navbar";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { changePasswordSchema } from "./schema";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { ResetPassword, deleteStatus } from "src/store/reset-password/change-password.slice";
import { notifyToast } from "src/constants/toast";
import { deletejwtVerifyToken } from "src/store/reset-password/password-recovery-2.slice";
import { routeSigninBase, routesHomeDashboard } from "src/constants/routes";

interface initialValuesType {
  password: string;
  confirmPassword: string;
}

export function ChangePasswordForm() {
  const { t } = useTranslation("common");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { email } = useSelector((state: RootState) => state.emailChangePassword);
  const [initialValues] = useState<initialValuesType>({
    password: "",
    confirmPassword: "",
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const { status, loading } = useSelector((state: RootState) => state.resetPassword);

  useEffect(() => {
    if (status === "fulfilled") {
      notifyToast("default", "your-password-has-been-changed", t);
      localStorage.removeItem("verify");
      history.push("/signin");
      dispatch(deleteStatus());
      dispatch(deletejwtVerifyToken());
      localStorage.removeItem("email");
    }
  }, [status, t, history, dispatch]);

  useEffect(() => {
    if (loading === "success" || loading === "failed") {
      setIsSubmitting(false);
    }
  }, [loading]);

  useEffect(() => {
    if (!localStorage.getItem("verify")) {
      history.push(routeSigninBase);
    }
  }, [loading, history]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleChangePassword,
    validationSchema: changePasswordSchema,
  });

  function handleChangePassword(values: initialValuesType) {
    setIsSubmitting(true);
    dispatch(
      ResetPassword({ email, password: values.password, token: localStorage.getItem("verify") }),
    );
  }

  const ChangePasswordDeleteToken = () => {
    localStorage.removeItem("verify");
    dispatch(deletejwtVerifyToken());
  };

  return (
    <div className="w-full">
      <Navbar
        goBackLink="/signin"
        isAuth={true}
        ChangePasswordDeleteToken={ChangePasswordDeleteToken}
      />
      <div className="w-2/3 relative m-auto">
        <div className="w-28 mt-24 rounded-lg shadow-formSignIn border border-coolGray-100 absolute left-0 z-20 bg-white">
          <form onSubmit={formik.handleSubmit} className="pl-12 pt-7 pr-12 pb-8">
            <span className="text-black text-xl font-medium">{t`change-password`}</span>
            <div className="">
              <div className="pt-4 mb-2">
                <div className="flex flex-col pt-8">
                  <Label>{t`password`}</Label>
                  <PasswordInput
                    placeholder={t("password")}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={() => formik.setFieldValue("password", formik.values.password?.trim())}
                    errorMessage={
                      formik.touched.password && formik.errors.password
                        ? t(`${formik.errors.password as "please_fill_in_your_email"}`)
                        : ""
                    }
                  />
                </div>
                <div className="flex flex-col pt-8">
                  <Label>{t`confirm-password`}</Label>
                  <PasswordInput
                    placeholder={t("confirm-password")}
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={() =>
                      formik.setFieldValue("confirmPassword", formik.values.confirmPassword?.trim())
                    }
                    errorMessage={
                      formik.touched.confirmPassword && formik.errors.confirmPassword
                        ? t(`${formik.errors.confirmPassword as "please_fill_in_your_email"}`)
                        : ""
                    }
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-light mt-4 h-12 rounded-md hover:bg-orange-hover"
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
