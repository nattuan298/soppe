import Icon from "@mdi/react";
import { IconProps } from "@mdi/react/dist/IconProps";
import classnames from "classnames";
import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  RefObject,
  forwardRef,
  useMemo,
} from "react";
import { LoadingIndicator } from "./animation/loading-indicator";

type DefaultLoaderProps = ComponentPropsWithoutRef<"div">;
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
  outline: "border bg-white",
  primary: "bg-primary text-white disabled:opacity-50",
  text: "border-none",
};

const DEFAULT_BUTTON_CLASSES = " rounded focus:outline-none disabled:cursor-not-allowed";

export function Button({
  children,
  variant,
  colorClass,
  className,
  type,
  loading,
  loadingSize,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={classnames(
        DEFAULT_BUTTON_CLASSES,
        className,
        !className?.startsWith("p") && "px-3 py-2",
        variant === BUTTON_VARIANT_CLASS.outline &&
          !className?.includes("border-") &&
          "border-primary",
        colorClass,
        BUTTON_VARIANT_CLASS[variant || "outline"],
      )}
      type={type || "button"}
      disabled={loading}
      {...rest}
    >
      {loading ? <Loader size={loadingSize} /> : children}
    </button>
  );
}

const DEFAULT_BUTTON_LINK_CLASSES =
  "rounded focus:outline-none disabled:text-gray disabled:cursor-not-allowed";

type ButtonLinkProps = ComponentPropsWithRef<"a"> & {
  variant?: ButtonVariant;
};

export const ButtonLink = forwardRef(function ButtonLink(
  { children, className, variant, ...rest }: ButtonLinkProps,
  ref,
) {
  return (
    <a
      ref={ref as RefObject<HTMLAnchorElement>}
      className={classnames(
        DEFAULT_BUTTON_LINK_CLASSES,
        "flex items-center text-center cursor-pointer",
        !className?.includes("justify-") && "justify-center",
        !className?.includes("focus:") && "focus:ring ring-btn-focus",
        className,
        BUTTON_VARIANT_CLASS[variant || "outline"],
      )}
      {...rest}
    >
      {children}
    </a>
  );
});

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
      <LoadingIndicator size={size} />
    </div>
  );
}
