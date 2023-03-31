import classnames from "classnames";
import * as React from "react";

import { AnchorType, AnimationDuration } from "../components.types";
import { Modal } from "./modal";

const DEFAULT_DRAWER_CLASS =
  "overflow-y-auto transition-transform transform duration-200 ease-in-out";
const DRAWER_BORDER_CLASS: Record<DrawerAnchor, string> = {
  top: "rounded-b-lg",
  bottom: "rounded-t-lg sticky bottom-0",
  left: "lg:rounded-r-lg",
  right: "lg:rounded-l-lg",
  middle: "lg:rounded-lg",
};
const DRAWER_ANCHOR_CLASS: Record<DrawerAnchor, string> = {
  top: "-translate-y-full",
  bottom: "translate-y-full",
  left: "-translate-x-full",
  right: "translate-x-full",
  middle: "translate-y-full",
};

type DrawerAnchor = AnchorType;

type DrawerProps = React.ComponentPropsWithoutRef<"div"> & {
  isOpen: boolean;
  onClose: (ev?: React.KeyboardEvent<HTMLDivElement>, eventKey?: string) => void;
  anchor?: DrawerAnchor;
  lgAnchor?: DrawerAnchor;
  duration?: AnimationDuration;
  className?: string;
  children: React.ReactNode;
};

export function Drawer({
  isOpen,
  anchor,
  lgAnchor,
  duration,
  onClose,
  className,
  role,
  children,
}: DrawerProps) {
  const defaultAnchor = React.useMemo(() => anchor || "middle", [anchor]);
  const defaultLgAnchor = React.useMemo(() => lgAnchor || "middle", [lgAnchor]);

  const [drawerClass, setDrawerClass] = React.useState(
    classnames(
      DEFAULT_DRAWER_CLASS,
      DRAWER_ANCHOR_CLASS[defaultAnchor],
      `lg:${DRAWER_ANCHOR_CLASS[defaultLgAnchor]} lg:translate-x-0`,
    ),
  );

  // slide back before close
  // const beforeClose = React.useCallback(() => {
  //   setDrawerClass(classnames(DEFAULT_DRAWER_CLASS, DRAWER_ANCHOR_CLASS[actualAnchor]));
  // }, [anchor]);

  React.useEffect(() => {
    setDrawerClass(
      isOpen
        ? DEFAULT_DRAWER_CLASS
        : classnames(
          DEFAULT_DRAWER_CLASS,
          DRAWER_ANCHOR_CLASS[defaultAnchor],
          `lg:${DRAWER_ANCHOR_CLASS[defaultLgAnchor]} lg:translate-x-0`,
        ),
    );
  }, [defaultAnchor, defaultLgAnchor, isOpen]);

  return (
    <Modal
      role={role}
      isOpen={isOpen}
      onClose={onClose}
      className={classnames(
        className,
        drawerClass,
        DRAWER_BORDER_CLASS[defaultAnchor],
        DRAWER_BORDER_CLASS[defaultLgAnchor],
      )}
      anchor={defaultAnchor}
      lgAnchor={defaultLgAnchor}
      animteDuration={duration}
    >
      {children}
    </Modal>
  );
}
