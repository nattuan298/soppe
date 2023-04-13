import Icon from "@mdi/react";
import { IconProps } from "@mdi/react/dist/IconProps";
import classnames from "classnames";
import { ComponentPropsWithoutRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { LoadingIndicator } from "./animation/loading-indicator";

type DefaultLoaderProps = ComponentPropsWithoutRef<"div"> & {};
type LoaderProps = DefaultLoaderProps & {
  size?: number;
};
type DefaultButtonProps = ComponentPropsWithoutRef<"button"> & {
  loading?: boolean;
};

type ButtonVariant = "outline" | "text" | "primary";

type ButtonProps = DefaultButtonProps & {
  colorClass?: string;
  variant?: ButtonVariant;
  loadingSize?: number;
};

const BUTTON_VARIANT_CLASS: Record<ButtonVariant, string> = {
  outline: "bg-white",
  primary: "bg-orange-light text-white hover:bg-orange-hover",
  text: "",
};
const BUTTON_VARIANT_DEFAULT_COLOR: Record<ButtonVariant, string> = {
  outline: "text-primary",
  primary: "text-white",
  text: "",
};

const DEFAULT_BUTTON_CLASSES =
  "rounded focus:outline-none ring-btn-focus disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none";

export function Button({
  children,
  variant,
  colorClass,
  className,
  type,
  loading,
  disabled,
  loadingSize,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={classnames(
        DEFAULT_BUTTON_CLASSES,
        className,
        !className?.includes("font-") && "font-normal",
        !className?.includes("p-") && "px-3 py-2",
        variant === BUTTON_VARIANT_CLASS.outline && !className?.includes("") && "",
        colorClass || BUTTON_VARIANT_DEFAULT_COLOR[variant || "outline"],
        BUTTON_VARIANT_CLASS[variant || "outline"],
      )}
      type={type || "button"}
      disabled={loading || disabled}
      {...rest}
    >
      {loading ? <Loader size={loadingSize} /> : children}
    </button>
  );
}

const DEFAULT_BUTTON_LINK_CLASSES =
  "rounded focus:outline-none disabled:text-gray disabled:cursor-not-allowed";

type ButtonLinkProps = ComponentPropsWithoutRef<Link> & {
  variant?: ButtonVariant;
  disabled?: boolean;
};

export function ButtonLink({ children, className, variant, disabled, ...rest }: ButtonLinkProps) {
  return (
    <Link
      className={classnames(
        DEFAULT_BUTTON_LINK_CLASSES,
        "flex items-center text-center cursor-pointer",
        !className?.includes("justify-") && "justify-center",
        !className?.includes("focus:") && "focus:ring ring-btn-focus",
        disabled
          ? "pointer-events-none bg-graySearch-light text-white"
          : BUTTON_VARIANT_CLASS[variant || "outline"],
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}

type ButtonIconType = "circle" | "outline" | "text";

type ButtonIconProps = DefaultButtonProps & {
  label: string;
  variant?: ButtonIconType;
  iconProps: IconProps & ComponentPropsWithoutRef<"svg">;
};
const DEFAULT_BUTTON_ICON_CLASSES =
  "flex items-center justify-center h-10 active:bg-gray-200 focus:outline-none ring-btn-focus disabled:text-gray disabled:cursor-not-allowed";

/**
 * for the list of icons to pass in `path` prop, see below
 * https://cdn.materialdesignicons.com/5.4.55/
 */
export function ButtonIcon({
  label,
  variant,
  className,
  iconProps,
  children,
  type,
  ...rest
}: ButtonIconProps) {
  const variantClass = useMemo(() => {
    switch (variant) {
      case "text":
      case "circle":
      default:
        return "rounded-full";
    }
  }, [variant]);

  return (
    <button
      className={classnames(
        DEFAULT_BUTTON_ICON_CLASSES,
        className,
        !className?.includes("bg-") && "bg-white",
        !className?.includes("w-") && "w-10",
        !className?.includes("focus:ring") && "focus:ring",
        !className?.includes("rounded") && variantClass,
      )}
      type={type || "button"}
      {...rest}
    >
      <span className="sr-only">{label}</span>
      <Icon {...iconProps} />
      {children}
    </button>
  );
}

// ***************************************
// private
function Loader({ size }: LoaderProps) {
  return (
    <div className="w-full flex justify-center items-center">
      <LoadingIndicator className="w-6 h-6" thickness={5} size={size} />
    </div>
  );
}
