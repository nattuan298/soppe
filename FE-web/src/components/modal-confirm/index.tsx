import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import { useStyles } from "./styles";
import useTranslation from "next-translate/useTranslation";
import WarningIcon from "../svgs/Warning";
import { ButtonMui, ButtonMuiLight } from "..";
import useGetScreenWidth from "../../hooks/useGetScreenWidth";

interface ModalProps extends DialogProps {
  confirmType: "action" | "unable-delete" | "cancel" | "signIn" | "checkProduct" | "delete-confirm";
  onClose?: () => void;
  onConfirm?: () => void;
  message?: string;
}

export function ModalConfirm({ confirmType, onClose, onConfirm, message, ...props }: ModalProps) {
  const { t } = useTranslation("common");
  const { root, rootMobile } = useStyles();
  const screen = useGetScreenWidth();
  const cancelButtonClass =
    "bg-white text-orange-light border border-orange-light border-solid w-full mb-4 hover:border-orange-hover hover:text-orange-hover";
  const confirmButtonClass = "bg-orange text-white w-full hover:bg-orange-hover";

  function handleClose() {
    onClose?.();
  }
  function handleConfirm() {
    onConfirm?.();
  }

  return (
    <Dialog className={screen === "Desktop" ? root : rootMobile} {...props} onClose={handleClose}>
      <WarningIcon className="mb-7.5" />
      <p className="mb-7.5 text-center text-sm">
        {confirmType === "action" && t("confirm_message_popup")}
        {confirmType === "unable-delete" && (message || t("unable-delete-confirm"))}
        {confirmType === "cancel" && t("confirm_message_popup")}
        {confirmType === "signIn" && t("sign_in_to_use")}
        {confirmType === "checkProduct" && message}
        {confirmType === "delete-confirm" && t("delete-confirm")}
      </p>
      {confirmType === "unable-delete" ? (
        <ButtonMui variant="outlined" className={confirmButtonClass} onClick={handleConfirm}>
          {t`ok`}
        </ButtonMui>
      ) : (
        <>
          <ButtonMuiLight variant="outlined" className={cancelButtonClass} onClick={handleClose}>
            {t`cancel`}
          </ButtonMuiLight>
          <ButtonMui variant="outlined" className={confirmButtonClass} onClick={handleConfirm}>
            {t`confirm`}
          </ButtonMui>
        </>
      )}
    </Dialog>
  );
}
