import * as React from "react";
import type { ReactNode } from "react";
import classNames from "classnames";

import cls from "./style.module.css";

export interface TreeNodeProps {
  label: React.ReactNode;
  className?: string;
  children?: ReactNode;
}

export default function TreeNode({ children, label, className }: TreeNodeProps) {
  return (
    <li className={classNames(cls.node, cls.nodeLines, className)}>
      {label}
      {React.Children.count(children) > 0 && (
        <ul className={cls.childrenContainer}>{children}</ul>
      )}
    </li>
  );
}
