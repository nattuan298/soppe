import {
  HTMLAttributes,
  MouseEvent,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";

// import Option from "./option";
import { ChevronDown, ChevronUp } from "../svgs";
import styles from "./styles.module.css";
import useTranslation from "next-translate/useTranslation";
import dayjs from "dayjs";

interface OptionProps {
  onSelect: () => void;
  isSeleted?: boolean;
  image?: string;
  name: number;
}

const Option = forwardRef<HTMLLIElement, OptionProps>(
  ({ onSelect, isSeleted, name, image }, ref) => {
    const props = isSeleted ? { ref } : {};
    return (
      <li
        className={`${
          isSeleted && "text-orange"
        } h-10 hover:text-orange cursor-pointer flex items-center p-3.5 text-sm`}
        onMouseDown={onSelect}
        {...props}
      >
        {image && <img src={image} alt="img" className="mr-2 w-5 h-5" />}
        {name}
      </li>
    );
  },
);

export type SelectProps = HTMLAttributes<HTMLDivElement> & {
  options: number[];
  onChangeYear?: (e: number) => void;
  defaultValue: number;
  className?: string;
  selectClassName?: string;
  disableClick?: boolean;
  classChevron?: string;
  classHolder?: string;
  showFullHeight?: boolean;
};

export function SelectYear({
  options,
  className,
  onChangeYear,
  defaultValue,
  selectClassName,
  disableClick,
  classChevron,
  classHolder,
  showFullHeight,
  ...props
}: SelectProps) {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState(dayjs().get("year"));
  const selectRef = useRef<HTMLDivElement>(null);
  const liRef = useRef<HTMLLIElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClickCloseSelect(event: Event) {
      if (!selectRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickCloseSelect);

    // Clean up
    return () => document.removeEventListener("mousedown", handleClickCloseSelect);
  }, [selectRef]);

  useEffect(() => {
    if (isOpen) {
      ulRef.current?.scrollTo({ behavior: "smooth", top: liRef.current?.offsetTop });
    }
  }, [isOpen, value]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const onKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
        let index: number = options.findIndex((ele) => {
          return ele === value;
        });

        const arrLength = options.length;
        if (event.key === "ArrowDown") {
          index = index < arrLength - 1 ? index + 1 : 0;
        }
        if (event.key === "ArrowUp") {
          index = index > 0 ? index - 1 : arrLength - 1;
        }

        setValue(options[index]);
      }
      if (["Enter", "Escape"].includes(event.key)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        setIsOpen(false);
      }
    },
    [value, options],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", onKeyPress);
    }
    return () => document.removeEventListener("keydown", onKeyPress);
  }, [isOpen, onKeyPress]);

  function handleClickOpenSelect(event: MouseEvent<HTMLDivElement>) {
    if (disableClick) {
      return;
    }
    event.preventDefault();
    setIsOpen(!isOpen);
  }
  const handleClickSelectOption = (option: number) => () => {
    setValue(option);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isOpen && value !== defaultValue) {
      onChangeYear?.(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, value]);

  return (
    <div className={clsx(`relative select-custom ${showFullHeight ? "" : "h-10"}`, className)}>
      <div
        className={`${
          styles.select
        } flex items-center justify-between mb-1 bg-white ${selectClassName} p-3.5 ${
          isOpen && "border-orange"
        } ${disableClick && "bg-lighterGray"}
        ${showFullHeight ? "h-auto" : ""}`}
        role={!disableClick ? "button" : undefined}
        onClick={handleClickOpenSelect}
        ref={selectRef}
        {...props}
      >
        <span
          className={clsx("text-sm font-light", !value && (classHolder || "text-lightestGray"))}
        >
          {t("year") + ": " + value}
        </span>
        <div>
          <div style={{ width: 20, height: 20 }}>
            {isOpen ? (
              <ChevronUp className={clsx(classChevron)} />
            ) : (
              <ChevronDown className={clsx(classChevron)} />
            )}
          </div>
        </div>
      </div>
      <div
        // style={{ marginRight: "-4px" }}
        className={`absolute right-0 left-0 z-10 ${isOpen ? "block" : "hidden"}`}
      >
        <ul className={`${styles.optionsYear} bg-white pr-1`} ref={ulRef}>
          {options.map((option) => (
            <Option
              key={option}
              name={option}
              onSelect={handleClickSelectOption(option)}
              isSeleted={value === option}
              ref={liRef}
            />
          ))}
          {options.length === 0 && <div className="flex p-4 justify-center">{t`no_data`}</div>}
        </ul>
      </div>
    </div>
  );
}
