/* eslint-disable @typescript-eslint/no-explicit-any */
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonMuiLight, LeftNavination } from "src/components";
import DialogCustome from "src/components/dialog";
import { ModalUserSummaryInfo } from "src/components/user-summary";
import { routeSettingsEditBase } from "src/constants/routes";
// import {
// getNotification,
// signOutAPI } from "src/feature/settings/setting.slice";
import { CircularProgress } from "@material-ui/core";
import { getNotificationDispatch, signOutDispatch } from "src/feature/settings/setting.action";
import { getOSType } from "src/lib/common.lib";
import { unSubscribeToTopic } from "src/lib/firebase/clientApp";
import { RootState } from "src/state/store";
import useGetScreenWidth from "src/hooks/useGetScreenWidth";

export function Settings() {
  const dispatch = useDispatch();
  const [OSName, setOSName] = useState("Unknown OS");
  const { t, lang } = useTranslation("common");
  const router = useRouter();
  const [openModalSignIn, setOpenModalSignIn] = useState<boolean>(false);
  const Notify = useSelector((state: RootState) => state.setting.NotifyData);
  const loadingSignOut = useSelector((state: RootState) => state.setting.loadingSignOut);
  const loadingButtonSignOut = useSelector(
    (state: RootState) => state.setting.loadingButtonSignOut,
  );
  const loading = useSelector((state: RootState) => state.setting.loading);
  const { topic, notifyStatus } = useSelector((state: RootState) => state.notification);

  React.useEffect(() => {
    setOSName(getOSType());
  }, []);

  React.useEffect(() => {
    dispatch(getNotificationDispatch());
  }, [dispatch]);

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
    if (notifyStatus) {
      await unSubscribeToTopic(topic, true);
    }
    await dispatch(signOutDispatch({ OSName }));
  };

  const handleClickSetting = (url: string) => () => {
    router.push(url);
  };
  const width = useGetScreenWidth();

  return (
    <div className="md:mx-auto md:w-1216 mb-8 mt-6 md:flex relative px-4 md:px-0">
      {width !== "Mobile" && <ModalUserSummaryInfo />}{" "}
      <div className="w-1/4 mr-6 hidden md:block">
        <LeftNavination />
      </div>
      {loading ? (
        <div className="md:absolute mt-10 md:mt-0 -top-40 left-36 flex items-center justify-center w-full h-full bg-opacity-30">
          <CircularProgress />
        </div>
      ) : (
        <div className="md:w-3/4 w-full mt-4 md:mt-0">
          <ul className="md:w-2/3">
            <li className="mb-6 cursor-pointer" onClick={handleClickSetting(routeSettingsEditBase)}>
              <div className="flex justify-between">
                <div className="text-black-dark">{t`language`}</div>
                <div className="flex">
                  {lang === "th" ? t`thai_language` : t`english`}
                  <ChevronRightIcon className="text-lighterGray" />
                </div>
              </div>
            </li>
            <li className="mb-6 cursor-pointer" onClick={handleClickSetting(routeSettingsEditBase)}>
              <div className="flex justify-between">
                <div className="text-black-dark">{t`push_notification`}</div>
                <div className="flex">
                  {Notify.notifyStatus ? (
                    <div className="text-greenLight">{t`on`} </div>
                  ) : (
                    <div className="text-lighterGray">{t`off`}</div>
                  )}
                  <ChevronRightIcon className="text-lighterGray" />
                </div>
              </div>
            </li>
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
      )}
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
