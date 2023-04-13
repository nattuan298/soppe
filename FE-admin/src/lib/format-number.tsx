import NumberFormat from "react-number-format";

interface FormatNumberProps {
  value: number;
  decimalScale?: number;
  fixedDecimalScale?: boolean;
}

export const FormatNumber = ({ value, ...props }: FormatNumberProps) => {
  return (
    <NumberFormat
      thousandsGroupStyle="thousand"
      value={value}
      decimalSeparator="."
      displayType="text"
      type="text"
      thousandSeparator
      isNumericString
      {...props}
    />
  );
};
