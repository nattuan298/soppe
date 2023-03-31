import { CircularProgress } from "@material-ui/core";
import ArrowRightNavigation from "@material-ui/icons/ChevronRight";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ButtonMui, LeftNavination } from "src/components";
import CartPvProcess from "src/components/analysis/cart_pv_process";
import InforMoneyCard from "src/components/analysis/infor_money_card";
import OtherInforCard from "src/components/analysis/other_infor-card";
import SponserInforCard from "src/components/analysis/sponser_infor_card";
import LeftNavinationReport from "src/components/left-navigation/left_navigation_report";
import { ModalUserSummaryInfo } from "src/components/user-summary";
import {
  routeOrganizationChart,
  routePointTopupBase,
  routeReportAnalysisBase,
} from "src/constants/routes";
import { useLocationBase } from "src/hooks";
import useGetScreenWidth from "src/hooks/useGetScreenWidth";
import { RootState } from "src/state/store";
import { PersonalStatisticType } from "types/api-response-type";

export default function ReportAnalysis({
  report,
  isMyAccount,
}: {
  report: PersonalStatisticType | null;
  isMyAccount?: boolean;
}) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { scmPoint, productValueLeft, productValueRight, eCommission } = useSelector(
    (state: RootState) => state.user,
  );
  const { symbol, currencyUnit } = useLocationBase();

  const handleClickSCMPoints = () => {
    router.push(routePointTopupBase);
  };

  const handleClickButtonAnalysis = () => {
    router.push(routeReportAnalysisBase);
  };

  const handleRedirectTree = () => {
    router.push(routeOrganizationChart);
  };
  const width = useGetScreenWidth();

  return (
    <div className="md:mx-auto w-full md:w-1216 relative mb-8 px-4 md:px-0 mt-4 md:mt-6">
      {width !== "Mobile" && <ModalUserSummaryInfo showDate width={330} />}
      <div className="flex">
        <div className="col-span-2">
          {isMyAccount ? <LeftNavination /> : <LeftNavinationReport />}
        </div>
        <div className="md:pl-20 md:flex-grow w-full">
          <div className="grid md:grid-cols-5">
            {!report && (
              <div className="md:col-span-5">
                <div className="w-full h-full flex justify-center items-center">
                  <CircularProgress />
                </div>
              </div>
            )}

            {report && (
              <div className="md:col-span-4">
                <div className="md:grid-cols-4 grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <InforMoneyCard
                      value={eCommission}
                      unit={currencyUnit}
                      icon={
                        <IconRounded
                          className="text-sm text-orangeYellow bg-orangeYellow"
                          text={symbol}
                        />
                      }
                    />
                  </div>
                  <div className="col-span-1">
                    <InforMoneyCard
                      value={scmPoint}
                      unit={t`points`}
                      icon={<IconRect text="SCMP" className="text-orange bg-orange text-xs" />}
                      iconEnd={
                        <div
                          className="w-6 h-6 rounded-full flex justify-center items-center bg-orange bg-opacity-10 cursor-pointer"
                          onClick={handleClickSCMPoints}
                        >
                          <ArrowRightNavigation className="text-orange" />
                        </div>
                      }
                    />
                  </div>
                  <div className="col-span-1">
                    <InforMoneyCard
                      value={productValueLeft}
                      unit="PV"
                      icon={<IconRounded className="text-blue bg-blue text-0.5" text="LPV" />}
                    />
                  </div>
                  <div className="col-span-1">
                    <InforMoneyCard
                      value={productValueRight}
                      unit="PV"
                      icon={<IconRounded className="text-blue bg-blue text-0.5" text="RPV" />}
                    />
                  </div>
                </div>

                <div className="md:grid-cols-2 grid gap-4 mt-7">
                  <div className="md:col-span-1">
                    <CartPvProcess
                      value={report.pvLeft}
                      title={t`pv_left_progress`}
                      title1={report.posCurrent}
                      title2={report.posLevel1}
                      title3={report.posLevel2}
                      value1={report.startLeft}
                      value2={report.pvLeft1}
                      value3={report.pvLeft2}
                      deductPv1={report.deductPvLeft1}
                      deductPv2={report.deductPvLeft2}
                    />
                  </div>
                  <div className="md:col-span-1">
                    <CartPvProcess
                      value={report.pvRight}
                      title={t`pv_right_progress`}
                      title1={report.posCurrent}
                      title2={report.posLevel1}
                      title3={report.posLevel2}
                      value1={report.startRight}
                      value2={report.pvRight1}
                      value3={report.pvRight2}
                      deductPv1={report.deductPvRight1}
                      deductPv2={report.deductPvRight2}
                    />
                  </div>
                </div>

                <div className="md:grid-cols-4 grid-cols-2 grid gap-4 mt-7">
                  <div className="col-span-1">
                    <OtherInforCard value={report.currentMatching} title={t`current_matching`} />
                  </div>
                  <div className="col-span-1">
                    <OtherInforCard value={report.highestPosition} title={t`highest_position`} />
                  </div>
                  <div className="col-span-1">
                    <OtherInforCard
                      value={report.productValueNewLeft}
                      title={t`left_branch_pv_this_month`}
                    />
                  </div>
                  <div className="col-span-1">
                    <OtherInforCard
                      value={report.productValueNewRight}
                      title={t`right_branch_pv_this_month`}
                    />
                  </div>
                </div>

                <div className="md:grid-cols-4 grid-cols-2 grid gap-4 mt-7">
                  <div className="col-span-1">
                    <OtherInforCard
                      value={report.productValueOldLeft}
                      title={t`left_branch_pv_carry_on`}
                    />
                  </div>
                  <div className="col-span-1">
                    <OtherInforCard
                      value={report.productValueOldRight}
                      title={t`right_branch_pv_carry_on`}
                    />
                  </div>
                  <div className="col-span-1">
                    <OtherInforCard value={report.bmcLeftHold} title={t`left_branch_bmc_pv`} />
                  </div>
                  <div className="col-span-1">
                    <OtherInforCard value={report.bmcRightHold} title={t`right_branch_bmc_pv`} />
                  </div>
                </div>

                <div className="md:grid-cols-4 grid-cols-2 grid gap-4 mt-7">
                  <div className="col-span-1">
                    <OtherInforCard value={report.startSup} title={t`star_sup`} />
                  </div>
                  <div className="col-span-1">
                    <OtherInforCard value={report.starEx} title={t`star_ex`} />
                  </div>
                  <div className="col-span-1">
                    <OtherInforCard value={report.badgePosition} title={t`badge_position`} />
                  </div>
                  <div className="col-span-1">
                    <OtherInforCard value={report.starPosition} title={t`star_position`} />
                  </div>
                </div>

                {report.sponsorInfo && Object.keys(report.sponsorInfo).length > 0 && (
                  <div className="md:grid-cols-2 grid gap-4 mt-7">
                    <div className="col-span-1">
                      <SponserInforCard
                        title={t`sponsor_referral_information`}
                        avatar={report.sponsorInfo.avatar}
                        isVerified={report.sponsorInfo.isVerified}
                        sponsorId={report.sponsorInfo.sponsorId}
                        name={report.sponsorInfo.fullName}
                      />
                    </div>
                  </div>
                )}

                <div className="md:grid-cols-2 grid gap-4 mt-7">
                  <div className="col-span-1">
                    <ButtonMui
                      onClick={handleRedirectTree}
                    >{t`view_my_organization_tree`}</ButtonMui>
                  </div>

                  {isMyAccount && (
                    <div className="col-span-1">
                      <ButtonMui
                        onClick={handleClickButtonAnalysis}
                      >{t`view_full_report_and_analysis`}</ButtonMui>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="hidden md:block col-span-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface IconRoundedProps {
  className: string;
  text: string;
}

const IconRounded = ({ className, text }: IconRoundedProps) => {
  return (
    <div>
      <div
        className={`w-6 h-6 rounded-full flex justify-center items-center bg-opacity-10 font-bold ${className}`}
      >
        {text}
      </div>
    </div>
  );
};

const IconRect = ({ className, text }: IconRoundedProps) => {
  return (
    <div>
      <div
        className={`w-10 h-5 flex justify-center items-center bg-opacity-10 font-medium rounded-[3px] ${className}`}
        // style={{ borderRadius: "3px" }}
      >
        {text}
      </div>
    </div>
  );
};
