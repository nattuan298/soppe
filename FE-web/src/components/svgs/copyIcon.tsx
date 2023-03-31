import { SvgIconConstituentValues } from "../svg";

export default function CopyIcon(props: SvgIconConstituentValues) {
  return (
    <svg
      id="copy_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      {...props}
    >
      <path id="Path_3615" data-name="Path 3615" d="M0,0H20V20H0Z" fill="none" />
      <path
        id="Path_3616"
        data-name="Path 3616"
        d="M13.667,1h-10A1.672,1.672,0,0,0,2,2.667V14.333H3.667V2.667h10Zm2.5,3.333H7A1.672,1.672,0,0,0,5.333,6V17.667A1.672,1.672,0,0,0,7,19.333h9.167a1.672,1.672,0,0,0,1.667-1.667V6A1.672,1.672,0,0,0,16.167,4.333Zm0,13.333H7V6h9.167Z"
        transform="translate(-0.333 -0.167)"
        fill={props.fill ? props.fill : "#231f20"}
      />
    </svg>
  );
}
