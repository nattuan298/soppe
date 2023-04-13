import { MouseEvent, ReactElement, ReactNode, useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";

import { ChevronDown, ChevronUp } from "../icons";
import { useStyles } from "./styles";
import "./styles.css";

interface CollapsibleBlockProps {
  className?: string;
  heading?: string | ReactElement;
  children?: ReactNode;
  classHeading?: string;
}

export function CollapsibleBlock({
  className,
  heading,
  classHeading,
  children,
}: CollapsibleBlockProps) {
  const [isOpen, setIsOpen] = useState(true);

  const { collapseButton } = useStyles();

  function handleClickCollapse(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsOpen(!isOpen);
  }

  return (
    <div className={clsx(className && className, "collapsible-block")}>
      <div className="collapsible-block-header flex justify-between p-5">
        <h3
          className={clsx("text-xl text-purple-primary font-medium", classHeading && classHeading)}
        >
          {heading}
        </h3>
        <IconButton
          className={collapseButton}
          aria-label="expand row"
          onClick={handleClickCollapse}
        >
          {isOpen ? <ChevronUp className="chevron-up" /> : <ChevronDown className="chevron-down" />}
        </IconButton>
      </div>

      <Collapse in={isOpen}>
        <div className="collapsible-block-content p-5">{children}</div>
      </Collapse>
    </div>
  );
}
