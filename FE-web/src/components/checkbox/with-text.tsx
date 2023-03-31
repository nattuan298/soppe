import { ReactNode } from "react";
import { CheckBox, CheckBoxType } from ".";
import classNames from "classnames";

export function CheckBoxWithText({
  text,
  className,
  ...props
}: CheckBoxType & { text: ReactNode; className?: string }) {
  return (
    <div className={classNames("flex items-center", className)}>
      <CheckBox {...props} />
      <span className="pl-2.5 text-black-dark text-sm">{text}</span>
    </div>
  );
}
