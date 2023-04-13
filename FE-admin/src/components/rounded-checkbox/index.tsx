import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";

import RadioUncheckedIcon from "./radio-unchecked-icon";
import RadioCheckedIcon from "./radio-checked-icon";

export function RoundedCheckbox({ ...props }: CheckboxProps) {
  return <Checkbox icon={<RadioUncheckedIcon />} checkedIcon={<RadioCheckedIcon />} {...props} />;
}
