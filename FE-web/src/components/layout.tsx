import classnames from "classnames";
import { ComponentPropsWithoutRef } from "react";

type PageLayoutProps = ComponentPropsWithoutRef<"div">;

export function PageLayout({ children, className, ...rest }: PageLayoutProps) {
  return (
    <div
      className={classnames(
        "w-full",
        (!className || !className.includes("max-w-")) && "sm:max-w-screen-wide",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
