import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import useTranslation from "next-translate/useTranslation";
import cls from "../index.module.css";

interface HeaderProps {
  isOpen: boolean;
  onClick: () => void;
  title: string;
}

export default function Header({ isOpen, onClick, title }: HeaderProps) {
  const { t } = useTranslation("common");
  return (
    <div
      className={`flex justify-between items-center cursor-pointer ${cls.item}`}
      onClick={onClick}
    >
      <span>{t(title)}</span>
      <div className="w-6 h-6 rounded-full bg-lighterGray flex items-center justify-center cursor-pointer">
        {!isOpen && <KeyboardArrowDownIcon fontSize="small" className="text-orange" />}
        {isOpen && <KeyboardArrowUpIcon fontSize="small" className="text-orange" />}
      </div>
    </div>
  );
}
