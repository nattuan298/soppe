import { useMemo } from "react";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
import { RootState } from "src/state/store";

import cls from "../organization.module.css";

interface LineTypeProps {
  label: string;
  date?: string;
  result?: string | number | boolean;
  className?: string;
  labelClass?: string;
}

const LineSumary = ({ label, date, result, className, labelClass }: LineTypeProps) => {
  const resultLabel = useMemo(() => {
    if (typeof result === "boolean") {
      return (
        <div className={`${result ? "text-greenLight" : "text-red"} text-xs`}>
          {result ? "True" : "False"}
        </div>
      );
    }
    return <div className="text-black-dark font-normal text-xs">{result || "_"}</div>;
  }, [result]);

  return (
    <div className={`w-full flex items-center justify-items-start ${className}`}>
      <div className={`${labelClass} text-black-dark font-medium text-xs`}>{label}</div>
      <div className="mx-4 font-medium text-xs text-black-dark">:</div>
      {resultLabel}
      {date && <div className="text-black-dark font-normal text-xs ml-2">{`(${date})`}</div>}
    </div>
  );
};

export default function SummaryTree() {
  const { t } = useTranslation("common");
  const { organizationTree } = useSelector((state: RootState) => state.organization);
  return (
    <div className="grid grid-cols-8 gap-7">
      <div className="col-span-3">
        <LineSumary
          label={t`current_matching`}
          result={organizationTree.currentMatching}
          className="mb-4"
          labelClass={cls.lableLine}
        />
        <LineSumary
          label={t`highest_position`}
          result={organizationTree.highestPosition}
          className="mb-4"
          labelClass={cls.lableLine}
        />
        <LineSumary
          label={t`badge_position`}
          result={organizationTree.badgePosition}
          className="mb-4"
          labelClass={cls.lableLine}
        />
        <LineSumary
          label={t`star_position`}
          result={organizationTree.starPosition}
          className="mb-4"
          labelClass={cls.lableLine}
        />
        <LineSumary
          label={t`application_form`}
          result={organizationTree.applicationForm}
          className="mb-4"
          labelClass={cls.lableLine}
        />
        <LineSumary
          label={t`copy_of_self_id_card`}
          result={organizationTree.copyOfSelfIDCard}
          className="mb-4"
          labelClass={cls.lableLine}
        />
        <LineSumary
          label={t`book_bank`}
          result={organizationTree.bookBank}
          labelClass={cls.lableLine}
        />
      </div>
      <div className="col-span-2">
        <LineSumary
          label={t`private_pv_this_month`}
          result={organizationTree.privatePVthisMoth}
          className="mb-4"
          labelClass={cls.lableLine2}
        />
        <LineSumary
          label={t`left_pv_carry_on`}
          result={organizationTree.pvLeft}
          className="mb-4"
          labelClass={cls.lableLine2}
        />
        <LineSumary
          label={t`left_pv_this_month`}
          result={organizationTree.pvLeftThisMonth}
          className="mb-4"
          labelClass={cls.lableLine2}
        />
        <LineSumary
          label={t`left_pv_total`}
          result={organizationTree.pvRight}
          className="mb-4"
          labelClass={cls.lableLine2}
        />
        <LineSumary
          label={t`bmc_left_pv_hold`}
          result={organizationTree.bmcPVLeft}
          className="mb-4"
          labelClass={cls.lableLine2}
        />
        <LineSumary
          label={t`star_sup`}
          result={organizationTree.starSup}
          labelClass={cls.lableLine2}
        />
      </div>
      <div className="col-span-3">
        <LineSumary
          label={t`private_pv_first_60_days`}
          result={organizationTree.privatePVFirstSixtyDays}
          labelClass={cls.lableLine3}
          className="mb-4"
        />
        <LineSumary
          label={t`right_pv_carry_on`}
          result={organizationTree.pvRight}
          labelClass={cls.lableLine3}
          className="mb-4"
        />
        <LineSumary
          label={t`right_pv_this_month`}
          result={organizationTree.pvRightThisMonth}
          labelClass={cls.lableLine3}
          className="mb-4"
        />
        <LineSumary
          label={t`right_pv_total`}
          result={organizationTree.totalPVRight}
          labelClass={cls.lableLine3}
          className="mb-4"
        />
        <LineSumary
          label={t`bmc_right_pv_hold`}
          result={organizationTree.bmcPVRight}
          labelClass={cls.lableLine3}
          className="mb-4"
        />
        <LineSumary
          label={t`star_ex`}
          result={organizationTree.startEx}
          labelClass={cls.lableLine3}
        />
      </div>
    </div>
  );
}
