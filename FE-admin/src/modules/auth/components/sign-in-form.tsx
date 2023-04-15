/* eslint-disable jsx-a11y/anchor-has-content */
import { useEffect, useState } from "react";
import { Asset, Button, Input, Label, PasswordInput } from "src/components";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Navbar } from "src/components/navbar";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { signinFormSchema } from "src/modules/internal-user-managment/internal-user-form/schema";
import "./styles.css";
import { loginAction } from "src/store/authentication.action";
import { Modal } from "src/components/portal/modal";
import { ClockBlack, EmailBlack, LogoSuccessMore } from "src/components/icons";

type InitialValues = {
  username: string;
  password: string;
};

export function SignInForm() {
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const [errorAuth, setErrorAuth] = useState(false);
  const [initialValues] = useState<InitialValues>({
    username: "",
    password: "",
  });
  const history = useHistory();
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("contact");
  useEffect(() => {
    if (myParam === "true") {
      setOpenModalContact(true);
    }
  }, []);
  const [openModalContact, setOpenModalContact] = useState<boolean>(false);
  useEffect(() => {
    localStorage.removeItem("tokenGoogleVerify");
  }, []);
  const dispatch = useDispatch();
  const { statusCode, status, authenticationDetail } = useSelector(
    (state: RootState) => state.authentications,
  );
  const isLoggedIn = JSON.parse(localStorage.getItem("token") || "{}").jwtAccessToken;
  const googleAuth = JSON.parse(localStorage.getItem("token") || "{}").googleAuth;
  useEffect(() => {
    if (statusCode) {
      setErrorAuth(true);
    }
  }, [statusCode]);

  useEffect(() => {
    if (status === "success" || status === "failed") {
      setLoading(false);
    }
  }, [status, authenticationDetail]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSignIn,
    validationSchema: signinFormSchema,
  });

  function handleSignIn(values: InitialValues) {
    setLoading(true);
    dispatch(
      loginAction({
        username: values.username.trim(),
        password: values.password,
      }),
    );
  }

  if (isLoggedIn && !googleAuth) {
    return <Redirect to="/" />;
  }

  const handleOpenModalContact = () => {
    setOpenModalContact(true);
  };
  const closeModal = () => {
    if (myParam === "true") {
      history.push("");
    }
    setOpenModalContact(false);
  };

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <div className="w-28 rounded-lg shadow-formSignIn border border-coolGray-100 z-20 bg-white">
          <form onSubmit={formik.handleSubmit} className="pl-12 pt-7 pr-12 pb-8">
            <span className="text-black text-xl font-medium">{t`sign-in`}</span>
            <div className="">
              <div className="flex flex-col pt-8">
                <Label>{t("username")}</Label>
                <Input
                  placeholder={t("email")}
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldValue("username", formik.values.username.trim())}
                  errorMessage={
                    formik.touched.username && formik.errors.username
                      ? t(`${formik.errors.username as "please_fill_in_your_email"}`)
                      : ""
                  }
                />
              </div>
              <div className="flex flex-col pt-4">
                <Label>{t("password")}</Label>
                <PasswordInput
                  className="w-full"
                  placeholder={t("password")}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  errorMessage={
                    formik.touched.password && formik.errors.password
                      ? t(`${formik.errors.password as "please_fill_in_your_email"}`)
                      : ""
                  }
                />
              </div>
              <div className="flex">
                {errorAuth ? (
                  <span className="text-red-light text-sm">{t`error-authentication`}</span>
                ) : null}
              </div>
              <div className="flex flex-col pt-4">
                <Link to={"/password-recovery-1"}>
                  <span className="float-left txt-forgot hover:underline hover:text-orange-light">
                    {t`forgot-your-password`}
                  </span>
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-light mt-4 h-12 rounded-md hover:bg-orange-hover"
                loading={loading}
                loadingSize={20}
              >
                <span className="text-white font-semibold text-base">{t`signin`}</span>
              </Button>
            </div>
          </form>
        </div>

        {/* <Asset className="absolute right-0" /> */}
      </div>
      <Modal
        isOpen={openModalContact}
        onClose={closeModal}
        className="w-96 h-auto rounded-2xl font-kanit"
      >
        <ul className="text-center">
          <li className="mt-6 mb-4 text-xl text-it-support">{t`it_support_contact`}</li>
          <li className="w-64 mx-auto text-sm mb-5 text-it-support">{t`please_contact_it_support`}</li>
          <LogoSuccessMore className="mx-auto mb-5" />
          <li className="flex flex-wrap justify-center mb-2.5">
            <img
              src="/assets/images/country/thailand.svg"
              alt="thaiLang"
              className="w-5 h-5 mr-2 mt-0.5"
            />{" "}
            <span className="text-lg">+66 (0) 81 - 144 - 5263</span>
          </li>
          <li className="text-center text-sm">
            <div className="items-center flex justify-center mb-8">
              <EmailBlack />
              <span className="text-lg text-email">chatchai.b@successmore.com</span>
            </div>
          </li>
          <li className="text-center mb-8 text-sm">
            <div className="items-center flex justify-center">
              <ClockBlack />
              <span className="text-sm text-email">
                {t`monday`} {t`to`} {t`friday`}
                {" 11:00am - 19:00pm"}
              </span>
            </div>
          </li>
        </ul>
      </Modal>
    </div>
  );
}
