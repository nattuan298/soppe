import { useEffect, useMemo, useState } from "react";
import MuiAutocomplete from "@material-ui/lab/Autocomplete";
import Popper, { PopperProps } from "@material-ui/core/Popper";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";

import { ChevronDown } from "src/components/icons";
import { useStyles } from "./styles";
import "./styles.css";

type OptionType = {
  _id: string;
  name: string;
};

interface AutocompleteProps {
  options: OptionType[];
  selectedOptions: OptionType[];
  onSelect?: (value: OptionType) => void;
  errorMessage?: string;
  placeholder?: string;
  className?: string;
}

const CustomPopper = function ({ ...props }: PopperProps) {
  return <Popper {...props} className="select-option" placement="bottom-start" />;
};

export function SingleAutocomplete({
  options,
  errorMessage,
  selectedOptions,
  className,
  placeholder = "Search",
  onSelect,
}: AutocompleteProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState<OptionType | undefined>();
  const { textField, root, autocomplete, error } = useStyles();

  const inputClass = clsx(textField, errorMessage && error);

  useEffect(() => {
    if (selectedOptions.length === 0) {
      setInputValue("");
    } else if (selectedOptions.length === 1) {
      setInputValue(selectedOptions[0].name);
    }
  }, [selectedOptions]);

  const optionList = useMemo(() => {
    if (!Array.isArray(options)) return [];
    return options.filter(
      (data) =>
        !selectedOptions.some(
          (selection) => selection._id === data._id && inputValue.includes(selection.name),
        ),
    );
  }, [options, inputValue, selectedOptions]);

  function handleSelectOption(event: any, value: any, reason: any) {
    setInputValue(value.name);
    onSelect && onSelect(value);
    setValue(value);
  }

  function handleChangeInputValue(event: any, value: any) {
    setInputValue(value);
  }

  const filterOptions = () => {
    if (
      (!value && inputValue === selectedOptions[0]?.name) ||
      (value && inputValue === value.name)
    ) {
      return optionList;
    }
    return optionList.filter((item) => item.name.includes(inputValue));
  };
  return (
    <div className={`${className} autocomplete`}>
      <div className="relative">
        <MuiAutocomplete
          disableClearable
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          className={autocomplete}
          options={optionList}
          getOptionLabel={(option) => option.name}
          onChange={handleSelectOption}
          onInputChange={handleChangeInputValue}
          value={value}
          inputValue={inputValue.replace(/^\s+/g, "")}
          noOptionsText="No results matched"
          renderInput={(params) => (
            <TextField {...params} className={inputClass} placeholder={placeholder} />
          )}
          filterOptions={filterOptions}
          PopperComponent={CustomPopper}
          clearOnBlur
        />
        <IconButton disabled aria-label="toggle password visibility" edge="end" className={root}>
          <ChevronDown className={`${isFocus ? "transform rotate-180" : ""}`} />
        </IconButton>
      </div>
      {errorMessage && <p className="text-sm error-msg">{errorMessage}</p>}
    </div>
  );
}
