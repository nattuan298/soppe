import { SvgIconConstituentValues } from "../svg";

interface ShareIconProps {
  fill?: string;
}

export default function ShareIcon({
  fill = "#ff7500",
  ...props
}: SvgIconConstituentValues & ShareIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...props}>
      <g id="Group_16208" data-name="Group 16208" transform="translate(-38 -47)">
        <g id="share_black_24dp" transform="translate(38 47)">
          <path id="Path_2126" data-name="Path 2126" d="M0,0H18V18H0Z" fill="none" />
          <path
            id="Path_2127"
            data-name="Path 2127"
            d="M14.25,12.56a2.184,2.184,0,0,0-1.47.578L7.432,10.025A2.455,2.455,0,0,0,7.5,9.5a2.455,2.455,0,0,0-.068-.525L12.72,5.892A2.245,2.245,0,1,0,12,4.25a2.455,2.455,0,0,0,.068.525L6.78,7.858a2.25,2.25,0,1,0,0,3.285l5.34,3.12a2.116,2.116,0,0,0-.06.487,2.19,2.19,0,1,0,2.19-2.19Zm0-9.06a.75.75,0,1,1-.75.75A.752.752,0,0,1,14.25,3.5Zm-9,6.75A.75.75,0,1,1,6,9.5.752.752,0,0,1,5.25,10.25Zm9,5.265a.75.75,0,1,1,.75-.75A.752.752,0,0,1,14.25,15.515Z"
            transform="translate(-0.75 -0.5)"
            fill={fill}
          />
        </g>
      </g>
    </svg>
  );
}
