import useTranslation from "next-translate/useTranslation";
import { VerifyIcon } from "../svgs/verify";
import styles from "./style.module.css";

interface InforMoneyCardProps {
  title: string;
  value?: string | number;
  avatar: string;
  name: string;
  sponsorId: string;
  isVerified: boolean;
}

export default function SponserInforCard({
  title,
  avatar,
  isVerified,
  sponsorId,
  name,
}: InforMoneyCardProps) {
  const { t } = useTranslation("common");

  return (
    <div
      className={`pr-3 pl-3 pt-2 pb-3 flex flex-col justify-between ${styles.card_container}`}
      style={{ height: 110 }}
    >
      <p className="text-sm">{title}</p>
      <div className="flex items-center">
        <div className="w-3.75 h-3.75 mr-4 rounded-full bg-orangeSuperLight flex items-center justify-center relative">
          <div className="flex justify-center items-center h-full">
            {avatar && <img src={avatar} alt="avatar" className="w-3.75 h-3.75 rounded-full" />}
            {!avatar && (
              <div className="text-orange text-4xl uppercase">{name.charAt(0) || "A"}</div>
            )}
          </div>
        </div>
        <div>
          <div className="flex items-center">
            <p className="font-medium mr-3 line-clamp-1 break-all">{name}</p>
            {isVerified && <VerifyIcon className="-mt-1" />}
            {/* {showVerified && (
              <span className="text-0.875 font-light text-blue">{t`common:verified`}</span>
            )} */}
          </div>

        </div>
      </div>
    </div>
  );
}
