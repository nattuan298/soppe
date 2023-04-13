import classnames from "classnames";
import {
  ComponentPropsWithoutRef,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  useCallback,
  useMemo,
} from "react";
import { useDelayState } from "src/hooks";

import { AnchorType, AnimationDuration } from "../components.types";
import { Portal } from "./portal";

const ANCHOR_CLASS: Record<AnchorType, string> = {
  top: "items-start",
  bottom: "items-end",
  middle: "justify-center",
  left: "justify-start",
  right: "justify-end",
};

type ModalProps = ComponentPropsWithoutRef<"div"> & {
  isOpen: boolean;
  onBeforeClose?: () => void;
  onClose: (ev?: KeyboardEvent<HTMLDivElement>, eventKey?: string) => void;
  className?: string;
  containerClassName?: string;
  anchor?: AnchorType;
  lgAnchor?: AnchorType;
  animteDuration?: AnimationDuration;
};

export function Modal({
  role,
  isOpen,
  onBeforeClose,
  onClose,
  anchor,
  lgAnchor,
  animteDuration,
  className,
  containerClassName,
  children,
  ...rest
}: ModalProps) {
  const animateDuration = animteDuration || 200;
  const delayedOpenState = useDelayState(isOpen, animateDuration);

  const defaultAnchor = useMemo(() => anchor || "middle", [anchor]);
  const defaultLgAnchor = useMemo(() => lgAnchor || "middle", [lgAnchor]);

  const animateClose = useCallback(
    (ev?: KeyboardEvent<HTMLDivElement>, eventKey?: string) => {
      onBeforeClose && onBeforeClose();
      setTimeout(onClose, animateDuration, ev, eventKey);
    },
    [animateDuration, onBeforeClose, onClose],
  );

  const containerClasses = useMemo(() => {
    return isOpen ? "opacity-100" : "opacity-0";
  }, [isOpen]);

  const classes = "w-full bg-white";

  return isOpen || delayedOpenState ? (
    <Portal preventScroll>
      <div
        role={role || "dialog"}
        className={classnames(
          makeContainerClass(animateDuration),
          containerClasses,
          !containerClassName?.includes("bg-opacity-") && "bg-opacity-40",
          containerClassName,
          ANCHOR_CLASS[defaultAnchor],
          `lg:${ANCHOR_CLASS[defaultLgAnchor]}`,
        )}
        onKeyDown={handleKeyDown}
        onClick={closeModal}
      >
        <div
          className={classnames(
            classes,
            className,
            defaultAnchor === "middle" && "m-auto",
            defaultLgAnchor === "middle" && "lg:m-auto",
          )}
          {...rest}
        >
          {children}
        </div>
      </div>
    </Portal>
  ) : null;

  // ***************************************

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function closeModal(ev: ReactMouseEvent<HTMLDivElement, MouseEvent>) {
    if (ev.target === ev.currentTarget) animateClose();
  }

  function handleKeyDown(ev: KeyboardEvent<HTMLDivElement>) {
    // Ignore events that have been `event.preventDefault()` marked.
    // preventDefault() is meant to stop default behaviours like
    // clicking a checkbox to check it, hitting a button to submit a form,
    // and hitting left arrow to move the cursor in a text input etc.
    // Only special HTML elements have these default bahaviours.
    //
    // To remove in v4.
    if (ev.key !== "Escape" || ev.defaultPrevented) {
      return;
    }

    // Swallow the event, in case someone is listening for the escape key on the body.
    ev.stopPropagation();

    if (ev.target === ev.currentTarget) {
      animateClose(ev, "escapeKeyDown");
    }
  }
}

// ***************************************
// private
function makeContainerClass(duration: number) {
  return `fixed flex w-full inset-0 z-30 overflow-y-auto bg-black transition-opacity duration-${duration} ease-in-out`;
}
