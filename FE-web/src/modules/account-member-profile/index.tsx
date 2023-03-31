/* eslint-disable indent */
import useTranslation from "next-translate/useTranslation";
import { VerifyIcon } from "src/components/svgs/verify";
import styles from "./account-member-profile.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getImageByKey } from "src/services/upload";
import { CircularProgress } from "@material-ui/core";

export function AccountMemberProfile() {
  const { t } = useTranslation("common");
  const [avt, setAvt] = useState<string>("");
  const router = useRouter();

  const [dataQuery] = useState({ ...router.query });
  useEffect(() => {
    const getImage = async () => {
      const image = await getImageByKey({ key: dataQuery.avatarKey as string });
      setAvt(image);
    };
    getImage();
  }, [dataQuery.avatarKey]);

  const handlePrefixName = (prefix: string): string => {
    if (prefix === "Co.,Ltd.") {
      return "Co_Ltd";
    }
    return prefix.slice(0, prefix.length);
  };

  return (
    <div className={`${styles.swapper} mx-auto w-full sm:w-1216`}>
      <div className="grid justify-items-center">
        <div className="w-72 grid justify-items-center">
          {!dataQuery.firstName ? (
            <div className="mt-12">
              <CircularProgress />
            </div>
          ) : (
            <>
              <div className={`${styles.avt} rounded-full flex items-center justify-center`}>
                {avt ? (
                  <div>
                    <img className={`${styles.imgAvatar}`} alt={t`error`} src={avt}></img>
                  </div>
                ) : (
                  <div className={`${styles.txtAvt} text-orange uppercase`}>
                    {(dataQuery.firstName as string).charAt(0) || "A"}
                  </div>
                )}
              </div>
              <div>
                {dataQuery.firstName && (
                  <span className={`${styles.txtName} float-left`}>
                    {dataQuery.firstName}&nbsp;{dataQuery.lastName}
                  </span>
                )}
                {dataQuery.documentStatus === "Complete" && (
                  <div>
                    <VerifyIcon className="mt-3.5 ml-1 float-left" />
                  </div>
                )}
              </div>
              <span className="text-0.875 font-light">
                {t`scm-business`} ({t`id`}: {dataQuery.id})
              </span>
              <div className={`w-64 ${styles.txtJoined} mt-1`}>
                <div className="w-1/2 float-left">
                  <p className="float-left">
                    {t`joined`}:&nbsp;&nbsp;{dataQuery.startDate}
                  </p>
                </div>
                <div className="w-1/2 float-left">
                  <p className="float-right">
                    {t`expired`}:&nbsp;&nbsp;{dataQuery.expiredDate}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className={`w-full sm:w-2/5 float-left  sm:p-0 p-4 ${styles.txtInformation}`}>
          <div className="h-12 w-full">
            <p className="float-left">{t`full-name`}</p>
            <p className="float-right">
              {t(handlePrefixName(dataQuery.prefixName as string))}&nbsp;{dataQuery.firstName}&nbsp;
              {dataQuery.lastName}
            </p>
          </div>
          <div className="h-12 w-full">
            <p className="float-left">{t`gender`}</p>
            <p className="float-right">{t((dataQuery.gender as string).toLocaleLowerCase())}</p>
          </div>
          <div className="h-12 w-full">
            <p className="float-left">{t`date-of-birth`}</p>
            <p className="float-right">{dataQuery.dateOfBirth}</p>
          </div>
          <div className="h-12 w-full">
            <p className="float-left">{t`email`}</p>
            <p className="float-right">{dataQuery.email}</p>
          </div>
          <div className="h-12 w-full">
            <p className="float-left">{t`phone-number`}</p>
            <p className="float-right">+{dataQuery.phoneNumber}</p>
          </div>
          <div className="h-12 w-full">
            <p className="float-left">{t`citizenship`}</p>
            <p className="float-right">{t(dataQuery.citizenship as string)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
