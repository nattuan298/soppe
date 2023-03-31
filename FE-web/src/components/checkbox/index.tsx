import React from "react";

export interface CheckBoxType {
  checked?: boolean;
  onChange?: (e: { name?: string; checked: boolean }) => void;
  name?: string;
  className?: string;
  classNameChecked?: string;
  disabled?: boolean;
}

export function CheckBox({
  checked,
  onChange,
  name,
  className = "",
  classNameChecked = "",
  disabled,
}: CheckBoxType) {
  const handleClick = () => {
    !disabled && onChange?.({ name, checked: !checked });
  };
  return (
    <div
      className={`rounded-full  flex justify-center items-center ${
        className ? className : "w-5 h-5"
      } ${disabled ? "bg-textSearch" : "bg-lighterGray"}`}
      role={!disabled ? "button" : undefined}
      onClick={handleClick}
    >
      {checked && (
        <div
          className={`bg-orange rounded-full ${
            classNameChecked ? classNameChecked : "w-3.5 h-3.5"
          }`}
        />
      )}
    </div>
  );
}
