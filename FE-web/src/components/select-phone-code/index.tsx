import PhoneInput, { IPhoneInputProps } from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

export function SelectPhoneCode(props: IPhoneInputProps) {
  return <PhoneInput specialLabel="" country="th" {...props} />;
}
