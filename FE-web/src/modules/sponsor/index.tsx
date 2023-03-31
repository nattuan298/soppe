/* eslint-disable indent */
import { Cookies } from "react-cookie";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { ButtonMuiLight, LeftNavination } from "src/components";
import { CustomSelect } from "src/components/select/custom-select";
import styles from "./sponsor.module.css";
import { BRANCH, MEMBER } from "./sponsor.const";
import { notifyToast } from "src/constants/toast";
import { useLocationBase } from "src/hooks";
import { browserConfig } from "src/constants/browser-config";
import { CopyIcon } from "../../components/svgs";

// import { NEXT_PUBLIC_API_BASE_URL } from "src/constants/app";

// https://scmconnect.successmore.com/referrallink/{sponsorId}/{membertype}/{side}
// https://scmconnect.successmore.com/referrallink/?sponsorId=1&memberType=1&side=L

// import { NEXT_PUBLIC_API_BASE_URL } from "src/constants/app";

interface SelectType {
  memberType: string | number;
  team: string | number;
}

export function Sponsor() {
  const { t } = useTranslation("common");
  const cookies = new Cookies();
  const memberCookies = cookies.get("member");
  const { locationBase } = useLocationBase();

  const [values, setValues] = useState<SelectType>({
    memberType: "1",
    team: "L",
  });
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    setLink(
      `${browserConfig.url}/referrallink/?sponsorId=${memberCookies?.memberId}&memberType=${values.memberType}&side=${values.team}`,
    );
  }, [values.team, values.memberType, memberCookies]);

  const handleChangeSelect =
    (name: "memberType" | "team") =>
    ({ value, title }: { value: string | number; title: string }) => {
      if (title) {
        if (name === "memberType") {
          const newValues = { ...values, memberType: value };

          setValues(newValues);
        }
        if (name === "team") {
          const newValues = { ...values, team: value };
          setValues(newValues);
        }
      }
    };

  return (
    <div className="md:mx-auto md:w-1216 mt-8 px-4 md:px-0">
      <div className="float-left w-1/4 mb-8 hidden md:block">
        <LeftNavination />
      </div>
      {locationBase !== "Thailand" ? (
        t`only_in_thailand`
      ) : (
        <div className="md:float-left md:w-3/4 relative">
          <div className="w-full">
            <div className={`${styles.select}`}>
              <p className={`${styles.txtTitle}`}>
                {t`member-type`}
                <span className={`${styles.star}`}> *</span>
              </p>
              <CustomSelect
                defaultValue={MEMBER[0].value}
                options={MEMBER}
                onChange={handleChangeSelect("memberType")}
                t={t}
              />
            </div>
            <div className={`${styles.select}`}>
              <p className={`${styles.txtTitle}`}>
                {t`team`}
                <span className={`${styles.star}`}> *</span>
              </p>
              <CustomSelect
                defaultValue={BRANCH[0].value}
                options={BRANCH}
                onChange={handleChangeSelect("team")}
                t={t}
              />
            </div>
            <div className={`${styles.select}`}>
              <p className={`${styles.txtTitle}`}>
                {t`referral-link`}
                <span className={`${styles.star}`}> *</span>
              </p>
              <div className={`${styles.referralLink}`}>
                <span className={`${styles.txtLink}`} title={link}>
                  {link}
                </span>
              </div>
            </div>
            <div className={`${styles.btnShare}`}>
              <ButtonMuiLight
                onClick={() => {
                  navigator.clipboard.writeText(link);
                  notifyToast("default", "copy_success_referral", t);
                }}
              >
                <span className="float-left">{t`copy-link`}</span>

                <CopyIcon className={styles.shareIcon} fill={"#FFFFFF"} />
              </ButtonMuiLight>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
