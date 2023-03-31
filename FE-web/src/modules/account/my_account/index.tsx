import ArrowRightNavigation from "@material-ui/icons/ChevronRight";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ButtonMui } from "src/components";
import CartPvProcessFull from "src/components/analysis/cart_pv_process_full";
import InforMoneyCard from "src/components/analysis/infor_money_card";
import OtherInforCard from "src/components/analysis/other_infor-card";
// import SponserInforCard from "src/components/analysis/sponser_infor_card";
import LeftNavinationReport from "src/components/left-navigation/left_navigation_report";
import { ModalUserSummaryInfo } from "src/components/user-summary";
import {
  routeOrganizationChart,
  routePointTopupBase,
  routeReportAnalysisBase,
} from "src/constants/routes";
import { useLocationBase } from "src/hooks";
import { RootState } from "src/state/store";

export default function MyAccount() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { scmPoint, productValueLeft, productValueRight } = useSelector(
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

  return (
    <div className="mx-auto w-1216 relative mb-8">
      <ModalUserSummaryInfo showDate width={330} />
      <div className="flex mt-6">
        <div className="col-span-2">
          <LeftNavinationReport />
        </div>
        <div className="pl-20 flex-grow">
          <div className="grid grid-cols-5">
            <div className="col-span-4">
              <div className="grid-cols-4 grid gap-4">
                <div className="col-span-1">
                  <InforMoneyCard
                    value={productValueLeft + productValueRight}
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

              <div className="mt-7">
                <CartPvProcessFull value={30} title={t`pv_progress`} />
              </div>

              <div className="grid-cols-4 grid gap-4 mt-7">
                <div className="col-span-1">
                  <OtherInforCard value="SU" title={t`current_matching`} />
                </div>
                <div className="col-span-1">
                  <OtherInforCard title={t`highest_position`} />
                </div>
                <div className="col-span-1">
                  <OtherInforCard value={24000} title={t`left_branch_pv_this_month`} />
                </div>
                <div className="col-span-1">
                  <OtherInforCard value={15000} title={t`right_branch_pv_this_month`} />
                </div>
              </div>

              <div className="grid-cols-4 grid gap-4 mt-7">
                <div className="col-span-1">
                  <OtherInforCard value={0} title={t`left_branch_pv_carry_on`} />
                </div>
                <div className="col-span-1">
                  <OtherInforCard value={0} title={t`right_branch_pv_carry_on`} />
                </div>
                <div className="col-span-1">
                  <OtherInforCard value={0} title={t`left_branch_bmc_pv`} />
                </div>
                <div className="col-span-1">
                  <OtherInforCard value={0} title={t`right_branch_bmc_pv`} />
                </div>
              </div>

              <div className="grid-cols-4 grid gap-4 mt-7">
                <div className="col-span-1">
                  <OtherInforCard value={1} title={t`star_sup`} />
                </div>
                <div className="col-span-1">
                  <OtherInforCard value={0} title={t`star_ex`} />
                </div>
                <div className="col-span-1">
                  <OtherInforCard title={t`badge_position`} />
                </div>
                <div className="col-span-1">
                  <OtherInforCard title={t`star_position`} />
                </div>
              </div>

              <div className="grid-cols-2 grid gap-4 mt-7">
                <div className="col-span-1">{/* <SponserInforCard title={t`sponsor`} /> */}</div>
              </div>

              <div className="grid-cols-2 grid gap-4 mt-7">
                <div className="col-span-1">
                  <ButtonMui onClick={handleRedirectTree}>{t`view_my_organization_tree`}</ButtonMui>
                </div>

                <div className="col-span-1">
                  <ButtonMui
                    onClick={handleClickButtonAnalysis}
                  >{t`view_full_report_and_analysis`}</ButtonMui>
                </div>
              </div>
            </div>

            <div className="col-span-1" />
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
        className={`w-10 h-5 flex justify-center items-center bg-opacity-10 font-medium ${className}`}
        style={{ borderRadius: "3px" }}
      >
        {text}
      </div>
    </div>
  );
};
