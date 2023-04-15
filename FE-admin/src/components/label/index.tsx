import { useRef } from "react";
import clsx from "clsx";
import "./styles.css";
import { useTranslation } from "react-i18next";
import { textChangeLanguage } from "src/lib/format";

interface StatusDropdownProps {
  defaultValue: string;
}

const STATUS_DROPDOWN_CLASS: Record<string, string> = {
  Active: "status-active",
  Inactive: "status-inactive",
  Terminate: "status-terminate",
  Expire: "status-inactive",
};

export function LabelStatus({ defaultValue }: StatusDropdownProps) {
  const statusSelectRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("common");

  const statusSelectClass = clsx(
    STATUS_DROPDOWN_CLASS[defaultValue],
    "flex justify-center items-center status-select text-white mb-1 capitalize relative",
  );

  return (
    <div className="relative status-dropdown">
      <div className={statusSelectClass} role="button" ref={statusSelectRef}>
        {defaultValue === "Expire"
          ? t("expire")
          : t(textChangeLanguage(defaultValue).toLocaleLowerCase() as "to_ship")}
      </div>
    </div>
  );
}
