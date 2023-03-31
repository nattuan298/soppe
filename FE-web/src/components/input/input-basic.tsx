import { FormHelperText, OutlinedInput, OutlinedInputProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ReactNode } from "react";

const useStyle = makeStyles({
  input: {
    paddingTop: 17,
    paddingBottom: 17,
    fontSize: "0.875rem",
    height: 16,
  },
  disabled: {
    backgroundColor: "#F4F5FA",
    color: "#231F20",
  },
});

export type InputCustomeType = OutlinedInputProps & {
  helperText?: ReactNode;
  maxlegth?: number;
  t?: (text: string) => string;
};

export default function InputBasic({ helperText, maxlegth = 255, t, ...props }: InputCustomeType) {
  const classes = useStyle();
  return (
    <>
      <OutlinedInput fullWidth classes={classes} inputProps={{ maxLength: maxlegth }} {...props} />
      {helperText && <FormHelperText error>{t ? t(`${helperText}`) : helperText}</FormHelperText>}
    </>
  );
}
