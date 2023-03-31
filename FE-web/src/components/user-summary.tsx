import { CircularProgress, Paper } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "src/components";
import { IconQR } from "src/components/svgs";
import { VerifyIcon } from "src/components/svgs/verify";
import { RootState } from "src/state/store";
import SettingsIcon from "@material-ui/icons/Settings";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { routeAccountQRCodeBase } from "src/constants/routes";
import { ChangeEvent, useRef, useState } from "react";
import { notifyToast } from "src/constants/toast";
import { uploadImageFull } from "src/services/upload";
import axios from "src/lib/client/request";
import { apiRoute } from "src/constants/apiRoutes";
import { changeAvatar } from "src/feature/user/slice";
import classNames from "classnames";
interface SponsorType {
  showVerified?: boolean;
  showIconSetting?: boolean;
  showDate?: boolean;
  width?: number;
  className?: string;
}

export function ModalUserSummaryInfo({
  showVerified,
  showIconSetting,
  showDate,
  className,
}: SponsorType) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [loadingUpload, setLoadingUpload] = useState(false);

  const { userInfor, expireDate, joinedDate } = useSelector((state: RootState) => state.user);

  if (!userInfor) {
    return null;
  }

  const avatar = userInfor.avatar;
  const name = `${userInfor.firstName} ${userInfor.lastName}`;
  const sponsorId = userInfor.memberId;

  const handleClickUpload = () => {
    ref.current?.click();
  };

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // const acceptedFile = acceptedFiles[0];

    if (!file) {
      return notifyToast("error", "no_support_file_type", t);
    }

    setLoadingUpload(true);

    const data = await uploadImageFull({ file });
    await axios.put(`${apiRoute.members.uploadAvatar}`, {
      avatar: data.key,
    });
    dispatch(changeAvatar(data.url));
    setLoadingUpload(false);
  };

  return (
    <div
      className={classNames(
        `${
          router.pathname === "/scm-point-topup"
            ? "md:flex rounded-0.625 shadow-modalSummary md:right-0 md:w-max"
            : "md:flex md:absolute rounded-0.625 shadow-modalSummary md:right-0 md:w-max"
        }`,
        className,
      )}
      style={{
        height: showDate ? 85 : 70,
        top: showDate ? -116 : -109,
      }}
    >
      <Paper variant="outlined" className="py-1 px-2 rounded-0.625 w-full border-none">
        <div className="flex items-center w-full h-full">
          <div className="w-3.75 h-3.75 mr-4 rounded-full bg-orangeLight flex items-center justify-center relative">
            <div className="w-3.375 h-3.375 rounded-full bg-orangeSuperLight">
              <div className="flex justify-center items-center h-full">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="avatar"
                    className="w-3.375 h-3.375 rounded-full object-cover"
                  />
                ) : (
                  <div className="text-orange text-4xl uppercase">{name.charAt(0) || "A"}</div>
                )}
                {/* {!avatar && (
                  <div className="text-orange text-4xl uppercase">{name.charAt(0) || "A"}</div>
                )} */}
              </div>
              {loadingUpload && (
                <div className="w-full h-full flex justify-center items-center absolute top-0 left-0">
                  <CircularProgress size={25} />
                </div>
              )}
            </div>
            {showIconSetting && (
              <div
                className="absolute w-5 h-5 rounded-full flex justify-center items-center cursor-pointer"
                style={{ top: 2, right: 2, backgroundColor: "#E5F1FA" }}
                onClick={handleClickUpload}
              >
                <SettingsIcon className="w-4 h-4 text-blue" />
              </div>
            )}
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <div>
                    <Title title={name} className="text-1.125 text-orange line-clamp-1 break-all" />
                  </div>
                  {userInfor.documentStatus === "Complete" && (
                    <div>
                      <VerifyIcon className="-mt-1" />
                    </div>
                  )}
                  {showVerified && (
                    <span className="text-0.875 font-light text-blue">{t`common:verified`}</span>
                  )}
                </div>
                <span className="text-0.875 font-light">
                  {t`common:scm-business`} ({t`id`}: {sponsorId})
                </span>
              </div>
              <div
                className="ml-6"
                role="button"
                onClick={() => {
                  router.push(routeAccountQRCodeBase);
                }}
              >
                <IconQR />
              </div>
            </div>

            {showDate && (
              <div className="grid-cols-2 grid text-xs text-lighterGray gap-4 font-light">
                <div className="col-span-1 ">
                  {t`joined`}: {dayjs(joinedDate).format("DD-MM-YYYY")}{" "}
                </div>
                <div className="col-span-1 ">
                  {t`expired`}: {dayjs(expireDate).format("DD-MM-YYYY")}
                </div>
              </div>
            )}
          </div>
        </div>
      </Paper>
      <input
        type="file"
        accept="image/apng, image/bmp, image/jpeg, image/pjpeg, image/png, image/tiff, image/webp, image/x-icon"
        ref={ref}
        onChange={handleChangeImage}
        style={{ display: "none" }}
      />
    </div>
  );
}
