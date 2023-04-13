import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Input } from "src/components";
import { turnOffSecurityGoogle } from "src/services/google.services";
import "./styles.css";

interface PropsType {
  closeModal: () => void;
  handleTurnOff2FA?: (code: string) => void;
}

function ModalGoogleContent({ closeModal, handleTurnOff2FA }: PropsType) {
  const { t } = useTranslation("common");
  const [verificationCode, setVerificationCode] = useState("");
  const [errorVerificationCode, setErrorVerification] = useState("");

  const handleChangeCode = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length > 6 || !/^[0-9]*$/.test(value)) {
      return;
    }
    setVerificationCode(value);
    if (value.length === 6) {
      setErrorVerification("");
    }
  };

  const handleSubmitForm = async () => {
    if (verificationCode === "") {
      setErrorVerification(t`required_fields`);
      return;
    }
    if (verificationCode.length > 6 || verificationCode.length < 6) {
      setErrorVerification(t`6_digits_google_verification_code`);
      return;
    }
    setErrorVerification("");
    const message = (await turnOffSecurityGoogle(verificationCode)) as any;
    if (message.status === 200) {
      closeModal();
      window.location.reload();
    }
    if (message.status === 400) {
      setErrorVerification(message.data.message);
    }
  };
  return (
    <div className="w-96 flex justify-center p-7 flex-col items-center">
      <div className="text-lg text-black-dark">{t`disable_confirmation`}</div>
      <div className="w-full mt-7">
        <div className="text-black-dark text-sm">{t`enter-google-verification-code`}</div>
        <Input
          id="google-verification"
          placeholder={t`6_digits_google_verification_code`}
          className="referralLink mt-1 text-sm text-lightestGray::placeholder focus:outline-none focus:ring-orangescm focus:ring-1"
          autoComplete={"off"}
          value={verificationCode}
          onChange={handleChangeCode}
          errorMessage={errorVerificationCode}
        />
        <div
          className="text-verify txt-security hover:underline hover:text-orange-light cursor-pointer"
          onClick={() =>
            window.open("https://scmconnext.com/help-center-3/61b184a8133b4625e0c54510", "_blank")
          }
        >
          {t`security-verification-code-unavailable`}?
        </div>
      </div>
      <div className="w-full mt-3.5 flex flex-col">
        <Button
          colorClass="text-white"
          onClick={handleSubmitForm}
          className="bg-orange-light hover:bg-orange-hover font-normal focus:ring-0 h-12 w-full rounded-md text-white text-base"
        >
          {t`submit`}
        </Button>
        <Button
          colorClass="text-orange"
          onClick={closeModal}
          className="buttonCancel bg-white h-12 w-full font-normal mt-4"
        >
          {t`cancel`}
        </Button>
      </div>
    </div>
  );
}

export default ModalGoogleContent;
