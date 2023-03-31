import { Paper } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
import { Title } from "src/components";
import { VerifyIcon } from "src/components/svgs/verify";
import { RootState } from "src/state/store";

interface SponsorType {
  showVerified?: boolean;
}

export function Sponsor({ showVerified }: SponsorType) {
  const { t } = useTranslation("common");

  const { fullName, sponsorId, avatar, isVerified } = useSelector(
    (state: RootState) => state.signup.sponsor,
  );
  return (
    <Paper variant="outlined" className="mt-2 mb-4 py-2 px-4">
      <Title title={t`sponsor`} className="mb-1" />
      <div className="flex items-center">
        <div className="w-15 h-15 rounded-full bg-orangeSuperLight flex items-center justify-center mr-2">
          {avatar && <img src={avatar} alt="avatar" className="w-15 h-15 rounded-full" />}
          {!avatar && (
            <div className="text-orange text-4xl uppercase">{fullName.charAt(0) || "A"}</div>
          )}
        </div>
        <div>
          <div className="flex items-center">
            <Title title={fullName} className="text-base font-medium mr-2" />
            {isVerified && <VerifyIcon />}
            {showVerified && isVerified && (
              <span className="text-0.625 text-blue">{t`verified`}</span>
            )}
          </div>
          <span className="text-sm font-light">
            {t`scm-business`} (ID: {sponsorId})
          </span>
        </div>
      </div>
    </Paper>
  );
}
