import { ChangeEvent, Fragment, useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";

import { CopyIcon } from "src/components/svgs";
import { Button } from "src/components";
import { RootState } from "src/state/store";
import { notifyToast } from "src/constants/toast";
import styles from "./index.module.css";

interface PropsType {
  googleAuth: boolean;
  cancelGoogleAuthen: () => void;
  handleTurnOn2FA: (code: string) => Promise<null | string>;
}

function GoogleAuthenContent({ googleAuth, cancelGoogleAuthen, handleTurnOn2FA }: PropsType) {
  const { t, lang } = useTranslation("common");
  useEffect(() => {
    setErrorVerificationBE("");
  }, [lang]);
  const { securityCode, loadingsecurityCode } = useSelector((state: RootState) => state.security);
  const [verificationCode, setVerificationCode] = useState("");
  const [errorVerificationCode, setErrorVerification] = useState("required_fields");
  const [errorVerificationCodeBE, setErrorVerificationBE] = useState("");
  const [showError, setShowError] = useState(false);

  if (loadingsecurityCode || !securityCode) {
    return null;
  }

  const handleChangeCode = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length > 6 || !/^[0-9]*$/.test(value)) {
      return;
    }
    setVerificationCode(value);
    if (value === "") {
      setErrorVerification("required_fields");
    }
    if (value.length > 6 || value.length < 6) {
      setErrorVerification("6_digits_google_verification_code");
    } else {
      setShowError(false);
      setErrorVerification("");
    }
  };

  const handleSubmitForm = async () => {
    if (verificationCode === "" || verificationCode.length > 6 || verificationCode.length < 6) {
      if (verificationCode === "") {
        setErrorVerification("required_fields");
      }
      setShowError(true);
      setErrorVerificationBE("");
      return;
    }
    const message = await handleTurnOn2FA(verificationCode);
    if (message) {
      setErrorVerificationBE(message);
      setShowError(false);
    }
  };

  const handleCopySecrect = () => {
    if (securityCode.secret) {
      navigator.clipboard.writeText(securityCode?.secret);
      notifyToast("default", "copy_success_google_auth", t);
    }
  };

  return (
    <Fragment>
      <div className="md:w-1/2 mt-5">
        <div className="w-1/2">
          <div className="text-black-dark text-sm">{t`secret_key`}</div>
          <img src={securityCode.qrcode} alt="QR Code" width={125} height={125} />
        </div>
        <div className="w-full mt-4 pr-4">
          <div className="text-black-dark text-sm">{t`secret_key_manually`}</div>
          <div className={`${styles.referralLink} mt-1`}>
            <span className={`${styles.txtLink}`}>{securityCode?.secret}</span>
            <div role="button" onClick={handleCopySecrect}>
              <CopyIcon className={`${styles.copyIcon}`} />
            </div>
          </div>
        </div>
        {!googleAuth && (
          <div className="w-full mt-4 pr-4">
            <div className="text-black-dark text-sm">{t`google_verification`}</div>
            <input
              id="google-verification"
              placeholder={t`6_digits_google_verification_code`}
              className={`${styles.referralLink} mt-1 pl-4 text-sm text-lightestGray::placeholder focus:outline-none focus:ring-orangescm focus:ring-1`}
              autoComplete={"off"}
              value={verificationCode}
              onChange={handleChangeCode}
            />
            {showError && (
              <div className="text-sm text-red" style={{ marginTop: "-5px" }}>
                {t(errorVerificationCode)}
              </div>
            )}
            {errorVerificationCodeBE && (
              <div className="text-sm text-red" style={{ marginTop: "-5px" }}>
                {errorVerificationCodeBE}
              </div>
            )}
          </div>
        )}
      </div>
      {!googleAuth && (
        <div className="w-full md:mt-5 flex md:flex-row flex-col">
          <Button
            colorClass="text-white"
            className="bg-orange font-normal hover:bg-lighterOrange focus:ring-0 md:mr-1.5 h-12 md:w-1/2 rounded-md text-white text-base"
            onClick={handleSubmitForm}
          >
            {t`submit`}
          </Button>
          <Button
            colorClass="text-orange"
            className={`${styles.buttonCancel} bg-white h-12 md:w-1/2 font-normal md:ml-6 mt-4 md:mt-0`}
            onClick={cancelGoogleAuthen}
          >
            {t`cancel`}
          </Button>
        </div>
      )}
    </Fragment>
  );
}

export default GoogleAuthenContent;
