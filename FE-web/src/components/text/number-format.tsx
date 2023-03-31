import NumberFormat, { NumberFormatProps } from "react-number-format";

interface NumberFormatCustomeType {
  value: string | number;
}

const NumberFormatCustome = ({ ...props }: NumberFormatCustomeType & NumberFormatProps) => {
  return (
    <NumberFormat
      displayType="text"
      thousandSeparator
      {...props}
      // renderText={(value, props) => <div {...props}>{value}</div>}
    />
  );
};

export default NumberFormatCustome;
