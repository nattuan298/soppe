import Switch, { SwitchClassKey, SwitchProps } from "@material-ui/core/Switch";
import { useStyles } from "./styles";
interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}
interface Props extends SwitchProps {
  classes?: Styles;
  values?: boolean;
}
export function SwitchCustom({ values, className, ...props }: Props) {
  const classes = useStyles();
  return (
    <>
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    </>
  );
}
