import { FormHelperText, OutlinedInput, OutlinedInputProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  input: {
    fontSize: "0.875rem",
  },
  root: {
    height: 90,
  },
  disabled: {
    backgroundColor: "#F4F5FA",
    color: "#231F20",
  },
});

interface InputCustomeProps {
  maxLen?: number;
  helperText?: string;
  t?: (text: string) => string;
}

export default function InputCustome({
  helperText,
  maxLen,
  t,
  ...props
}: OutlinedInputProps & InputCustomeProps) {
  const classes = useStyle();
  return (
    <>
      <OutlinedInput
        fullWidth
        classes={classes}
        multiline
        rows={3}
        inputProps={maxLen ? { maxLength: maxLen } : { maxLength: 255 }}
        {...props}
      />
      {helperText && <FormHelperText error>{t ? t(`${helperText}`) : helperText}</FormHelperText>}
    </>
  );
}
