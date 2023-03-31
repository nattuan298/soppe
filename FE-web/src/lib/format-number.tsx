import NumberFormat from "react-number-format";

interface FormatNumberProps {
  value: number | undefined;
}

export const FormatNumber = ({ value }: FormatNumberProps) => {
  return (
    <NumberFormat
      thousandsGroupStyle="thousand"
      value={value}
      decimalSeparator="."
      displayType="text"
      type="text"
      thousandSeparator
      isNumericString
    />
  );
};
