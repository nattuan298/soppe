/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable indent */
import { CircularProgress } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import dayjs from "dayjs";
import useTranslation from "next-translate/useTranslation";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import ReactFacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login-typed";
import { useDispatch, useSelector } from "react-redux";
import { LeftNavination } from "src/components";
import DialogCustome from "src/components/dialog";
import SwitchCustome from "src/components/switch";
import { apiRoute } from "src/constants/apiRoutes";
import { browserConfig } from "src/constants/browser-config";
import { notifyToast } from "src/constants/toast";
import { updateScreen } from "src/feature/update-account-infor/slice";
import { changeFacebookConnectStatus, changePhoneConnectStatus } from "src/feature/user/slice";
import useGetScreenWidth from "src/hooks/useGetScreenWidth";
import axios from "src/lib/client/request";
import { phoneNumberFormatter234 } from "src/lib/format";
import { RootState } from "src/state/store";
import { ModalUserSummaryInfo } from "../../components/user-summary";
import UpdateImages from "./update-images";
import UpdateInfor from "./update-infor";
import UpdatePhone from "./update-phone";

declare global {
  interface Window {
    encodeURversionmponent: any;
  }
}

const infors = [
  { title: "full_name" },
  { title: "gender" },
  { title: "date_of_birth" },
  { title: "email" },
  { title: "phone-number" },
  { title: "citizenship" },
];

const images = [
  { title: "id-card-photo", value: "0" },
  { title: "beneficiary-person-id-card-photo", value: "0" },
  { title: "book_bank_photo", value: "0" },
  { title: "marriage_relationship_certificate", value: "0" },
];

const imagesOthers = [
  { title: "passport_photo", value: "0" },
  { title: "beneficiary_passport_photo", value: "0" },
  { title: "cash_card_photo", value: "0" },
];

const connects = [{ title: "connect_phone_number" }, { title: "connect_facebook" }];

export interface InterfaceImage {
  type: string;
  key: string;
  url: string;
}

