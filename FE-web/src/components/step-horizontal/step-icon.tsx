import { StepIconProps } from "@material-ui/core/StepIcon";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";

const useStyles = makeStyles({
  root: {
    zIndex: 1,
    backgroundColor: "#FFF1E5",
    color: "#FF7500",
    width: 45,
    height: 45,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    border: "5px solid #FFFFFF",
    fontSize: 14,
  },
  active: {
    borderColor: "#FFF1E5",
    backgroundColor: "#FF7500",
    color: "#FFFFFF",
  },
  completed: {
    backgroundColor: "#FF7500",
    color: "#FFFFFF",
  },
});

export default function StepIcon(props: StepIconProps) {
  const classes = useStyles();
  const { active, completed } = props;

  return (
    <div
      className={classnames(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {props.icon}
    </div>
  );
}
