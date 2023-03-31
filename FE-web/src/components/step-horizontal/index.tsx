import { Step, StepConnector, StepLabel, Stepper } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import useTranslation from "next-translate/useTranslation";
import StepIcon from "./step-icon";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": { backgroundColor: "#FF7500" },
  },
  completed: {
    "& $line": {
      backgroundColor: "#FF7500",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#F4F5FA",
  },
})(StepConnector);

const useStyle = makeStyles({
  root: {
    padding: 0,
  },
  alternativeLabel: {
    marginTop: "0 !important",
  },
  muiStepRootFirst: {
    paddingLeft: 0,
  },
  muiStepRootLast: {
    paddingRight: 0,
  },
});

interface StepHorizontalPropsType {
  steps: Array<string>;
  activeStep: number;
}

export function StepHorizontal({ steps, activeStep }: StepHorizontalPropsType) {
  const classes = useStyle();
  const { t } = useTranslation("common");

  return (
    <>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        classes={{ root: classes.root }}
        className="step-singup"
      >
        {steps.map((label, index) => {
          let stepClass: false | { horizontal: string } | {} = index === 0 && {
            horizontal: classes.muiStepRootFirst,
          };
          if (!stepClass) {
            stepClass = index === steps.length - 1 ? { horizontal: classes.muiStepRootLast } : {};
          }

          return (
            <Step key={label} classes={stepClass}>
              <StepLabel
                StepIconComponent={StepIcon}
                classes={{ alternativeLabel: classes.alternativeLabel }}
              >
                <span className="text-brown text-0.5 font-normal">{t(label)}</span>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </>
  );
}
