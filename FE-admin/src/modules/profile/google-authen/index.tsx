import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, SwitchCustom } from "src/components";
import "./styles.css";
import { RootState } from "src/store";
import { CopyIcon } from "src/components/icons";
import { notifyToast } from "src/constants/toast";
import { turnOnSecurityGoogle } from "src/services/google.services";
import { Modal } from "src/components/portal/modal";
import ModalGoogleContent from "./modal-turn-off";
import { getGenerateAction } from "src/store/googleAuthen.action";
interface PropsType {
  securityState: boolean | undefined;
}
export function GoogleAuthentication({ securityState }: PropsType) {
  const { t } = useTranslation("common");
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [disabledToggle, setDisabledToggle] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [errorVerificationCode, setErrorVerification] = useState("");
  const [twofa, setTwofa] = useState<boolean>(false);
  const { generate } = useSelector((state: RootState) => state.GoogleAuthen);
  const lang = localStorage.getItem("i18nextLng");
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);
  const handleToggle2FA = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (twofa && !securityState) {
      return;
    }
    if (securityState) {
      openModal();
      return;
    }
    setTwofa(event.target.checked);
  };
  useEffect(() => {
    setErrorVerification("");
  }, [lang]);
  useEffect(() => {
    if (twofa && !securityState) {
      setDisabledToggle(true);
    } else {
      setDisabledToggle(false);
    }
  }, [twofa, securityState]);
  useEffect(() => {
    securityState && setTwofa(securityState);
    twofa && dispatch(getGenerateAction());
  }, [securityState, dispatch, twofa]);
  const handleCopySecrect = () => {
    if (generate.secret) {
      navigator.clipboard.writeText(generate?.secret);
      notifyToast("default", "copy_success", t);
    }
  };
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
  const cancelGoogleAuthen = () => {
    setTwofa(false);
    setVerificationCode("");
    setErrorVerification("");
  };
  const handleSub = async () => {
    if (verificationCode === "") {
      setErrorVerification(t`required_fields`);
      return;
    }
    if (!errorVerificationCode) {
      const response = (await turnOnSecurityGoogle(verificationCode)) as any;
      if (response.status === 400) {
        setErrorVerification(response.data.message);
      }
      if (response.status === 200) {
        window.location.reload();
      }
    }
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        className="modal w-96 h-auto rounded-2xl font-kanit"
      >
        <ModalGoogleContent closeModal={closeModal} />
      </Modal>
      <div className="flex items-center mb-6">
        <div className="mr-24">{t`2fa-google-authen`}</div>
        <SwitchCustom checked={twofa} onChange={handleToggle2FA} disabled={disabledToggle} />
      </div>
      {twofa && (
        <Grid xl={6} lg={8} md={8}>
          <div className="w-1/2">
            <div className="text-black-dark text-sm">{t`secret_key`}</div>
            <img src={generate.qrCode} alt="QR Code" width={124} height={124} />
          </div>
          <div className="w-1/2 mt-4 pr-4">
            <div className="text-black-dark text-sm">{t`secret_key_manually`}</div>
            <div className="referralLink mt-1">
              <span className="txtLink">{generate.secret}</span>
              <div role="button" onClick={handleCopySecrect}>
                <CopyIcon className="copyIcon" />
              </div>
            </div>
          </div>
          {!securityState && (
            <div>
              <div className="w-1/2 mt-4 pr-4 mb-6">
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
              </div>
              <Grid className="mb-4 flex">
                <Button
                  className="mr-4 w-343px h-50px bg-orange-light text-white hover:bg-orange-hover"
                  variant="text"
                  onClick={handleSub}
                >
                  {t("submit")}
                </Button>
                <Button
                  variant="text"
                  className="ml-4 w-343px h-50px border border-solid border-orange-light text-orange-light hover:border-orange-hover"
                  onClick={cancelGoogleAuthen}
                >
                  {t("cancel")}
                </Button>
              </Grid>
            </div>
          )}
        </Grid>
      )}
    </div>
  );
}