export default function AccountInfor() {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { screen } = useSelector((state: RootState) => state.updateAccountInfor);
  const { userInfor } = useSelector((state: RootState) => state.user);
  const [openModal, setOpenModal] = useState("");
  const [loadingDisconnect, setloadingDisconnect] = useState(false);
  const [imagesData, setImagesData] = useState<InterfaceImage[]>([]);
  const refFacebook = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const callAPI = async () => {
      const res = await axios.get(apiRoute.members.documents);
      setImagesData(res.data.images);
    };

    callAPI();

    return () => {
      dispatch(updateScreen(""));
    };
  }, [dispatch]);

  const handleChangeScreen = (val: string, disabled?: boolean) => () => {
    if (disabled) {
      return;
    }
    dispatch(updateScreen(val));
  };

  useEffect(() => {
    if (window) {
      window.encodeURversionmponent = encodeURIComponent;
    }
  }, []);

  const handleSwitch = (name: string) => (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (name === "connect_phone_number" && checked) {
      return dispatch(updateScreen("phone"));
    }

    if (name === "connect_facebook" && checked) {
      if (window) {
        console.log("connect_facebook");
        const FB = (window as any)?.FB;
        if (FB && FB?.getAccessToken()) {
          FB?.logout();
        }
        refFacebook.current?.click();
      }
    }

    if (!checked) {
      setOpenModal(name);
    }
  };

  const handleCloseModal = () => {
    setOpenModal("");
  };

  const handleConfirmModal = async () => {
    setloadingDisconnect(true);

    if (openModal === "connect_phone_number") {
      await axios.put(apiRoute.members.mobileConnection, {
        smsAuth: false,
      });

      dispatch(changePhoneConnectStatus(false));
    }

    if (openModal === "connect_facebook") {
      await axios.put(apiRoute.members.facebookConnection, {
        facebookAuth: false,
      });

      dispatch(changeFacebookConnectStatus(false));
    }

    setloadingDisconnect(false);
    handleCloseModal();
  };

  const dataDisplay: { [key: string]: string } = {
    full_name: userInfor
      ? `${userInfor.prefixName !== "Co.,Ltd." ? t(userInfor.prefixName) : t("Co_Ltd")} ${
          userInfor.firstName
        } ${userInfor.lastName}`
      : "",
    gender: userInfor ? t(`${userInfor.gender.toLowerCase()}`) : "",
    date_of_birth: userInfor ? dayjs(userInfor.birthday).format("DD - MM - YYYY") : "",
    email: userInfor ? userInfor.email : "",
    "phone-number": userInfor
      ? phoneNumberFormatter234(userInfor.phoneCode, userInfor.phoneNumber)
      : "",
    citizenship: userInfor ? userInfor.citizenship : "",
  };

  const dataDisplayConnects: { [key: string]: boolean } = {
    connect_phone_number: userInfor ? userInfor.smsAuth : false,
    connect_facebook: userInfor ? userInfor.facebookAuth : false,
  };

  const responseFacebook = async (response: ReactFacebookLoginInfo & { error?: boolean }) => {
    if (!response.id || response.error) {
      return;
    }

    try {
      await axios.put(apiRoute.members.facebookConnection, {
        facebookAuth: true,
        facebookId: response.id,
      });

      dispatch(changeFacebookConnectStatus(true));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const message = e.response?.data?.message || "";
      if (message) {
        notifyToast("error", message);
      }
    }
  };

  const handleSaveImage = async () => {
    const res = await axios.get(apiRoute.members.documents);
    setImagesData(res.data.images);
  };

  const photos = useMemo(
    () => (userInfor?.citizenship === "Thai" ? images : imagesOthers),
    [userInfor],
  );
  const width = useGetScreenWidth();

  return (
    <div className="md:mx-auto md:w-1216 relative mb-8 px-4 md:px-0 pt-5 md:pt-0">
      {width !== "Mobile" && <ModalUserSummaryInfo showIconSetting />}
      <div className="flex md:mt-6">
        <div className="col-span-2 hidden md:block">
          <LeftNavination />
        </div>
        <div className="md:pl-20 flex-grow">
          {/* Main  */}
          {userInfor && (
            <div>
              {screen === "" && (
                <div className="grid md:grid-cols-5">
                  <div className="md:col-span-3 relative">
                    {infors.map((item) => {
                      const disabled = item.title === "phone-number";
                      return (
                        <div
                          key={item.title}
                          className={`flex justify-between items-center mb-6 ${
                            disabled ? "" : "cursor-pointer"
                          }`}
                          onClick={handleChangeScreen("infor", disabled)}
                        >
                          <span>{t(`${item.title}`)}</span>
                          <div className="flex items-center" style={{ maxWidth: "70%" }}>
                            <span
                              className={`${disabled ? "text-lighterGray" : ""} line-clamp-1`}
                              style={{ wordBreak: "break-all" }}
                            >
                              {item.title === "citizenship"
                                ? t(dataDisplay[item.title])
                                : dataDisplay[item.title]}
                            </span>
                            <div className="ml-4">
                              <ChevronRightIcon className="text-lighterGray" />
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {photos.map((item) => (
                      <div
                        key={item.title}
                        className="flex justify-between items-center mt-6 cursor-pointer"
                        onClick={handleChangeScreen("images")}
                      >
                        <span className="capitalize">{t(`${item.title}`)}</span>
                        <div className="flex items-center">
                          {userInfor.documentStatus === "Complete" ? (
                            <span className="text-greenLight">{t`verified`}</span>
                          ) : (
                            <span className="text-lighterGray">{t`unverified`}</span>
                          )}

                          <div className="ml-4">
                            <ChevronRightIcon className="text-lighterGray" />
                          </div>
                        </div>
                      </div>
                    ))}

                    {connects.map((item) => (
                      <div
                        key={item.title}
                        className="flex justify-between items-center mt-6 cursor-pointer"
                      >
                        <span>{t(`${item.title}`)}</span>
                        <div className="flex items-center">
                          {/* <span>{item.value}</span> */}
                          <div className="text-right">
                            {/* <SwitchCustome checked={item.value === "1"} /> */}
                            <SwitchCustome
                              checked={dataDisplayConnects[item.title]}
                              onChange={handleSwitch(item.title)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {screen === "infor" && (
                <UpdateInfor onCancel={handleChangeScreen("")} user={userInfor} />
              )}

              {screen === "images" && (
                <UpdateImages
                  onCancel={handleChangeScreen("")}
                  images={imagesData}
                  citizenship={userInfor.citizenship}
                  onSave={handleSaveImage}
                />
              )}

              {["phone", "otp"].includes(screen) && <UpdatePhone screen={screen} />}
            </div>
          )}

          {!userInfor && (
            <div className="w-full h-full flex justify-center items-center">
              <CircularProgress />
            </div>
          )}
          <DialogCustome
            open={openModal !== ""}
            handleClose={handleCloseModal}
            handleConfirm={handleConfirmModal}
            loading={loadingDisconnect}
            buttonConfirmTite={t`submit`}
          >
            <div className="text-center mb-8 mt-6 text-sm">{t`confirm_message_not_revert`}</div>
          </DialogCustome>

          <div className="hidden">
            <ReactFacebookLogin
              appId={browserConfig.appID}
              autoLoad={false}
              // isMobile={true}
              disableMobileRedirect={true}
              fields="name,email,picture"
              callback={responseFacebook}
              reAuthenticate={true}
              render={(renderProps) => (
                <button ref={refFacebook} onClick={renderProps.onClick}>
                  Custom FB Button
                </button>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
