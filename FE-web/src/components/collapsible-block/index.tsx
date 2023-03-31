import { MouseEvent, ReactElement, ReactNode, useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import classnames from "classnames";

import { ChevronDown, ChevronUp } from "../svgs";
import cls from "./style.module.css";

interface CollapsibleBlockProps {
  className?: string;
  heading?: string | ReactElement;
  children?: ReactNode;
}

export function CollapsibleBlock({ className, heading, children }: CollapsibleBlockProps) {
  const [isOpen, setIsOpen] = useState(true);

  function handleClickCollapse(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsOpen(!isOpen);
  }

  return (
    <div className={classnames(className, cls.collapsibleBlock)}>
      <div className={classnames("flex justify-between py-5 border-0")}>
        <h3 className="text-base text-purple-primary">{heading}</h3>
        <IconButton
          className={cls.collapseButton}
          aria-label="expand row"
          size="small"
          onClick={handleClickCollapse}
        >
          {isOpen ? (
            <ChevronUp className={cls.chevronUp} />
          ) : (
            <ChevronDown className={cls.chevronUp} />
          )}
        </IconButton>
      </div>

      <Collapse in={isOpen}>{children}</Collapse>
    </div>
  );
}
