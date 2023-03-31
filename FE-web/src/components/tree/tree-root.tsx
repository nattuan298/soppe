import * as React from "react";

import TreeNode, { TreeNodeProps } from "./tree-node";
import cls from "./style.module.css";

export interface TreeProps {
  label: TreeNodeProps["label"];
  children: TreeNodeProps["children"];
}

export default function Tree({ children, label }: TreeProps) {
  return (
    <ul className={cls.tree}>
      <TreeNode label={label}>{children}</TreeNode>
    </ul>
  );
};
