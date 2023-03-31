/* eslint-disable indent */
import useTranslation from "next-translate/useTranslation";
import { LeftNavination } from "src/components";
import { VerifyIcon } from "src/components/svgs/verify";
import QRCode from "qrcode.react";
import styles from "./account-qr-code.module.css";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { phoneNumberFormatter22 } from "src/lib/format";
import { ModalUserSummaryInfo } from "src/components/user-summary";
import { useSelector } from "react-redux";
import { RootState } from "src/state/store";
import { browserConfig } from "src/constants/browser-config";
import { Cookies } from "react-cookie";

export function AccountQRCode() {
  const { t } = useTranslation("common");
  const [values, setValue] = useState<string>("");
  const cookie = new Cookies();
  const member = cookie.get("member");
  const { userInfor } = useSelector((state: RootState) => state.user);

  const phone = phoneNumberFormatter22(userInfor?.phoneCode, userInfor?.phoneNumber);

  useEffect(() => {
    // const inforUser = `http://localhost:3000/account-member-profile?avatarKey=${
    const inforUser = `${browserConfig.url}/account-member-profile/?avatarKey=${
      userInfor?.avatarKey
    }&id=${userInfor?.memberId}&firstName=${userInfor?.firstName}&lastName=${
      userInfor?.lastName
    }&gender=${userInfor?.gender}&dateOfBirth=${dayjs(userInfor?.birthday).format(
      "DD-MM-YYYY",
    )}&email=${userInfor?.email}&phoneNumber=${phone}&citizenship=${
      userInfor?.citizenship
    }&startDate=${dayjs(member?.joinedDate).format("DD-MM-YYYY")}&expiredDate=${dayjs(
      member?.expireDate,
    ).format("DD-MM-YYYY")}&documentStatus=${userInfor?.documentStatus}&prefixName=${
      userInfor?.prefixName
    }`;

    setValue(inforUser);
  }, [
    userInfor?.prefixName,
    userInfor?.phoneCode,
    userInfor?.phoneNumber,
    userInfor?.firstName,
    userInfor?.gender,
    userInfor?.lastName,
    userInfor?.birthday,
    userInfor?.email,
    userInfor?.citizenship,
    userInfor?.avatarKey,
    member?.expireDate,
    member?.joinedDate,
    userInfor?.memberId,
    userInfor?.documentStatus,
    phone,
  ]);

  return (
    <div className="mx-auto sm:w-1216 w-auto mt-5 sm:mt-6 relative min-h-[647px] sm:min-h-0">
      <div className="float-left w-1/4 sm:mb-8">
        <LeftNavination />
      </div>
      <div className="sm:block hidden">
        <ModalUserSummaryInfo />
      </div>
      <div className="float-left w-full sm:mt-10 sm:w-3/4 relative">
        <div className="grid justify-items-center">
          <div className="w-full sm:w-72 grid justify-items-center">
            <div className={`${styles.avt} rounded-full flex items-center justify-center`}>
              {userInfor?.avatar ? (
                <div>
                  <img
                    className={`${styles.imgAvatar}`}
                    alt={t`error`}
                    src={userInfor.avatar}
                  ></img>
                </div>
              ) : (
                <div className={`${styles.txtAvt} text-orange uppercase`}>
                  {userInfor?.firstName.charAt(0) || "A"}
                </div>
              )}
            </div>
            <div className="flex items-center">
              {userInfor && (
                <span className={`${styles.txtName} float-left`}>
                  {userInfor?.firstName}&nbsp;{userInfor?.lastName}
                </span>
              )}
              {userInfor?.documentStatus === "Complete" && (
                <div>
                  <VerifyIcon className="mt-3.5 ml-1 float-left" />
                </div>
              )}
            </div>
            <span className="text-0.875 font-light">
              {t`scm-business`} ({t`id`}: {userInfor?.memberId})
            </span>
            <div>
              <QRCode id="qr-gen" value={values} size={250} level={"M"} includeMargin={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
