import NumberFormatCustome from "src/components/text/number-format";
import { stringNumberToStringWithToFix } from "src/utils";

const FieldCheckNull = ({
  value,
  notFormat,
  notAddtoFixed,
}: {
  value?: string;
  notFormat?: boolean;
  notAddtoFixed?: boolean;
}) => {
  if (!value) {
    return <span>-</span>;
  }

  if (notFormat) {
    return <span>{value}</span>;
  }

  if (notAddtoFixed) {
    return <NumberFormatCustome value={value} />;
  }
  return <NumberFormatCustome value={stringNumberToStringWithToFix(value)} />;
};

export default FieldCheckNull;
