import { Button, ButtonProps, CircularProgress, makeStyles } from "@material-ui/core";
import classNames from "classnames";
import { forwardRef } from "react";

const useStyle = makeStyles({
  root: (props: ButtonMuiType) => {
    return {
      height: props.height || 50,
      fontSize: "1rem",
    };
  },
});

type ButtonMuiType = ButtonProps & {
  textClassName?: string;
  height?: number;
  showCircle?: boolean;
  colorSecondary?: boolean;
};

export const ButtonMui = forwardRef<HTMLButtonElement, ButtonMuiType>(
  (
    {
      textClassName,
      children,
      onClick,
      classes,
      height,
      disabled,
      colorSecondary,
      showCircle,
      ...props
    },
    ref,
  ) => {
    const classComponent = useStyle({ height });
    return (
      <Button
        fullWidth
        variant="contained"
        color={colorSecondary ? "secondary" : "primary"}
        classes={{ ...classComponent, ...classes }}
        onClick={onClick}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {showCircle ? (
          <CircularProgress size={30} style={{ color: "#ffffff" }} />
        ) : (
          <span className={classNames("normal-case", textClassName)}>{children}</span>
        )}
      </Button>
    );
  },
);

const useStyleLight = makeStyles({
  outlinedPrimary: {
    "&:hover": {
      background: "#FEFEFE",
      boxShadow: "1px 1px 5px #00000033",
    },
  },
});

export function ButtonMuiLight(props: ButtonMuiType) {
  const classes = useStyleLight();
  return <ButtonMui classes={classes} {...props} />;
}
const useStyleDelete = makeStyles({
  outlined: {
    borderColor: "#FF0000",
    color: "#FF0000",
    "&:hover": {
      backgroundColor: "#FFFFFF",
      color: "#FF0000",
      borderColor: "#FF0000",
    },
  },
});

export function ButtonMuiDelete(props: ButtonMuiType) {
  const classes = useStyleDelete();
  return <ButtonMui classes={classes} {...props} />;
}
