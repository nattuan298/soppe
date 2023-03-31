import { Dialog, makeStyles } from "@material-ui/core";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import useTranslation from "next-translate/useTranslation";
import { FC } from "react";
import { ButtonMui } from "src/components";

const useStyle = makeStyles({
  paper: {
    borderRadius: 20,
    boxShadow: "0px 0px 10px #0000001A",
  },
});

interface PropsType {
  open: boolean;
  handleClose?: () => void;
  handleConfirm: () => void;
  loading?: boolean;
  buttonConfirmTite?: string;
  circleShow?: boolean;
}

const DialogCustome: FC<PropsType> = ({
  open,
  circleShow,
  handleClose,
  handleConfirm,
  loading = false,
  children,
  buttonConfirmTite,
}) => {
  const classes = useStyle();
  const { t } = useTranslation("common");

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      classes={classes}
    >
      <div className="flex flex-col justify-center items-center pl-7 pr-7 pt-8 pb-8 w-[355px] sm:w-[375px]">
        <ErrorOutlineOutlinedIcon className="text-orange" style={{ width: 86, height: 86 }} />
        {children}

        {handleClose && (
          <ButtonMui variant="outlined" textClassName="font-normal" onClick={handleClose}>
            {t`cancel`}
          </ButtonMui>
        )}

        <ButtonMui
          showCircle={circleShow}
          className="mt-4"
          textClassName="font-normal"
          onClick={handleConfirm}
          disabled={loading}
        >
          {buttonConfirmTite || t`confirm`}
        </ButtonMui>
      </div>
    </Dialog>
  );
};

export default DialogCustome;
