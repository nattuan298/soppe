import { FocusEvent, FormEvent, SyntheticEvent, useRef, useState } from "react";
import clsx from "clsx";
import { SearchIcon } from "../svg";
import { IconClose } from "../svgs";
import styles from "./search.module.css";

interface SearchHelpCenterProps {
  handleSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
  searchHistory?: string[];
  disabled?: boolean;
}

export function SearchHelpCenter({
  placeholder,
  className,
  handleSearch,
  disabled,
  ...props
}: SearchHelpCenterProps) {
  const searchClassName = clsx(className && className, !className?.includes("w-") && "w-64");
  const searchRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");

  const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch && handleSearch(value.trim());
    setValue(value.trim());
  };

  const handleOnFocus = (event: FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    setValue(value.trim());
  };
  const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    setValue(value.trim());
  };

  const deleteSearchValue = () => {
    setValue("");
    handleSearch && handleSearch("");
  };

  return (
    <div className={clsx(searchClassName, "h-10 relative rounded-searchHelpCenter")}>
      <form className="w-full h-full relative" onSubmit={handleSubmit} {...props}>
        <input
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleOnChange}
          value={value}
          maxLength={200}
          type="text"
          ref={searchRef}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          className={`${styles.inputSearch} w-full h-full rounded-searchHelpCenter outline-none placeholder-textSearch pl-4 pr-16`}
        />
        {value ? (
          <div className="absolute top-2.5 right-10" role="button">
            <button type="button" onClick={deleteSearchValue}>
              <IconClose />
            </button>
          </div>
        ) : null}
        <div className="absolute top-2 right-3.5" role="button">
          <button type="submit">
            <SearchIcon />
          </button>
        </div>
      </form>
    </div>
  );
}
