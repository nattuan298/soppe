import NumberFormatCustome from "../text/number-format";
import styles from "./style.module.css";

interface InforMoneyCardProps {
  title: string;
  value?: string | number;
}

export default function OtherInforCard({ title, value }: InforMoneyCardProps) {
  const renderValue = () => {
    if (!value && value !== 0) {
      return "-";
    }

    if (typeof value === "number") {
      return <NumberFormatCustome value={value} />;
    }

    return value;
  };
  return (
    <div className={`pt-2 pb-2 flex flex-col ${styles.card_container}`}>
      <p className="text-0.625 flex-grow-0 pr-3 pl-3 ">{title}</p>
      <div className="flex justify-center items-center font-medium text-orange flex-grow text-center">
        {renderValue()}
      </div>
    </div>
  );
}
