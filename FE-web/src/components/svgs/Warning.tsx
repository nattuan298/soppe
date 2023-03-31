import { SvgIconConstituentValues } from "../svg";

export default function WarningIcon(props: SvgIconConstituentValues) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" {...props}>
      <path
        id="alert_outline_black_24dp"
        d="M34.4,48.8h7.2V56H34.4Zm0-28.8h7.2V41.6H34.4ZM37.964,2A36,36,0,1,0,74,38,35.982,35.982,0,0,0,37.964,2ZM38,66.8A28.8,28.8,0,1,1,66.8,38,28.792,28.792,0,0,1,38,66.8Z"
        transform="translate(-2 -2)"
        fill="#ff7500"
      />
    </svg>
  );
}
