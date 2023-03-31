import { createStyles, withStyles } from "@material-ui/core/styles";
import Switch, { SwitchProps } from "@material-ui/core/Switch";

const SwitchCustome = withStyles(() =>
  createStyles({
    root: {
      width: 55,
      height: 26,
      padding: 0,
      borderRadius: 13,
    },
    track: {
      opacity: 1,
      backgroundColor: "#F4F5FA",
    },

    switchBase: {
      padding: 3,

      "&.Mui-checked": {
        transform: "translateX(30px)",
        color: "#FFFFFF",
        "& + $track": {
          backgroundColor: "#8DC900",
          opacity: 1,
          border: "none",
        },
      },
    },
  }),
)((props: SwitchProps) => {
  return <Switch color="default" {...props} />;
});

export default SwitchCustome;
