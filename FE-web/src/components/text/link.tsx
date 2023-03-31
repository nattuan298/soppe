import { ReactNode } from "react";

interface LinkType {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}
export default function Link({ children, onClick, className }: LinkType) {
  return (
    <span className={`text-orange cursor-pointer ${className}`} onClick={onClick}>
      {children}
    </span>
  );
}
