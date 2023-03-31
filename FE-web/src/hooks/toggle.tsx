import { useState } from "react";
export default function useToggle(initialVal: boolean) {
  const [value, setValue] = useState(initialVal);
  const toggleValue = () => {
    setValue(!value);
  };
  return [value, toggleValue];
}
