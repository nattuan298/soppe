import useTranslation from "next-translate/useTranslation";
import { TrackingType } from "types/orders";
import EachStep from "./each-step";

export default function TrackStep({
  steps,
  firstStep,
}: {
  steps: TrackingType[];
  firstStep: {
    statusCode: string;
    statusDesc: string;
    updateDate: string;
  };
}) {
  const { t } = useTranslation("common");

  const length = steps.length;

  return (
    <div>
      <p className="font-medium">{t`track_package`}</p>
      {steps.map((item, index) => {
        return (
          <EachStep
            key={index}
            showTopLine={index !== 0}
            isSelected={index === 0}
            showBottomLine
            title={item.statusDesc}
            desc={item.statusDesc}
            date={item.updateDate}
          />
        );
      })}
      <EachStep
        showTopLine={length > 0}
        isSelected={length === 0}
        showBottomLine={false}
        title={firstStep.statusCode}
        desc={firstStep.statusDesc}
        date={firstStep.updateDate}
      />
    </div>
  );
}
