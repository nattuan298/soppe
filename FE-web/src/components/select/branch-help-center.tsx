// import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
// import clsx from "clsx";

// import Option from "./option";
// import { ChevronDown, ChevronUp } from "../svgs";
// import styles from "./styles.module.css";
import { listBranchSelect, listBranchThaiSelect } from "src/feature/help-center/types";

// type OptionType = {
//   title: string;
//   value: string;
// };
export interface SelectProps {
  type?: string;
  placeholder?: string;
  options: listBranchSelect[] | listBranchThaiSelect;
  onChange?: (e: listBranchSelect) => void;
  defaultValue?: string;
  className?: string;
  selectClassName?: string;
  disableClick?: boolean;
  classChevron?: string;
}

export function SelectBranch({}: // placeholder,
// options,
// className,
// onChange,
// defaultValue,
// selectClassName,
// disableClick,
// classChevron,
// ...props
SelectProps) {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [value, setValue] = useState<listBranchSelect>(
  //   options.find((option) => option._id === defaultValue) || { _id: "", name: "" },
  // );
  // const selectRef = useRef<HTMLDivElement>(null);
  // const liRef = useRef<HTMLLIElement>(null);
  // const ulRef = useRef<HTMLUListElement>(null);

  // useEffect(() => {
  //   function handleClickCloseSelect(event: Event) {
  //     if (!selectRef.current?.contains(event.target as Node)) {
  //       setIsOpen(false);
  //     }
  //   }
  //   // Bind the event listener
  //   document.addEventListener("mousedown", handleClickCloseSelect);

  //   // Clean up
  //   return () => document.removeEventListener("mousedown", handleClickCloseSelect);
  // }, [selectRef]);

  // useEffect(() => {
  //   if (isOpen) {
  //     ulRef.current?.scrollTo({ behavior: "smooth", top: liRef.current?.offsetTop });
  //   }
  // }, [isOpen, value]);

  // useEffect(() => {
  //   setValue(options.find((option) => option.name === defaultValue) || { _id: "", name: "" });
  // }, [defaultValue, options]);

  // const onKeyPress = useCallback(
  //   (event: KeyboardEvent) => {
  //     if (["ArrowUp", "ArrowDown"].includes(event.key)) {
  //       event.preventDefault();
  //       let index: number = options.findIndex((ele) => {
  //         return ele.name === value._id;
  //       });

  //       const arrLength = options.length;
  //       if (event.key === "ArrowDown") {
  //         index = index < arrLength - 1 ? index + 1 : 0;
  //       }
  //       if (event.key === "ArrowUp") {
  //         index = index > 0 ? index - 1 : arrLength - 1;
  //       }

  //       setValue(options[index]);
  //     }
  //     if (["Enter", "Escape"].includes(event.key)) {
  //       event.preventDefault();
  //       event.stopImmediatePropagation();
  //       setIsOpen(false);
  //     }
  //   },
  //   [value, options],
  // );

  // useEffect(() => {
  //   if (isOpen) {
  //     document.addEventListener("keydown", onKeyPress);
  //   }
  //   return () => document.removeEventListener("keydown", onKeyPress);
  // }, [isOpen, onKeyPress]);

  // function handleClickOpenSelect(event: MouseEvent<HTMLDivElement>) {
  //   if (disableClick) {
  //     return;
  //   }
  //   event.preventDefault();
  //   setIsOpen(!isOpen);
  // }
  // const handleClickSelectOption = (option: listBranchSelect) => () => {
  //   setValue(option);
  //   setIsOpen(!isOpen);
  // };

  // useEffect(() => {
  //   if (!isOpen && value._id) {
  //     onChange?.(value);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isOpen, value]);

  return (
    <div></div>
    // <div className={clsx("relative h-50 select-custom", className)}>
    //   <div
    //     className={`${
    //       styles.select
    //     } flex items-center justify-between mb-1 bg-white p-3.5 ${selectClassName} ${
    //       isOpen && "border-orange"
    //     } ${disableClick && "bg-lighterGray"}`}
    //     role={!disableClick ? "button" : undefined}
    //     onClick={handleClickOpenSelect}
    //     ref={selectRef}
    //     {...props}
    //   >
    //     <span className={clsx("text-sm", !value._id && "text-lightestGray")}>
    //       {value._id || placeholder}
    //     </span>
    //     {isOpen ? (
    //       <ChevronUp className={clsx(classChevron)} />
    //     ) : (
    //       <ChevronDown className={clsx(classChevron)} />
    //     )}
    //   </div>
    //   <div
    //     style={{ marginRight: "-4px" }}
    //     className={`absolute right-0 left-0 z-10 ${isOpen ? "block" : "hidden"}`}
    //   >
    //     <ul className={`${styles.options} bg-white p-r-1`} ref={ulRef}>
    //       {options.map((option) => (
    //         <Option
    //           key={option._id}
    //           name={option._id}
    //           onSelect={handleClickSelectOption(option)}
    //           isSeleted={value.name === option.name}
    //           ref={liRef}
    //         />
    //       ))}
    //     </ul>
    //   </div>
    // </div>
  );
}
