/* eslint-disable jsx-a11y/anchor-has-content */
import { useEffect, useState } from "react";
import { Asset, Button, Input, Label } from "src/components";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Navbar } from "src/components/navbar";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { emailSchema } from "src/modules/auth/components/schema";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { fetchPostSendOPT } from "src/store/reset-password/password-recovery.action";
import { changeEmail } from "src/store/reset-password/email-change-password.slice";
import { routePasswordRecovery2Base } from "src/constants/routes";
import { Modal } from "src/components/portal/modal";
import { ClockBlack, EmailBlack, LogoSuccessMore } from "src/components/icons";

interface initialValueType {
  email: string;
}

export function PasswordRecovery1() {
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const [openModalContact, setOpenModalContact] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState<initialValueType>({
    email: "",
  });
  const { statusCode, status } = useSelector((state: RootState) => state.sendOtp);
  const { email } = useSelector((state: RootState) => state.emailChangePassword);
  const isLoggedIn = JSON.parse(localStorage.getItem("token") || "{}").jwtAccessToken;

  useEffect(() => {
    if (statusCode === 204) {
      history.push(routePasswordRecovery2Base);
    }
  }, [history, statusCode]);

  useEffect(() => {
    if (status === "success" || status === "failed") {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (email) {
      setInitialValues({ email });
    }
  }, [email]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSendEmail,
    validationSchema: emailSchema,
  });

  function handleSendEmail(values: initialValueType) {
    setLoading(true);
    dispatch(fetchPostSendOPT(values.email));
    if (values.email) {
      dispatch(changeEmail(values.email));
      localStorage.setItem("email", values.email);
    }
  }

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  const handleOpenModalContact = () => {
    setOpenModalContact(true);
  };

  const closeModal = () => {
    setOpenModalContact(false);
  };

  return (
    <div className="w-full">
      <Navbar goBackLink="/signin" isAuth={true} />
      <div className="w-2/3 m-auto relative">
        <div className="w-28 mt-24 rounded-lg shadow-formSignIn border border-coolGray-100 absolute left-0 z-20 bg-white">
          <form onSubmit={formik.handleSubmit} className="pl-12 pt-7 pr-12 pb-14">
            <span className="text-black text-xl font-medium">{t`password-recovery`}</span>
            <div className="">
              <div className="flex flex-col pt-8">
                <Label>{t("please-enter-your-account-email")}</Label>
                <Input
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      const email = formik.values;
                      handleSendEmail(email);
                    }
                  }}
                  placeholder={t("email")}
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldValue("email", formik.values.email.trim())}
                  errorMessage={
                    formik.touched.email && formik.errors.email
                      ? t(`${formik.errors.email as "please_fill_in_your_email"}`)
                      : ""
                  }
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-light hover:bg-orange-hover mt-5 h-12 rounded-md"
                loading={loading}
                loadingSize={20}
              >
                <span className="text-white font-semibold text-base">{t`submit`}</span>
              </Button>
              <div className="mt-8 text-lg">
                <span className="txt-contact-1">{t`please`} </span>
                <span className="txt-contact-2" role="button" onClick={handleOpenModalContact}>
                  {t`contact`}
                </span>
                <span className="txt-contact-1">
                  {" "}
                  {t`platform-admin-platform-admin-if-you-forgot-your-account-email`}
                </span>
              </div>
            </div>
          </form>
        </div>

        <Asset className="absolute right-0 mt-16" />
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
