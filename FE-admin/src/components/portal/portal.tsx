import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function Portal({
  children,
  preventScroll,
}: {
  preventScroll?: boolean;
  children: ReactNode;
}) {
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const div = document.createElement("div");
    setElement(div);

    const body = window.document.body;
    if (preventScroll) {
      body.style.overflowY = "hidden";
      body.style["touchAction"] = "none";
    }
    body.appendChild(div);

    return () => {
      if (preventScroll) {
        body.style.overflowY = "";
        body.style.position = "";
        body.style["touchAction"] = "";
      }
      body.removeChild(div);
      setElement(null);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preventScroll]);

  return element ? createPortal(children, element as HTMLDivElement) : null;
}
