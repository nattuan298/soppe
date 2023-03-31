import { Tooltip } from "@material-ui/core";
import { ReactElement } from "react";
import NumberFormatCustome from "../text/number-format";
import styles from "./style.module.css";

interface InforMoneyCardProps {
  value: number | string;
  unit: string;
  icon: ReactElement;
  iconEnd?: ReactElement;
}

export default function InforMoneyCard({ value, unit, icon, iconEnd }: InforMoneyCardProps) {
  return (
    <div
      className={`flex items-center justify-between bg-white ${styles.card_container} ${
        iconEnd ? "pl-3 pr-3" : "pl-4 pr-2"
      }`}
    >
      <div
        className="flex items-center overflow-hidden"
        style={{ maxWidth: iconEnd ? "calc(100% - 26px)" : "100%" }}
      >
        {icon}
        <Tooltip title={<NumberFormatCustome className="ml-2" value={value} />}>
          <div className="overflow-hidden overflow-ellipsis">
            <NumberFormatCustome
              className="ml-2"
              value={value}
              style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}
            />
          </div>
        </Tooltip>
        <span className="text-0.375 pl-1 relative -top-1">{unit}</span>
      </div>

      {iconEnd}
    </div>
  );
}
