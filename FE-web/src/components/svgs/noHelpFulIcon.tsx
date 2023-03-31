import { SvgIconConstituentValues } from "../svg";

interface NoHelpFulIconProps {
  fill?: string;
}

export default function NoHelpFulIcon({
  fill,
  ...props
}: SvgIconConstituentValues & NoHelpFulIconProps) {
  return (
    <svg
      id="thumb_down_off_alt_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={fill}
      {...props}
    >
      <path id="Path_3621" data-name="Path 3621" d="M24,24H0V0H24Z" fill="none" />
      <path
        id="Path_3622"
        data-name="Path 3622"
        d="M10.89,18.28l.57-2.89A2,2,0,0,0,9.5,13H4V11.92L6.57,6h8.09a.35.35,0,0,1,.34.34v7.84l-4.11,4.1M10,22l6.41-6.41A2.006,2.006,0,0,0,17,14.17V6.34A2.343,2.343,0,0,0,14.66,4H6.56a2,2,0,0,0-1.72.97L2.17,11.12a1.98,1.98,0,0,0-.17.8V13a2.006,2.006,0,0,0,2,2H9.5l-.92,4.65a1,1,0,0,0,.08.66,4.8,4.8,0,0,0,.88,1.22Zm10-7h2V4H20a1,1,0,0,0-1,1v9A1,1,0,0,0,20,15Z"
      />
    </svg>
  );
}
