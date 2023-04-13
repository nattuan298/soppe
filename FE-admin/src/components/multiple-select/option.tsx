import { MouseEvent } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import "./styles.css";

interface OptionProps {
  title: string;
  value: string | number | boolean;
  onSelect: (value: string | null, title: string) => void;
  isSelected?: boolean;
}

export function Option({ title, value, onSelect, isSelected }: OptionProps) {
  function handleClickGetData(event: MouseEvent<HTMLLIElement>) {
    const optionValue = event.currentTarget.getAttribute("data-value");
    const optionTitle = event.currentTarget.textContent;
    if (optionValue && optionTitle) {
      onSelect(optionValue, optionTitle);
    }
  }

  return (
    <li
      className={"cursor-pointer h-50 flex items-center p-3.5 text-sm"}
      onMouseDown={handleClickGetData}
      data-value={value}
    >
      <Checkbox
        className="checkbox-mul-selected"
        checked={isSelected}
        disableFocusRipple
        disableTouchRipple
      />
      {title}
    </li>
  );
}
