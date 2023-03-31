import useTranslation from "next-translate/useTranslation";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import { Modal } from "src/components";
import SwitchCustome from "src/components/switch";
import { SecurityState } from "src/feature/security/security.slice";
import AuthenContent from "./google-auth-content";
import ModalContent from "./modal-content";
import styles from "./index.module.css";

interface PropsType {
  isHidenContent: boolean;
  securityState: SecurityState;
  generateSecurity: () => void;
  handleTurnOn2FA: (code: string) => Promise<null | string>;
  handleTurnOff2FA: (code: string) => Promise<null | string>;
  setIsHidenContent: (value: boolean) => void;
}

export function GoogleAuthentication({
  isHidenContent,
  securityState,
  generateSecurity,
  handleTurnOn2FA,
  handleTurnOff2FA,
  setIsHidenContent,
}: PropsType) {
  const { t } = useTranslation("common");
  const [isModalOpen, setModalOpen] = useState(false);
  const [switchGoogle, setSwitchGoogle] = useState(false);
  const { googleAuth } = securityState;

  useEffect(() => setSwitchGoogle(googleAuth), [googleAuth]);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const handleClickShowContent = () => {
    setIsHidenContent(false);
    if (googleAuth) {
      generateSecurity();
    } else {
      setSwitchGoogle(false);
    }
  };

  const handleSwitch = () => {
    if (switchGoogle) {
      if (googleAuth) {
        openModal();
      } else {
        setSwitchGoogle(false);
      }
    } else {
      generateSecurity();
      setSwitchGoogle(true);
    }
  };

  const cancelGoogleAuthen = () => {
    setSwitchGoogle(false);
  };

  const stateGoogleAuth = useMemo(() => (googleAuth ? "enable" : "disable"), [googleAuth]);

  return (
    <Fragment>
      <Modal isOpen={isModalOpen} onClose={closeModal} className={styles.modal}>
        <ModalContent closeModal={closeModal} handleTurnOff2FA={handleTurnOff2FA} />
      </Modal>
      <div className="w-full">
        <label className="flex justify-between" htmlFor="">
          <div className="w-full md:w-1/2 flex justify-between">
            {t`google_authentication`}
            <div className={`mr-4 ${isHidenContent ? "hidden" : ""}`}>
              <SwitchCustome checked={switchGoogle} onChange={handleSwitch} />
            </div>
          </div>
          <div
            className={`flex justify-end cursor-pointer ${isHidenContent ? "" : "hidden"}`}
            onClick={handleClickShowContent}
          >
            <span className={`${googleAuth ? "text-greenLight" : "text-lighterGray"}`}>
              {t(`${stateGoogleAuth}`)}
            </span>
            <div className="ml-4">
              <ChevronRightIcon className="text-lighterGray" />
            </div>
          </div>
        </label>
        {!isHidenContent && switchGoogle && (
          <AuthenContent
            googleAuth={googleAuth}
            cancelGoogleAuthen={cancelGoogleAuthen}
            handleTurnOn2FA={handleTurnOn2FA}
          />
        )}
      </div>
    </Fragment>
  );
}
