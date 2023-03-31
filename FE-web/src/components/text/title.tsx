import { ReactNode } from "react";
import classnames from "classnames";

interface TitlePropsType {
  title: ReactNode;
  isRequired?: boolean;
  className?: string;
}

export function Title({ title, isRequired, className }: TitlePropsType) {
  return (
    <div>
      <div className="flex items-baseline mb-1">
        <span className={classnames("font-normal text-sm", className)}>{title}</span>
        <span className={`text-red ml-1  ${isRequired ? "visible" : "invisible"}`}>*</span>
      </div>
    </div>
  );
}
