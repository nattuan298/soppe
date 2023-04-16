import { MouseEvent, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { ChevronDown, ChevronUp } from "../icons";
import "./styles.css";
import { useTranslation } from "react-i18next";

interface StatusDropdownProps {
  data?: any;
  statusOptions: string[];
  defaultValue: string;
  onChange?: (data: any, value: string) => void;
  trans?: (text: string) => string;
  isSelect?:boolean;
}

const STATUS_DROPDOWN_CLASS: Record<string, string> = {
  active: "status-active",
  inactive: "status-inactive",
  terminate: "status-terminate",
  waiting_approve: "status-waiting_approve",
  delivery: "status-delivery",
  receipted: "status-receipted",
};

export function StatusDropdown({
  data,
  defaultValue,
  statusOptions,
  isSelect = true,
  onChange,
  trans,
}: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const statusSelectRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickCloseSelect(event: Event) {
      if (statusSelectRef.current && !statusSelectRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickCloseSelect);

    // Clean up
    return () => document.removeEventListener("mousedown", handleClickCloseSelect);
  }, [statusSelectRef]);

  const statusSelectClass = clsx(
    STATUS_DROPDOWN_CLASS[defaultValue],
    "flex justify-center items-center status-select text-white mb-1 relative px-2",
  );

  function handleClickOpenSelect(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsOpen(!isOpen);
  }
  function handleClickSelectOption(value: string) {
    onChange && data && onChange(data, value);
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative status-dropdown">
      <div
        className={statusSelectClass}
        role="button"
        ref={statusSelectRef}
        onClick={handleClickOpenSelect}
      >
        {trans ? trans(defaultValue as "active") : defaultValue}
        {isOpen && isSelect ? <ChevronUp className="right-2" /> : <ChevronDown className="right-2" />}
      </div>
      {isOpen && isSelect && (
        <ul className="absolute left-0 right-0 status-options bg-white z-10 p-0">
          {statusOptions.map((status, index) => (
            <li
              key={index}
              className={clsx(
                "hover:bg-orange-light hover:text-white cursor-pointer",
                status.toLocaleLowerCase() === defaultValue && "text-orange-light bg-white",
                { disabled: status === "receipted" || status === "waiting_approve" },
              )}
              onMouseDown={() => handleClickSelectOption(status)}
            >
              {trans ? trans(status as "active") : status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
