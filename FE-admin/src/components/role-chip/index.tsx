import { MouseEvent } from "react";
import Badge from "@material-ui/core/Badge";
import clsx from "clsx";

import { CloseIcon } from "../icons";
import { useStyles } from "./styles";
import "./styles.css";

interface RolePillProps {
  closeable?: boolean;
  disabled?: boolean;
  id: string;
  name: string;
  className?: string;
  onClose?: (id: string) => void;
}

export function RoleChip({ disabled, closeable, className, id, name, onClose }: RolePillProps) {
  const { badge } = useStyles();
  const roleClosableClassName = clsx(className && className, badge);
  const roleCloseableClassName = clsx(
    disabled ? "role-pill-background-disabled" : "role-pill-background",
    "flex justify-center items-center text-white role-pill text-base w-36 leading-4 text-center mb-3",
  );
  const roleClassName = clsx(
    className && className,
    disabled ? "role-pill-background-disabled" : "role-pill-background",
    "flex justify-center items-center text-white role-pill text-base w-36 leading-4 text-center mb-3",
  );

  function handleClickClose(event: MouseEvent<HTMLSpanElement>) {
    event.preventDefault();
    onClose && onClose(id);
  }

  return closeable ? (
    <Badge
      className={roleClosableClassName}
      badgeContent={
        <span onClick={handleClickClose}>
          <CloseIcon />
        </span>
      }
    >
      <div className={roleCloseableClassName}>
        <div className=" w-32 line-2">{name}</div>
      </div>
    </Badge>
  ) : (
    <div className={roleClassName}>
      <div className=" w-32 line-2">{name}</div>
    </div>
  );
}
