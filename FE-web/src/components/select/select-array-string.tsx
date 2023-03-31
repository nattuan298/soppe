import { useMemo } from "react";
import { Select, SelectProps } from ".";

type SelectArrayStringType = Omit<SelectProps, "options"> & {
  options: Array<string>;
};

export function SelectArrayString({ options, ...props }: SelectArrayStringType) {
  const newOptions = useMemo(
    () =>
      options.map((item) => ({
        title: item,
        value: item,
      })),
    [options],
  );

  return <Select options={newOptions} {...props} />;
}
