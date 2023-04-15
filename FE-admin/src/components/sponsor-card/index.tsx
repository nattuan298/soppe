import { useTranslation } from "react-i18next";
import { VerifyIcon } from "src/components/icons/VerifyIcon";
import { COMPLETE } from "src/constants/common.constants";

interface SponsorType {
  showVerified?: boolean;
  sponsorData?: {
    avatar?: string;
    name?: string;
    sponsorId: string;
    documentStatus?: string;
  };
}
export function SponsorCard({ showVerified, sponsorData }: SponsorType) {
  const { t } = useTranslation("common");

  return (
    <div>
      <div className="flex items-center">
        <div className="w-15 h-15 rounded-full bg-orangeSuperLight flex items-center justify-center mr-4">
          {sponsorData?.avatar && (
            <img
              src={sponsorData?.avatar}
              alt="avatar"
              className="w-15 h-15 rounded-full object-cover"
            />
          )}
          {!sponsorData?.avatar && (
            <div className="text-orange-light text-4xl uppercase">
              {sponsorData?.name ? sponsorData.name.charAt(0) || "A" : ""}
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center">
            <div className="text-base font-medium mr-2">
              <span>{sponsorData?.name ? sponsorData?.name : ""}</span>
            </div>
            {sponsorData?.documentStatus === COMPLETE ? <VerifyIcon /> : null}
            {showVerified && <span className="text-xs text-blue">{t`verified`}</span>}
          </div>
          <span className="text-sm font-light">
            {t`scm-business`} ({t("id")}: {sponsorData?.sponsorId})
          </span>
        </div>
      </div>
    </div>
  );
}
