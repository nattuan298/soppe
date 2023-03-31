import React from "react";
import cls from "./container.module.css";

export function Container({ children }: { children: React.ReactNode }) {
  return <div className={cls.container}>{children}</div>;
}
