/* eslint-disable @typescript-eslint/no-explicit-any */
import useTranslation from "next-translate/useTranslation";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonMuiLight, LeftNavination } from "src/components";
import DialogCustome from "src/components/dialog";
import { ModalUserSummaryInfo } from "src/components/user-summary";
import { RootState } from "src/state/store";
import useGetScreenWidth from "src/hooks/useGetScreenWidth";
import { resetSignin } from "../../../feature/signin/sign-in-slice";
import { removeToken } from "../../../lib/common.lib";

export function Settings() {
  const dispatch = useDispatch();
  const { t, lang } = useTranslation("common");

  const [openModalSignIn, setOpenModalSignIn] = useState<boolean>(false);
  const loadingSignOut = useSelector((state: RootState) => state.setting.loadingSignOut);
  const loadingButtonSignOut = useSelector(
    (state: RootState) => state.setting.loadingButtonSignOut,
  );

  React.useEffect(() => {
    if (!loadingSignOut) {
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, loadingSignOut]);

  const handleCloseModal = () => {
    setOpenModalSignIn(false);
  };

  const handleSignOut = async () => {
    dispatch(resetSignin());
    removeToken(true);
    window.location.reload();
  };

  const width = useGetScreenWidth();

  return (
    <div className="md:mx-auto md:w-1216 mb-8 mt-6 md:flex relative px-4 md:px-0">
      {width !== "Mobile" && <ModalUserSummaryInfo />}{" "}
      <div className="w-1/4 mr-6 hidden md:block">
        <LeftNavination />
      </div>
      <div className="md:w-3/4 w-full mt-4 md:mt-0">
        <ul className="md:w-2/3">
          <li className="mb-6">
            <div className="flex justify-between">
              <div className="text-black-dark">{t`app_version`}</div>
              <div className="mr-6 text-black-dark">V1.0.0</div>
            </div>
          </li>
        </ul>
        <div className="md:w-2/5 w-full">
          <ButtonMuiLight
            variant="outlined"
            textClassName="font-normal"
            onClick={() => setOpenModalSignIn(true)}
          >{t`sign_out`}</ButtonMuiLight>
        </div>
      </div>

      <DialogCustome
        open={openModalSignIn}
        handleClose={handleCloseModal}
        handleConfirm={handleSignOut}
        buttonConfirmTite={t`sign_out`}
        circleShow={loadingButtonSignOut}
      >
        <div className="text-center mb-8 mt-6 text-sm">{t`confirm_sign_out`}?</div>
      </DialogCustome>
    </div>
  );
}
