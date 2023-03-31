import { SvgIconConstituentValues } from "../svg";

interface HelpFulIconProps {
  fill?: string;
}

export default function HelpFulIcon({
  fill,
  ...props
}: SvgIconConstituentValues & HelpFulIconProps) {
  return (
    <svg
      id="thumb_up_off_alt_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={fill}
      {...props}
    >
      <path id="Path_3619" data-name="Path 3619" d="M0,0H24V24H0Z" fill="none" />
      <path
        id="Path_3620"
        data-name="Path 3620"
        d="M13.11,5.72l-.57,2.89A2,2,0,0,0,14.5,11H20v1.08L17.43,18H9.34A.35.35,0,0,1,9,17.66V9.82l4.11-4.1M14,2,7.59,8.41A2.006,2.006,0,0,0,7,9.83v7.83A2.343,2.343,0,0,0,9.34,20h8.1a2,2,0,0,0,1.72-.97l2.67-6.15a1.98,1.98,0,0,0,.17-.8V11a2.006,2.006,0,0,0-2-2H14.5l.92-4.65a1,1,0,0,0-.08-.66,4.8,4.8,0,0,0-.88-1.22ZM4,9H2V20H4a1,1,0,0,0,1-1V10A1,1,0,0,0,4,9Z"
      />
    </svg>
  );
}
