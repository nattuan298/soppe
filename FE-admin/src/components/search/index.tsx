import clsx from "clsx";
import { ChangeEvent, FocusEvent, SyntheticEvent, useEffect, useRef, useState } from "react";

import { Option } from "../select";
import { SearchIcon } from "../icons";
import "./styles.css";

interface SearchProps {
  placeholder?: string;
  className?: string;
  searchHistory?: string[];
  onSearch: (inputSearch: string) => void;
  onSearchKeyPress?: (inputSearch: string) => void;
  onSelectSearchHistory?: (value: string) => void;
  value?: string;
}

interface formValue {
  input: string;
}

export function Search({
  placeholder,
  className,
  searchHistory,
  onSearch,
  onSearchKeyPress,
  onSelectSearchHistory,
  value,
  ...props
}: SearchProps) {
  const selectClassName = clsx(className && className, !className?.includes("w-") && "w-96");
  const searchRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<formValue>({ input: "" });
  const [isShowSearchHistory, setIsShowSearchHistory] = useState<boolean>(false);

  useEffect(() => {
    if (value) {
      setValues({ input: value });
    } else {
      setValues({ input: "" });
    }
  }, [value]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ input: event.target.value });
    onSearchKeyPress && onSearchKeyPress(event.target.value);
  };

  const handleOnSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    const regex = /^ *$/;
    event.preventDefault();
    if (!regex.test(values.input)) {
      searchRef.current?.blur();
      onSearch(values.input);
      setIsShowSearchHistory(false);
    }
  };

  const handleOnFocus = (event: FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    setIsShowSearchHistory(true);
  };
  const handleOnblur = (event: FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
    setIsShowSearchHistory(false);
  };
  const handleClickSelectOption = (value: string | null) => {
    if (value) {
      setValues({ input: value });
      onSelectSearchHistory && onSelectSearchHistory(value);
    }
  };

  return (
    <div className={clsx(selectClassName, "h-12 float-right right-5 rounded-md relative")}>
      <form className="h-full w-full relative" {...props} onSubmit={handleOnSubmit}>
        <input
          type="text"
          onChange={handleOnChange}
          placeholder={placeholder}
          maxLength={255}
          ref={searchRef}
          value={values.input}
          onFocus={handleOnFocus}
          onBlur={handleOnblur}
          className="w-full text-sm h-full bg-graySearch-light rounded-search outline-none placeholder-gray-primary pl-5 pr-12"
        />
        <div className="absolute top-4 right-5" role="button">
          <button type="submit">
            <SearchIcon />
          </button>
        </div>
      </form>
      {isShowSearchHistory && searchHistory && (
        <ul className="options bg-white absolute right-0 left-0 z-10 mt-2 p-0">
          {searchHistory.map((item: string, index) => (
            <Option
              key={`${item}-${index}`}
              title={item}
              value={item}
              onSelect={handleClickSelectOption}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
