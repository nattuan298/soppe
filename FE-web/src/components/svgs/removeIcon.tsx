import { SvgIconConstituentValues } from "../svg";

export default function RemoveIcon(props: SvgIconConstituentValues) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" {...props}>
      <g id="Group_16979" data-name="Group 16979" transform="translate(-168 -196)">
        <circle
          id="Ellipse_230"
          data-name="Ellipse 230"
          cx="10"
          cy="10"
          r="10"
          transform="translate(168 196)"
          fill="red"
        />
        <g id="remove_black_24dp" transform="translate(170 198)">
          <path id="Path_3766" data-name="Path 3766" d="M0,0H16V16H0Z" fill="none" />
          <path
            id="Path_3767"
            data-name="Path 3767"
            d="M14.333,5.94,13.393,5,9.667,8.727,5.94,5,5,5.94,8.727,9.667,5,13.393l.94.94,3.727-3.727,3.727,3.727.94-.94L10.607,9.667Z"
            transform="translate(-1.667 -1.667)"
            fill="#fff"
          />
        </g>
      </g>
    </svg>
  );
}
