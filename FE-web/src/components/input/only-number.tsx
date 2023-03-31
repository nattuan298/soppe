import { ChangeEvent } from "react";
import InputBasic, { InputCustomeType } from "./input-basic";

const reg = /^$|^[0-9]+$/;

export default function OnlyNumber({ onChange, ...props }: InputCustomeType) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (reg.test(value)) {
      onChange?.(e);
    }
  };
  return <InputBasic onChange={handleChange} {...props} />;
}
