import { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import { Button } from "../button";
import { DeleteIcon, EditIcon, HistoryIcon, ViewIcon } from "../icons";
import LinkIcon from "@material-ui/icons/Link";
import "./styles.css";

type ActionType = "view" | "edit" | "delete" | "getLink" | "history";

interface ActionButtonProps extends ComponentPropsWithoutRef<"button"> {
  action: ActionType;
  className?: string;
  url?: string;
}

const ACTION_BUTTON_CLASS: Record<ActionType, string> = {
  view: "view-action-button",
  edit: "edit-action-button",
  delete: "delete-action-button",
  getLink: "get-link-action-button",
  history: "history-action-button",
};

export function ActionButton({ action, className, url, disabled, ...props }: ActionButtonProps) {
  const actionButtonClass = clsx(
    className && className,
    action && ACTION_BUTTON_CLASS[action],
    "action-button flex justify-center items-center p-0",
  );

  function renderActionIcon() {
    if (action === "edit") return <EditIcon />;
    if (action === "delete")
      return <DeleteIcon className={clsx(disabled && "fill-current text-[#bcbcbc]")} />;
    if (action === "view") return <ViewIcon />;
    if (action === "getLink") return <LinkIcon />;
    if (action === "history") return <HistoryIcon />;
  }

  return url ? (
    <Link to={url} className={clsx(disabled && "pointer-events-none")}>
      <Button disabled={disabled} variant="text" className={actionButtonClass} {...props}>
        {renderActionIcon()}
      </Button>
    </Link>
  ) : (
    <Button disabled={disabled} variant="text" className={actionButtonClass} {...props}>
      {renderActionIcon()}
    </Button>
  );
}
