import { useMemo, useState } from "react";
import MuiAutocomplete from "@material-ui/lab/Autocomplete";
import Popper, { PopperProps } from "@material-ui/core/Popper";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";

import { SearchIcon } from "src/components/icons";
import { useStyles } from "./styles";
import "./styles.css";
import { useTranslation } from "react-i18next";

export type AutoCompleteOptionType = {
  _id: string;
  name: string;
};

interface AutocompleteProps {
  options: AutoCompleteOptionType[];
  selectedOptions: AutoCompleteOptionType[];
  onSelect?: (value: AutoCompleteOptionType) => void;
  errorMessage?: string;
  hiddenSearch?: boolean;
}

const CustomPopper = function ({ ...props }: PopperProps) {
  return <Popper {...props} style={{ width: 748 }} placement="bottom-start" />;
};

export function Autocomplete({
  options,
  errorMessage,
  selectedOptions,
  onSelect,
  hiddenSearch,
}: AutocompleteProps) {
  const { t } = useTranslation("common");
  const [inputValue, setInputValue] = useState<string>("");
  const [value, setValue] = useState<AutoCompleteOptionType>({
    _id: "",
    name: "",
  });
  const { textField, root, autocomplete, error } = useStyles();

  const inputClass = clsx(textField, errorMessage && error);

  const optionList = useMemo(() => {
    if (!Array.isArray(options)) return [];
    return options.filter(
      (data) => !selectedOptions.some((selection) => selection._id === data._id),
    );
  }, [options, selectedOptions]);

  function handleSelectOption(event: any, value: any, reason: any) {
    onSelect && onSelect(value);
    setValue({
      _id: "",
      name: "",
    });
  }
  function handleChangeInputValue(event: any, value: any) {
    setInputValue(value);
  }

  return (
    <div className="autocomplete">
      <div className="relative">
        {!hiddenSearch && (
          <MuiAutocomplete
            disableClearable
            className={autocomplete}
            options={optionList}
            getOptionLabel={(option) => option.name}
            onChange={handleSelectOption}
            onInputChange={handleChangeInputValue}
            value={value}
            inputValue={inputValue.replace(/^\s+/g, "")}
            noOptionsText={t`no_results_matched`}
            renderInput={(params) => (
              <TextField {...params} className={inputClass} placeholder={t`search`} />
            )}
            PopperComponent={CustomPopper}
          />
        )}
        <IconButton disabled aria-label="toggle password visibility" edge="end" className={root}>
          <SearchIcon />
        </IconButton>
      </div>
      {errorMessage && <p className="text-sm error-msg">{errorMessage}</p>}
    </div>
  );
}
