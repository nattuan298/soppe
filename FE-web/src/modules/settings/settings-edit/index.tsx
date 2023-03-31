import useTranslation from "next-translate/useTranslation";
import { ButtonMui, ButtonMuiLight, LeftNavination, ModalConfirm, Title } from "src/components";
import SwitchCustome from "src/components/switch";
import { ModalUserSummaryInfo } from "src/components/user-summary";
import setLanguage from "next-translate/setLanguage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/state/store";
import { SelectLanguage } from "src/components/select/select-language";
import { useRouter } from "next/router";
import { routeSettingsBase } from "src/constants/routes";
import { changeStatus } from "src/services/setting.services";
import { CircularProgress } from "@material-ui/core";
import { setNotifyStatus } from "src/feature/notifications/notification.slice";
// import { getNotification } from "src/feature/settings/setting.slice";
import { getNotificationDispatch } from "src/feature/settings/setting.action";
import useGetScreenWidth from "src/hooks/useGetScreenWidth";

export function SettingsEdit() {
  const { t, lang } = useTranslation("common");
  const router = useRouter();
  const [isOpenModalCancel, setIsOpenModalCancel] = useState<boolean>(false);
  const [confirmTypeCancel] = useState<"cancel">("cancel");
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [languageSelect, setLanguageSelect] = useState(lang);
  const { NotifyData, loading } = useSelector((state: RootState) => state.setting);
  const dispatch = useDispatch();
  const [notify, setNotify] = useState(NotifyData.notifyStatus);
  function handleChangeLanguage(language: { title: string; value: string; flag: string }) {
    const newLanguage = language.value;
    if (lang !== newLanguage) {
      setLanguageSelect(newLanguage);
    }
  }
  useEffect(() => {
    // dispatch(getNotification());

    dispatch(getNotificationDispatch());
  }, [dispatch]);
  const handleToggle2FA = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotify(event.target.checked);
  };
  async function handleSubmit() {
    setLoadingSubmit(true);
    await setLanguage(languageSelect);
    try {
      const response = await changeStatus(notify);
      if (response.status === 200) {
        setLoadingSubmit(false);
        dispatch(setNotifyStatus(notify));
        router.push(routeSettingsBase);
      }
    } catch (error) {
      setLoadingSubmit(false);
    }
    router.push(routeSettingsBase);
  }
  const handleConfirmCancel = async () => {
    router.push(routeSettingsBase);
  };
  const handleCancelConfirm = async () => {
    setIsOpenModalCancel(false);
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
          <div className="md:w-1/3">
            <div className="mb-4 md:mb-8">
              <Title className="text-sm sm:text-base text-black-dark" title={t`language`} />
              <SelectLanguage
                defaultValue={lang}
                onChange={handleChangeLanguage}
                classNameTextField={"text-sm"}
              />
            </div>
            <div className="flex">
              <Title title={t`push_notification`} className="mr-12 text-black-dark" />
              <SwitchCustome defaultChecked={NotifyData.notifyStatus} onChange={handleToggle2FA} />
            </div>
          </div>
          <div>
            <div className="md:flex md:w-2/3 mt-6">
              <div className="md:w-1/2 md:mr-4 mb-4 md:mb-0" onClick={() => handleSubmit()}>
                <ButtonMui showCircle={loadingSubmit}>{t`submit`}</ButtonMui>
              </div>
              <div className="md:w-1/2" onClick={() => setIsOpenModalCancel(true)}>
                <ButtonMuiLight variant="outlined" textClassName="font-normal">
                  {t`cancel`}
                </ButtonMuiLight>
              </div>
            </div>
          </div>
        </div>
      )}
      <ModalConfirm
        open={isOpenModalCancel}
        confirmType={confirmTypeCancel}
        onClose={handleCancelConfirm}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
}
