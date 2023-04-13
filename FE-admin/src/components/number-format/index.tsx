import clsx from "clsx";

import { Label } from "src/components";
import NumberFormat, { NumberFormatProps } from "react-number-format";

interface InputProps extends NumberFormatProps {
  errorMessage?: string;
  label?: string;
  required?: boolean;
}

// Text Input
export function NumberFormatter({
  className,
  errorMessage,
  label,
  required,
  ...props
}: InputProps) {
  return (
    <div className={clsx("w-full", label && "flex flex-col w-full")}>
      {label && <Label required={required}>{label}</Label>}
      <NumberFormat
        className={clsx(
          "placeholder-[#BCBCBC] text-sm outline-none pl-3.5 float-left w-full h-[50px] rounded-[5px] border",
          errorMessage ? "border-red-light" : "focus:border-orange-light border-[#ebebeb]",
          className,
        )}
        {...props}
      />
      <p className="text-sm py-1 text-red-light">{errorMessage}</p>
    </div>
  );
}
