import MuiRadio, { RadioProps } from "@material-ui/core/Radio";

import RadioUncheckedIcon from "./radio-unchecked-icon";
import RadioCheckedIcon from "./radio-checked-icon";

export function Radio({ ...props }: RadioProps) {
  return <MuiRadio icon={<RadioUncheckedIcon />} checkedIcon={<RadioCheckedIcon />} {...props} />;
}
