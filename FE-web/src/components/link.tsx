import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ReactNode } from "react";

type LinkProps = NextLinkProps & {
  className?: string;
  children?: ReactNode;
};

export function Link({ className, children, ...linkProps }: LinkProps) {
  return (
    <NextLink {...linkProps}>
      <a className={className}>{children}</a>
    </NextLink>
  );
}
