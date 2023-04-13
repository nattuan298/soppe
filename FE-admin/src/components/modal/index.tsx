import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import { useTranslation } from "react-i18next";

import { WarningIcon } from "../icons";
import { Button } from "../button";
import { useStyles } from "./styles";

interface ModalProps extends DialogProps {
  confirmType: "action" | "delete" | "cancel" | "approve" | "reject" | "confirm" | "langContent";
  content?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
}

export function Modal({
  confirmType,
  onClose,
  onConfirm,
  content,
  confirmText,
  ...props
}: ModalProps) {
  const { t } = useTranslation("common");
  const { root } = useStyles();

  const cancelButtonClass = "bg-white border border-solid w-full mb-4 button-cancel";
  const confirmButtonClass = "bg-orange-light text-white w-full hover:bg-orange-hover";

  function handleClose() {
    onClose?.();
  }
  function handleConfirm() {
    onConfirm?.();
  }

  function getContent() {
    if (confirmType === "confirm" && content) return content;
    if (confirmType === "approve") return t("action-confirm");
    if (confirmType === "reject") return t("action-confirm");
    if (confirmType === "action") return t("action-confirm");
    if (confirmType === "delete") return t("delete-confirm");
    if (confirmType === "cancel") return t("action-confirm");
    if (confirmType === "langContent") return t("required_faq");
  }

  return (
    <Dialog className={root} {...props} onClose={handleClose}>
      <WarningIcon className="mb-7.5" />
      <p className="mb-7.5 text-center text-sm">{getContent()}</p>
      {confirmType !== "confirm" && (
        <Button variant="text" className={cancelButtonClass} onClick={handleClose}>
          {t("cancel")}
        </Button>
      )}
      <Button variant="text" className={confirmButtonClass} onClick={handleConfirm}>
        {confirmText ? confirmText : t("confirm")}
      </Button>
    </Dialog>
  );
}
