import { ChangeEvent, useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { Button } from "src/components";
import Link from "next/link";
import styles from "./index.module.css";

interface PropsType {
  closeModal: () => void;
  handleTurnOff2FA: (code: string) => Promise<null | string>;
}

function ModalGoogleContent({ closeModal, handleTurnOff2FA }: PropsType) {
  const { t, lang } = useTranslation("common");
  const [verificationCode, setVerificationCode] = useState("");
  const [errorVerificationCode, setErrorVerification] = useState("required_fields");
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    setErrorVerification("");
  }, [lang]);
  const handleChangeCode = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length > 6 || !/^[0-9]*$/.test(value)) {
      return;
    }
    setVerificationCode(value);
    if (value === "") {
      setErrorVerification(t`required_fields`);
    }
    if (value.length > 6 || value.length < 6) {
      setErrorVerification(t`6_digits_google_verification_code`);
    } else {
      setErrorVerification("");
    }
  };

  const handleSubmitForm = async () => {
    if (verificationCode === "" || verificationCode.length > 6 || verificationCode.length < 6) {
      setShowError(true);
      return;
    }
    const message = await handleTurnOff2FA(verificationCode);
    if (message) {
      setErrorVerification(message);
      setShowError(true);
    } else {
      closeModal();
    }
  };

  return (
    <div className="w-[22.1875rem] sm:w-96 flex justify-center px-4 sm:px-7 py-[1.875rem] sm:py-7 flex-col items-center">
      <div className="text-lg text-black-dark">{t`disable_confirmation`}</div>
      <div className="w-full mt-7">
        <div className="text-sm sm:text-base text-black-dark ">{t`google_verification`}</div>
        <input
          id="google-verification-code"
          placeholder={t`6_digits_google_verification_code`}
          className={`${styles.referralLink} mt-1 pl-4 text-sm text-lightestGray::placeholder focus:outline-none focus:ring-orangescm focus:ring-1`}
          autoComplete={"off"}
          value={verificationCode}
          onChange={handleChangeCode}
        />
        {showError && errorVerificationCode !== "" && (
          <div className="text-xs text-red" style={{ marginTop: "-15px" }}>
            {errorVerificationCode}
          </div>
        )}
        <Link href={"https://scmconnext.com/help-center-3/61b184a8133b4625e0c54510"}>
          <a
            target={"_blank"}
            className={`${styles.unavailable_code} cursor-pointer hover:underline hover:text-orange`}
          >{t`security-code-unavailable`}</a>
        </Link>
      </div>
      <div className="w-full mt-3.5 flex flex-col">
        <Button
          colorClass="text-white"
          onClick={handleSubmitForm}
          className="bg-orange font-normal hover:bg-lighterOrange focus:ring-0 h-12 w-full rounded-md text-white text-base"
        >
          {t`submit`}
        </Button>
        <Button
          colorClass="text-orange"
          onClick={closeModal}
          className={`${styles.buttonCancel} bg-white h-12 w-full font-normal mt-4`}
        >
          {t`cancel`}
        </Button>
      </div>
    </div>
  );
}

export default ModalGoogleContent;
