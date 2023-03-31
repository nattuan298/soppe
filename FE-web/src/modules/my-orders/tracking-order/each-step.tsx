import { Divider } from "@material-ui/core";
import dayjs from "dayjs";
import styles from "./tracking.module.css";

interface EachStepProps {
  showTopLine?: boolean;
  showBottomLine?: boolean;
  isSelected?: boolean;
  title: string;
  desc: string;
  date: string;
}

export default function EachStep({
  showTopLine = true,
  showBottomLine = true,
  isSelected = false,
  title,
  desc,
  date,
}: EachStepProps) {
  return (
    <div className="flex">
      <div className="flex flex-col items-center justify-center mr-3">
        <div className={`${styles.line_column} ${showTopLine ? "" : "invisible"}`} />
        <div className="w-8 h-8 bg-orange bg-opacity-30 rounded-full mt-4 mb-4 flex items-center justify-center">
          {isSelected && <div className="w-5 h-5 rounded-full bg-orange " />}
        </div>

        <div className={`${styles.line_column} ${showBottomLine ? "" : "invisible"}`} />
      </div>
      <div className="pt-6 w-full">
        <p className="font-medium">{title}</p>
        <div className="grid grid-cols-3">
          <p className="text-sm mt-1 font-light col-span-2">{desc}</p>
        </div>
        <p className="text-sm mt-6">{dayjs(date).format("DD-MM-YYYY HH:mm")}</p>
        <Divider className="mt-9" />
      </div>
    </div>
  );
}
