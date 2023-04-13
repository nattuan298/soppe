import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from "react";

type ChangeEventType = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export function useInputHandler(
  defaultVal: string,
): [string, (event: ChangeEventType) => void, Dispatch<SetStateAction<string>>] {
  const [value, setValue] = useState(defaultVal);

  const handleChange = useCallback((event: ChangeEventType) => {
    setValue(event.target.value);
  }, []);

  return [value, handleChange, setValue];
}

export function useCheckboxState(defaultVal: boolean): [boolean, () => void] {
  const [value, setValue] = useState(defaultVal);

  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle];
}
