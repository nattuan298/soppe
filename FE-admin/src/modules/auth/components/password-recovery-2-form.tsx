/* eslint-disable jsx-a11y/anchor-has-content */
import { ChangeEvent, useEffect, useState } from "react";
import { Asset, Button, Input, Label } from "src/components";
import { useHistory } from "react-router-dom";
import { Navbar } from "src/components/navbar";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { verifyOtpSchema } from "src/modules/auth/components/schema";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { deleteStatusCode } from "src/store/reset-password/password-recovery-1.slice";
import {
  fetchPostSendOPT,
  fetchPostVerifyOTP,
} from "src/store/reset-password/password-recovery.action";

import {
  routeChangePasswordBase,
  routePasswordRecovery1Base,
  routesHomeDashboard,
} from "src/constants/routes";
import { convertTimeToMinute } from "src/lib/convertTime";

type InitialValuesType = {
  email: string;
  otpCode: string;
};

export function PasswordRecovery2(props: any) {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [reSendOTP, setReSendOTP] = useState(false);
  const [countDown, setCountDown] = useState(120);
  const [initialValues, setInitialValues] = useState<InitialValuesType>({
    email: "",
    otpCode: "",
  });
  const [email, setEmail] = useState<string | null>("");

  const { status, jwtVerifyToken, message } = useSelector((state: RootState) => state.verifyOtp);
  const { authenticationDetail } = useSelector((state: RootState) => state.authentications);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmitOtp,
    validationSchema: verifyOtpSchema,
  });

  function handleSubmitOtp(values: InitialValuesType) {
    setLoading(true);
    dispatch(fetchPostVerifyOTP({ email, code: values.otpCode }));
  }

  useEffect(() => {
    if (status === "success" || status === "failed") {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (!jwtVerifyToken && message) {
      formik.setFieldError("otpCode", message);
    }
  }, [jwtVerifyToken, message]);

  if (jwtVerifyToken) {
    localStorage.setItem("verify", jwtVerifyToken);
    history.push(routeChangePasswordBase);
  }

  useEffect(() => {
    if (!localStorage.getItem("verify") && authenticationDetail.jwtAccessToken) {
      history.push(routesHomeDashboard);
    }
  }, [loading, history, authenticationDetail]);

  useEffect(() => {
    if (localStorage.getItem("email")) {
      setEmail(localStorage.getItem("email"));
    }
    if (!localStorage.getItem("email")) {
      history.push(routePasswordRecovery1Base);
    }
  }, [history]);

  useEffect(() => {
    dispatch(deleteStatusCode());
  }, [dispatch]);

  useEffect(() => {
    if (countDown > 0) {
      setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
    }
    if (countDown === 0) {
      setReSendOTP(true);
    }
  }, [countDown]);

  function handleReSendOTP() {
    setCountDown(120);
    setReSendOTP(false);
    dispatch(fetchPostSendOPT(email));
  }

  const onChangeInputOTP = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length > 6 || !/^[0-9]*$/.test(value)) {
      // formik.setFieldError("otpCode", "Invalid OPT");
      return;
    }
    formik.setFieldValue("otpCode", value);
  };

  return (
    <div className="w-full">
      <Navbar goBackLink="/password-recovery-1" isAuth={true} />
      <div className="w-2/3 m-auto relative">
        <div className="w-28 mt-24 rounded-lg shadow-formSignIn border border-coolGray-100 absolute left-0 z-20 bg-white">
          <form onSubmit={formik.handleSubmit} className="pl-12 pt-7 pr-12 pb-7">
            <span className="text-black text-xl font-medium">{t`password-recovery`}</span>
            <div className="">
              <div className="flex flex-col pt-8">
                <Label>{t`6-digits-otp-has-been-sent-to-email`}</Label>
                <span className="mb-3.5 text-base text-orange-light">{email}</span>
                <Input
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      const code = formik.values;
                      handleSubmitOtp(code);
                    }
                  }}
                  maxLength={6}
                  placeholder={t("enter-otp")}
                  name="otpCode"
                  value={formik.values.otpCode}
                  onChange={onChangeInputOTP}
                  onBlur={() => formik.setFieldValue("otpCode", formik.values.otpCode)}
                  errorMessage={
                    formik.touched.otpCode && formik.errors.otpCode
                      ? t(`${formik.errors.otpCode as "please_fill_in_your_email"}`)
                      : ""
                  }
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-light hover:bg-orange-hover mt-4 h-12 rounded-md"
                loading={loading}
                loadingSize={20}
              >
                <span className="text-white font-semibold text-base">{t`submit`}</span>
              </Button>
              <div className="mt-8 text-lg flex flex-wrap justify-between">
                <span className="text-black text-sm">{t`didn't-receive-an-otp`}</span>
                {reSendOTP ? (
                  <span className="text-sm txt-resend" role="button" onClick={handleReSendOTP}>
                    {t`resend`}
                  </span>
                ) : (
                  <div>
                    <span className="text-sm txt-resend-in float-right">{t`s`}</span>
                    <span className="text-sm txt-resend-in float-right txt-time">
                      {convertTimeToMinute(countDown)}
                    </span>
                    <span className="text-sm txt-resend-in float-right">{t`resend-in`}&nbsp; </span>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        <Asset className="absolute right-0 mt-16" />
      </div>
    </div>
  );
}
