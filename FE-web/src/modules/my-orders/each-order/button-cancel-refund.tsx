import { Dialog, makeStyles } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useState } from "react";
import { LogoSuccessMore } from "src/components";

const useStyle = makeStyles({
  paper: {
    borderRadius: 20,
    boxShadow: "0px 0px 10px #0000001A",
  },
});

export default function ButtonCancelRefund({ fullWidth }: { fullWidth?: boolean }) {
  const classes = useStyle();
  const { t } = useTranslation("common");

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <button
        className={`${
          fullWidth ? "w-full" : "w-[9.375rem]"
        } h-[2.1875rem] text-sm bg-lighterGray text-brown rounded`}
        onClick={handleOpen}
      >
        {t`cancel_refund`}
      </button>

      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
        classes={classes}
      >
        <div className="w-[22.1875rem] sm:w-[24.0625rem] flex flex-col justify-center items-center pl-[3.125rem] sm:pl-15 pr-[3.125rem] sm:pr-15 pt-6 pb-12">
          <p className="text-xl">{t`order_cancellation_refund`}</p>
          <p className="mt-4 text-sm text-center">
            {t`Please_contact_our_call_center_to_inform_perform_the_actions`}
          </p>
          <LogoSuccessMore className="h-12 mt-5 mb-5" />
          <div className="flex">
            <Image src="/assets/images/thailand_flag_icon.svg" width={20} height={20} />
            <span className="text-lg ml-2">+66 (0) 2 - 511 - 5951</span>
          </div>
          <div className="flex mt-5">
            <div>
              <AccessTimeIcon fontSize="small" />
            </div>
            <div className="pl-2">
              <p className="text-sm whitespace-nowrap">{t`open`}</p>
              <p className="text-sm mt-1">{t`wed`}</p>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
