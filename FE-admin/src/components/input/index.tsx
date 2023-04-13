import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  MouseEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import InputBase, { InputBaseProps } from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { notifyToast } from "src/constants/toast";
import { useTranslation } from "react-i18next";

import { CopyIcon } from "src/components/icons";
import { VisibilityOffBlack } from "src/components";
import { useStyles } from "./styles";
import "./styles.css";

interface InputProps extends InputBaseProps {
  errorMessage?: string;
  className?: string;
  disabled?: boolean;
  multiline?: boolean;
  placeholder?: string;
  maxLength?: number;
  label?: string;
  required?: boolean;
}

// Text Input
export function Input({
  className,
  errorMessage,
  multiline,
  placeholder,
  disabled,
  maxLength,
  label,
  required,
  ...props
}: InputProps) {
  const { input, error, multilinecss } = useStyles();

  const inputClass = clsx(
    className && className,
    multiline && multilinecss,
    input,
    errorMessage && error,
  );
  return (
    <div className={clsx("w-full", label && "flex flex-col w-full")}>
      {label && <Label required={required}>{label}</Label>}
      <InputBase
        className={clsx("w-full", inputClass, disabled && "bg-graySearch-light", "plc")}
        disabled={disabled}
        multiline={multiline}
        placeholder={placeholder}
        inputProps={{
          form: {
            autocomplete: "new-password",
          },
          maxLength: maxLength ? 6 : 255,
        }}
        {...props}
      />
      <p className="text-sm mb-1">{errorMessage}</p>
    </div>
  );
}

interface InputVerifyOtpProps {
  errorMessage?: string;
  className?: string;
  disabled?: boolean;
  multiline?: boolean;
  placeholder?: string;
  maxLength?: number;
}

// Text Input
export function InputVerifyOtp({
  className,
  errorMessage,
  multiline,
  placeholder,
  disabled,
  maxLength,
  ...props
}: InputVerifyOtpProps) {
  const { input, error, multilinecss } = useStyles();

  const inputClass = clsx(
    className && className,
    multiline && multilinecss,
    input,
    errorMessage && error,
  );
  return (
    <>
      <input
        className={clsx(inputClass, disabled && "bg-graySearch-light", "plc")}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      <p className="text-sm">{errorMessage}</p>
    </>
  );
}

interface PasswordInputProps extends InputProps {
  showPassword?: boolean;
  errorMessage?: string;
  className?: string;
  disabled?: boolean;
  multiline?: boolean;
  changePassword?: boolean;
}

// Password Input
export function PasswordInput({
  showPassword = true,
  className,
  errorMessage,
  changePassword,
  ...props
}: PasswordInputProps) {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const { input, password, error, inputChangePassword } = useStyles();

  const inputClass = clsx(className && className, input, password, errorMessage && error);
  const inputChangePasswordClass = clsx(
    className && className,
    inputChangePassword,
    password,
    errorMessage && error,
  );

  function handleClickShowPassword(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsShowPassword(!isShowPassword);
  }

  return (
    <>
      <InputBase
        className={clsx(!changePassword ? inputClass : inputChangePasswordClass)}
        type={isShowPassword ? "text" : "password"}
        endAdornment={
          showPassword && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                <VisibilityOffBlack className={clsx(isShowPassword && "show-password")} />
              </IconButton>
            </InputAdornment>
          )
        }
        inputProps={{
          autocomplete: "new-password",
        }}
        {...props}
      />
      {errorMessage && <p className="text-sm">{errorMessage}</p>}
    </>
  );
}

export function PasswordGeneratorInput({
  showPassword = true,
  className,
  errorMessage,
  ...props
}: PasswordInputProps) {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const { input, password, error } = useStyles();

  const inputClass = clsx(className && className, input, password, errorMessage && error);

  function handleClickShowPassword(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsShowPassword(!isShowPassword);
  }

  return (
    <div className="relative">
      <InputBase
        className={inputClass}
        type={isShowPassword ? "text" : "password"}
        endAdornment={
          showPassword && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                <VisibilityOffBlack className={clsx(isShowPassword && "show-password")} />
              </IconButton>
            </InputAdornment>
          )
        }
        inputProps={{
          autocomplete: "new-password",
        }}
        {...props}
      />
      {errorMessage && <p className="text-sm absolute">{errorMessage}</p>}
    </div>
  );
}

interface CopyableInputProps extends InputProps {
  onChangeValue?: (value: string) => void;
  value?: string;
}
// Copyable Input
export function CopyableInput({
  className,
  onChangeValue,
  value,
  errorMessage,
  ...props
}: CopyableInputProps) {
  const { t } = useTranslation("common");
  const [inputValue, setInputValue] = useState<string>("");
  const { input, password, error } = useStyles();

  useEffect(() => {
    if (value) {
      setInputValue(value);
    }
  }, [value]);

  const inputClass = clsx(className && className, input, password, errorMessage && error);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setInputValue(value);
    onChangeValue && onChangeValue(value);
  };

  const handleOnCopy = (): void => {
    notifyToast("default", "copy_success", t);
  };

  return (
    <div className="relative">
      <InputBase
        className={inputClass}
        endAdornment={
          <InputAdornment position="end">
            <CopyToClipboard text={value ? value : inputValue} onCopy={handleOnCopy}>
              <IconButton aria-label="toggle password visibility" edge="end">
                <CopyIcon />
              </IconButton>
            </CopyToClipboard>
          </InputAdornment>
        }
        inputProps={{
          autocomplete: "new-password",
        }}
        value={inputValue || value}
        onChange={handleChange}
        {...props}
      />
      {errorMessage && <p className="text-sm absolute">{errorMessage}</p>}
    </div>
  );
}

// Label
interface LabelProps extends ComponentPropsWithoutRef<"label"> {
  className?: string;
  required?: boolean;
  children?: ReactNode;
}

export function Label({ children, required, className, ...props }: LabelProps) {
  const labelClass = clsx(className && className, "text-sm label");
  return (
    <label className={labelClass} {...props}>
      {children}
      {required && <span className="required-field">*</span>}
    </label>
  );
}

export function InputOnlyNumber({
  className,
  errorMessage,
  disabled,
  onChange,
  ...props
}: InputProps) {
  const reg = /^$|^[0-9]+$/;
  const { input, error } = useStyles();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (reg.test(value)) {
      onChange?.(e);
    }
  };

  const inputClass = clsx(
    className && className,
    input,
    errorMessage && error,
    disabled && "bg-graySearch-light",
  );

  return (
    <>
      <InputBase
        className={inputClass}
        disabled={disabled}
        onChange={handleChange}
        inputProps={{
          autocomplete: "new-password",
        }}
        {...props}
      />
      <p className="text-sm">{errorMessage}</p>
    </>
  );
}
