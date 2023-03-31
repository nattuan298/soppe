import { Paper } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
import { Title } from "src/components";
import { IconQR } from "src/components/svgs";
import { VerifyIcon } from "src/components/svgs/verify";
import { RootState } from "src/state/store";

interface SponsorType {
  showVerified?: boolean;
}

export function SponsorSummary({ showVerified }: SponsorType) {
  const { t } = useTranslation("common");

  const { userInfor } = useSelector((state: RootState) => state.user);

  if (!userInfor) {
    return null;
  }

  const avatar = userInfor.avatar;
  const name = `${userInfor.firstName} ${userInfor.lastName}`;
  const sponsorId = userInfor.memberId;

  return (
    <Paper variant="outlined" className="py-1 px-2 rounded-0.625 shadow-modalSummary">
      <div className="flex items-center">
        <div className="w-3.75 h-3.75 mr-4 rounded-full bg-orangeLight flex items-center justify-center">
          <div className="w-3.375 h-3.375 rounded-full bg-orangeSuperLight">
            <div className="flex justify-center items-center h-full">
              {avatar && <img src={avatar} alt="avatar" className="w-3.75 h-3.75 rounded-full" />}
              {!avatar && (
                <div className="text-orange text-4xl uppercase">{name.charAt(0) || "A"}</div>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center">
            <Title title={name} className="text-1.125 text-orange mr-3" />
            <VerifyIcon className="-mt-1" />
            {showVerified && <span className="text-0.875 font-light text-blue">{t`verified`}</span>}
          </div>
          <span className="text-0.875 font-light">
            {t`scm-business`} (ID: {sponsorId})
          </span>
        </div>
        <div className="ml-5" role="button">
          <IconQR />
        </div>
      </div>
    </Paper>
  );
}
