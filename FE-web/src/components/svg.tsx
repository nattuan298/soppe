import { SVGProps } from "react";
import clsx from "clsx";
export interface SvgIconConstituentValues {
  strokeColor?: string;
  strokeWidth?: string;
  strokeWidth2?: string;
  strokeWidth3?: string;
  strokeFill?: string;
  fillColor?: string;
  fillColor2?: string;
  fillColor3?: string;
  fillColor4?: string;
  fillColor5?: string;
  fillColor6?: string;
  fillColor7?: string;
  imageWidth?: string;
  imageHeight?: string;
  width?: string;
  height?: string;
  rotateCenter?: number;
  className?: string;
  className2?: string;
  className3?: string;
  className4?: string;
  className5?: string;
  viewBox?: string;
  fill?: string;
  customercolor2?: string;
}
export function Svg(props: SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" {...props} />;
}

export function AccountIcon(props: SvgIconConstituentValues) {
  return (
    <svg
      id="account_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path id="Path_2094" data-name="Path 2094" d="M0,0H24V24H0Z" fill="none" />
      <path
        id="Path_2095"
        data-name="Path 2095"
        d="M12,12A4,4,0,1,0,8,8,4,4,0,0,0,12,12Zm0,2c-2.67,0-8,1.34-8,4v2H20V18C20,15.34,14.67,14,12,14Z"
        fill={props.customercolor2 || "#231f20"}
      />
    </svg>
  );
}
export function FavouriteIcon(props: SvgIconConstituentValues) {
  return (
    <svg
      id="favorite_border_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path id="Path_2124" data-name="Path 2124" d="M0,0H24V24H0Z" fill="none" />
      <path
        id="Path_2125"
        data-name="Path 2125"
        d="M16.5,3A5.988,5.988,0,0,0,12,5.09,5.988,5.988,0,0,0,7.5,3,5.447,5.447,0,0,0,2,8.5c0,3.78,3.4,6.86,8.55,11.54L12,21.35l1.45-1.32C18.6,15.36,22,12.28,22,8.5A5.447,5.447,0,0,0,16.5,3ZM12.1,18.55l-.1.1-.1-.1C7.14,14.24,4,11.39,4,8.5A3.418,3.418,0,0,1,7.5,5a3.909,3.909,0,0,1,3.57,2.36h1.87A3.885,3.885,0,0,1,16.5,5,3.418,3.418,0,0,1,20,8.5C20,11.39,16.86,14.24,12.1,18.55Z"
        transform="translate(0 0)"
        fill="#231f20"
      />
    </svg>
  );
}
export function MyOrderIcon(props: SvgIconConstituentValues) {
  return (
    <svg
      id="list_alt_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path id="Path_2084" data-name="Path 2084" d="M0,0H24V24H0Z" fill="none" />
      <path
        id="Path_2085"
        data-name="Path 2085"
        d="M19,5V19H5V5H19m1.1-2H3.9a.9.9,0,0,0-.9.9V20.1a.967.967,0,0,0,.9.9H20.1a1.061,1.061,0,0,0,.9-.9V3.9A.967.967,0,0,0,20.1,3ZM11,7h6V9H11Zm0,4h6v2H11Zm0,4h6v2H11ZM7,7H9V9H7Zm0,4H9v2H7Zm0,4H9v2H7Z"
        fill="#231f20"
      />
    </svg>
  );
}
export function NotiIcon(props: SvgIconConstituentValues) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16.41"
      height="20"
      viewBox="0 0 16.41 20"
      {...props}
    >
      <path
        id="notifications_black_24dp"
        d="M12.205,22.5a2.057,2.057,0,0,0,2.051-2.051h-4.1A2.051,2.051,0,0,0,12.205,22.5Zm6.154-6.154V11.218c0-3.149-1.682-5.785-4.615-6.482v-.7a1.538,1.538,0,1,0-3.077,0v.7c-2.944.7-4.615,3.323-4.615,6.482v5.128L4,18.4v1.026H20.41V18.4Z"
        transform="translate(-4 -2.5)"
        fill="#231f20"
      />
    </svg>
  );
}
export function CartIcon(props: SvgIconConstituentValues) {
  return (
    <svg
      id="shopping_cart_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path id="Path_3646" data-name="Path 3646" d="M0,0H24V24H0Z" fill="none" />
      <path
        id="Path_3647"
        data-name="Path 3647"
        d="M7,18a2,2,0,1,0,2,2A2,2,0,0,0,7,18ZM1,2V4H3l3.6,7.59L5.25,14.04A1.933,1.933,0,0,0,5,15a2.006,2.006,0,0,0,2,2H19V15H7.42a.248.248,0,0,1-.25-.25l.03-.12L8.1,13h7.45a1.991,1.991,0,0,0,1.75-1.03l3.58-6.49A.977.977,0,0,0,21,5a1,1,0,0,0-1-1H5.21L4.27,2H1ZM17,18a2,2,0,1,0,2,2A2,2,0,0,0,17,18Z"
        fill="#231f20"
      />
    </svg>
  );
}
export function PhoneBlackIcon(props: SvgIconConstituentValues) {
  return (
    <svg
      id="phone_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path id="Path_3617" data-name="Path 3617" d="M0,0H24V24H0Z" fill="none" />
      <path
        id="Path_3618"
        data-name="Path 3618"
        d="M6.62,10.79a15.149,15.149,0,0,0,6.59,6.59l2.2-2.2a.994.994,0,0,1,1.02-.24,11.407,11.407,0,0,0,3.57.57,1,1,0,0,1,1,1V20a1,1,0,0,1-1,1A17,17,0,0,1,3,4,1,1,0,0,1,4,3H7.5a1,1,0,0,1,1,1,11.36,11.36,0,0,0,.57,3.57,1,1,0,0,1-.25,1.02Z"
      />
    </svg>
  );
}

export function ClockBlack(props: SvgIconConstituentValues) {
  return (
    <svg
      id="operating_time_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path id="Path_2071" data-name="Path 2071" d="M0,0H24V24H0Z" fill="none" />
      <path
        id="Path_2072"
        data-name="Path 2072"
        d="M11.99,2A10,10,0,1,0,22,12,10,10,0,0,0,11.99,2ZM12,20a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        fill="#231f20"
      />
      <path
        id="Path_2073"
        data-name="Path 2073"
        d="M12.5,7H11v6l5.25,3.15L17,14.92l-4.5-2.67Z"
        fill="#231f20"
      />
    </svg>
  );
}
export function FaceBook(props: SvgIconConstituentValues) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" {...props}>
      <g id="Layer_2" data-name="Layer 2" transform="translate(64.012 64.017)">
        <g id="Background" transform="translate(-64.012 -64.017)">
          <circle
            id="Ellipse_223"
            data-name="Ellipse 223"
            cx="13"
            cy="13"
            r="13"
            transform="translate(0 0)"
            fill="#707070"
          />
          <path
            id="Path_3715"
            data-name="Path 3715"
            d="M113.54,77.65V70.308h-2.62v-2.62h2.62V65.274c0-2.437,1.439-3.874,3.613-3.874a16.407,16.407,0,0,1,2.152.146v2.738h-1.747c-1.182,0-1.4.587-1.4,1.411v2h3.028l-.428,2.62h-2.6v7.342Z"
            transform="translate(-102.114 -56.525)"
            fill="#fff"
          />
        </g>
      </g>
    </svg>
  );
}
export function Instagram(props: SvgIconConstituentValues) {
  return (
    <svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      {...props}
    >
      <g id="Background">
        <circle
          id="Ellipse_222"
          data-name="Ellipse 222"
          cx="13"
          cy="13"
          r="13"
          transform="translate(0 0)"
          fill="#707070"
        />
        <path
          id="Path_3712"
          data-name="Path 3712"
          d="M73.249,77.65H65.8a4.406,4.406,0,0,1-4.4-4.4V65.8a4.406,4.406,0,0,1,4.4-4.4h7.448a4.406,4.406,0,0,1,4.4,4.4v7.448A4.406,4.406,0,0,1,73.249,77.65ZM65.8,62.754A3.05,3.05,0,0,0,62.754,65.8v7.448A3.05,3.05,0,0,0,65.8,76.294h7.448a3.051,3.051,0,0,0,3.046-3.046V65.8a3.05,3.05,0,0,0-3.047-3.046Z"
          transform="translate(-56.525 -56.525)"
          fill="#fff"
        />
        <path
          id="Path_3713"
          data-name="Path 3713"
          d="M116.623,120.685a4.063,4.063,0,1,1,4.062-4.062,4.063,4.063,0,0,1-4.062,4.062Zm0-6.77a2.708,2.708,0,1,0,2.708,2.708A2.708,2.708,0,0,0,116.623,113.915Z"
          transform="translate(-103.623 -103.623)"
          fill="#fff"
        />
        <path
          id="Path_3714"
          data-name="Path 3714"
          d="M207.311,97.65a.931.931,0,1,1-.931.93A.931.931,0,0,1,207.311,97.65Z"
          transform="translate(-189.995 -89.897)"
          fill="#fff"
        />
      </g>
    </svg>
  );
}
export function Line(props: SvgIconConstituentValues) {
  return (
    <svg
      id="Layer_2"
      data-name="Layer 2"
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      {...props}
    >
      <g id="Background">
        <circle
          id="Ellipse_221"
          data-name="Ellipse 221"
          cx="13"
          cy="13"
          r="13"
          transform="translate(0 0)"
          fill="#707070"
        />
        <path
          id="Path_3711"
          data-name="Path 3711"
          d="M67.909,70.29c0-4.049-4.057-7.34-9.045-7.34s-9.045,3.292-9.045,7.34c0,3.628,3.218,6.669,7.564,7.242.295.064.7.195.794.446a1.86,1.86,0,0,1,.029.818s-.106.635-.129.774c-.04.229-.182.894.784.487a29.207,29.207,0,0,0,7.107-5.251h0A6.524,6.524,0,0,0,67.909,70.29ZM55.673,72.45a.176.176,0,0,1-.175.177H52.963a.174.174,0,0,1-.122-.05h0a.175.175,0,0,1-.049-.121h0V68.512a.175.175,0,0,1,.176-.175H53.6a.176.176,0,0,1,.171.175v3.131H55.5a.175.175,0,0,1,.175.175Zm1.53,0a.175.175,0,0,1-.176.175h-.635a.176.176,0,0,1-.176-.175V68.512a.176.176,0,0,1,.176-.175h.635a.175.175,0,0,1,.176.175Zm4.367,0a.175.175,0,0,1-.176.175h-.635a.168.168,0,0,1-.045-.006h0l-.012,0H60.7l-.009,0h-.013l-.011-.007h0a.182.182,0,0,1-.045-.044l-1.812-2.451v2.341a.175.175,0,0,1-.176.175h-.635a.175.175,0,0,1-.176-.175v-3.94a.175.175,0,0,1,.176-.175h.7l.01,0h.006l.009.006h.006l.01.006h0l.009.008h0l.011.01h0l.013.017,1.806,2.439V68.512a.176.176,0,0,1,.176-.175h.635a.175.175,0,0,1,.176.175Zm3.5-3.3a.175.175,0,0,1-.175.176H63.173v.665H64.9a.175.175,0,0,1,.175.176V70.8a.175.175,0,0,1-.175.176H63.173v.667H64.9a.175.175,0,0,1,.175.175v.635a.175.175,0,0,1-.175.176H62.362a.174.174,0,0,1-.121-.05h0a.176.176,0,0,1-.049-.121h0V68.512h0a.173.173,0,0,1,.049-.121h0a.176.176,0,0,1,.121-.049H64.9a.175.175,0,0,1,.175.176Z"
          transform="translate(-45.865 -57.952)"
          fill="#fff"
        />
      </g>
    </svg>
  );
}
export function Youtube(props: SvgIconConstituentValues) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" {...props}>
      <g id="Group_109" data-name="Group 109" transform="translate(-1610.532 -1542.306)">
        <g id="Layer_2" data-name="Layer 2" transform="translate(1641.241 1573.028)">
          <g id="Background" transform="translate(-30.709 -30.722)">
            <circle
              id="Ellipse_220"
              data-name="Ellipse 220"
              cx="13"
              cy="13"
              r="13"
              transform="translate(0 0)"
              fill="#707070"
            />
            <path
              id="Path_3710"
              data-name="Path 3710"
              d="M77.458,94.225a3.513,3.513,0,0,0-.646-1.612,2.326,2.326,0,0,0-1.628-.688C72.91,91.76,69.5,91.76,69.5,91.76h-.007s-3.414,0-5.685.164a2.327,2.327,0,0,0-1.628.688,3.508,3.508,0,0,0-.645,1.612,24.555,24.555,0,0,0-.163,2.63v1.233a24.557,24.557,0,0,0,.163,2.63,3.521,3.521,0,0,0,.645,1.612,2.754,2.754,0,0,0,1.792.695c1.3.125,5.525.164,5.525.164s3.414,0,5.689-.17a2.321,2.321,0,0,0,1.628-.688,3.516,3.516,0,0,0,.646-1.613,24.789,24.789,0,0,0,.159-2.63V96.856a24.672,24.672,0,0,0-.159-2.63M67.613,99.8V94.8l4.8,2.5Z"
              transform="translate(-56.497 -84.473)"
              fill="#fff"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
export function AppStore(props: SvgIconConstituentValues) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="161.546"
      height="54"
      viewBox="0 0 161.546 54"
      {...props}
    >
      <g id="Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917" transform="translate(0 0)">
        <g id="Group_16833" data-name="Group 16833" transform="translate(0 0)">
          <g id="Group_16831" data-name="Group 16831">
            <path
              id="Path_3687"
              data-name="Path 3687"
              d="M148.682,0H12.872c-.5,0-.984,0-1.478,0-.413,0-.823.011-1.241.017A17.84,17.84,0,0,0,7.448.258,9,9,0,0,0,4.882,1.1,8.691,8.691,0,0,0,2.7,2.7,8.449,8.449,0,0,0,1.106,4.885,8.912,8.912,0,0,0,.262,7.454a17.541,17.541,0,0,0-.242,2.7c-.013.414-.014.829-.02,1.243V42.6c.007.419.008.825.02,1.245a17.539,17.539,0,0,0,.242,2.7,8.893,8.893,0,0,0,.844,2.571A8.38,8.38,0,0,0,2.7,51.3a8.47,8.47,0,0,0,2.185,1.591,9.046,9.046,0,0,0,2.566.852,18.164,18.164,0,0,0,2.705.239c.417.009.827.014,1.241.014.494,0,.983,0,1.478,0h135.81c.485,0,.978,0,1.463,0,.411,0,.833-.005,1.245-.014a17.925,17.925,0,0,0,2.7-.239,9.185,9.185,0,0,0,2.576-.852,8.474,8.474,0,0,0,2.183-1.591,8.633,8.633,0,0,0,1.6-2.179,8.915,8.915,0,0,0,.836-2.571,18.232,18.232,0,0,0,.251-2.7c.005-.419.005-.825.005-1.245.011-.49.011-.978.011-1.477V12.874c0-.494,0-.985-.011-1.474,0-.414,0-.829-.005-1.243a18.232,18.232,0,0,0-.251-2.7,8.933,8.933,0,0,0-.836-2.569,8.729,8.729,0,0,0-3.778-3.78A9.136,9.136,0,0,0,154.09.258a17.609,17.609,0,0,0-2.7-.239c-.411-.007-.833-.015-1.245-.017-.485,0-.978,0-1.463,0Z"
              transform="translate(0 0)"
              fill="#a6a6a6"
            />
            <path
              id="Path_3688"
              data-name="Path 3688"
              d="M11.095,52.512c-.411,0-.813-.005-1.221-.014a17.128,17.128,0,0,1-2.523-.22,7.943,7.943,0,0,1-2.237-.74,7.3,7.3,0,0,1-1.886-1.372A7.183,7.183,0,0,1,1.851,48.28a7.724,7.724,0,0,1-.733-2.237,16.758,16.758,0,0,1-.225-2.531c-.009-.285-.02-1.233-.02-1.233V11.094s.012-.933.02-1.208a16.7,16.7,0,0,1,.223-2.527A7.77,7.77,0,0,1,1.85,5.115,7.254,7.254,0,0,1,3.22,3.228a7.513,7.513,0,0,1,1.893-1.38,7.861,7.861,0,0,1,2.232-.734A16.991,16.991,0,0,1,9.877.891L11.1.875H149.833l1.233.017a16.72,16.72,0,0,1,2.509.219,8.017,8.017,0,0,1,2.256.74,7.551,7.551,0,0,1,3.26,3.267,7.779,7.779,0,0,1,.723,2.226,17.545,17.545,0,0,1,.235,2.548c0,.382,0,.793,0,1.2.011.506.011.988.011,1.474V40.821c0,.49,0,.969-.011,1.452,0,.439,0,.841-.005,1.255a17.19,17.19,0,0,1-.231,2.5,7.747,7.747,0,0,1-.729,2.254,7.4,7.4,0,0,1-1.371,1.871,7.307,7.307,0,0,1-1.889,1.38,7.914,7.914,0,0,1-2.252.742,16.931,16.931,0,0,1-2.523.22c-.4.009-.809.014-1.211.014l-1.463,0Z"
              transform="translate(0.306 0.306)"
            />
          </g>
          <g id="_Group_" data-name="&lt;Group&gt;" transform="translate(13.462 11.773)">
            <g id="_Group_2" data-name="&lt;Group&gt;">
              <g id="_Group_3" data-name="&lt;Group&gt;">
                <path
                  id="_Path_"
                  data-name="&lt;Path&gt;"
                  d="M29.948,22.515a6.681,6.681,0,0,1,3.181-5.605A6.839,6.839,0,0,0,27.741,14c-2.267-.238-4.465,1.357-5.62,1.357-1.178,0-2.956-1.333-4.871-1.293a7.176,7.176,0,0,0-6.038,3.683c-2.611,4.52-.663,11.164,1.838,14.818,1.251,1.789,2.714,3.788,4.627,3.717,1.873-.078,2.572-1.194,4.832-1.194,2.239,0,2.9,1.194,4.848,1.149,2.009-.033,3.275-1.8,4.483-3.6a14.8,14.8,0,0,0,2.05-4.175,6.456,6.456,0,0,1-3.941-5.939Z"
                  transform="translate(-9.972 -6.882)"
                  fill="#fff"
                />
                <path
                  id="_Path_2"
                  data-name="&lt;Path&gt;"
                  d="M23.174,13.433a6.578,6.578,0,0,0,1.5-4.712,6.693,6.693,0,0,0-4.33,2.24A6.259,6.259,0,0,0,18.8,15.5a5.534,5.534,0,0,0,4.37-2.066Z"
                  transform="translate(-6.885 -8.72)"
                  fill="#fff"
                />
              </g>
            </g>
            <g id="Group_16832" data-name="Group 16832" transform="translate(33.015 12.353)">
              <path
                id="Path_3689"
                data-name="Path 3689"
                d="M45.059,30.311h-6.39l-1.535,4.531H34.427L40.48,18.078h2.812l6.053,16.764H46.592ZM39.33,28.22H44.4l-2.5-7.354h-.07Z"
                transform="translate(-34.427 -17.799)"
                fill="#fff"
              />
              <path
                id="Path_3690"
                data-name="Path 3690"
                d="M58.145,27.588c0,3.8-2.033,6.238-5.1,6.238A4.144,4.144,0,0,1,49.2,31.688H49.14v6.054H46.631V21.476H49.06v2.033h.046A4.336,4.336,0,0,1,53,21.348C56.1,21.348,58.145,23.8,58.145,27.588Zm-2.579,0c0-2.475-1.279-4.1-3.23-4.1-1.917,0-3.206,1.661-3.206,4.1,0,2.463,1.289,4.112,3.206,4.112,1.951,0,3.23-1.615,3.23-4.112Z"
                transform="translate(-30.156 -16.655)"
                fill="#fff"
              />
              <path
                id="Path_3691"
                data-name="Path 3691"
                d="M68.109,27.588c0,3.8-2.033,6.238-5.1,6.238a4.144,4.144,0,0,1-3.846-2.138H59.1v6.054H56.6V21.476h2.428v2.033h.046a4.336,4.336,0,0,1,3.892-2.161C66.065,21.348,68.109,23.8,68.109,27.588Zm-2.579,0c0-2.475-1.279-4.1-3.23-4.1-1.917,0-3.206,1.661-3.206,4.1,0,2.463,1.289,4.112,3.206,4.112,1.951,0,3.23-1.615,3.23-4.112Z"
                transform="translate(-26.668 -16.655)"
                fill="#fff"
              />
              <path
                id="Path_3692"
                data-name="Path 3692"
                d="M72.376,30.244c.186,1.662,1.8,2.754,4.008,2.754,2.115,0,3.636-1.092,3.636-2.591,0-1.3-.918-2.08-3.09-2.614l-2.173-.523c-3.078-.744-4.507-2.183-4.507-4.519,0-2.892,2.521-4.879,6.1-4.879,3.542,0,5.971,1.987,6.053,4.879H79.87c-.152-1.673-1.535-2.683-3.556-2.683s-3.4,1.022-3.4,2.509c0,1.185.883,1.883,3.044,2.416l1.847.454c3.44.813,4.869,2.2,4.869,4.647,0,3.136-2.5,5.1-6.472,5.1-3.718,0-6.228-1.918-6.39-4.95Z"
                transform="translate(-22.044 -17.871)"
                fill="#fff"
              />
              <path
                id="Path_3693"
                data-name="Path 3693"
                d="M84.46,19.3v2.892h2.324v1.987H84.46v6.738c0,1.047.465,1.535,1.487,1.535a7.841,7.841,0,0,0,.825-.058v1.975a6.89,6.89,0,0,1-1.393.116c-2.475,0-3.44-.929-3.44-3.3V24.179H80.163V22.192H81.94V19.3Z"
                transform="translate(-18.42 -17.371)"
                fill="#fff"
              />
              <path
                id="Path_3694"
                data-name="Path 3694"
                d="M86.065,27.593c0-3.846,2.265-6.262,5.8-6.262s5.8,2.416,5.8,6.262-2.243,6.262-5.8,6.262S86.065,31.449,86.065,27.593Zm9.039,0c0-2.638-1.209-4.2-3.242-4.2s-3.241,1.569-3.241,4.2c0,2.649,1.208,4.194,3.241,4.194S95.1,30.242,95.1,27.593Z"
                transform="translate(-16.354 -16.66)"
                fill="#fff"
              />
              <path
                id="Path_3695"
                data-name="Path 3695"
                d="M96.186,21.476h2.393v2.08h.058a2.915,2.915,0,0,1,2.94-2.208,3.869,3.869,0,0,1,.86.094v2.347a3.507,3.507,0,0,0-1.127-.152,2.528,2.528,0,0,0-2.614,2.812V33.7H96.186Z"
                transform="translate(-12.812 -16.655)"
                fill="#fff"
              />
              <path
                id="Path_3696"
                data-name="Path 3696"
                d="M112.242,30.114c-.338,2.219-2.5,3.741-5.263,3.741-3.556,0-5.763-2.382-5.763-6.2s2.219-6.32,5.657-6.32c3.382,0,5.508,2.323,5.508,6.029v.86H103.75v.152a3.183,3.183,0,0,0,3.288,3.462,2.765,2.765,0,0,0,2.823-1.719Zm-8.481-3.648h6.111a2.939,2.939,0,0,0-3-3.1,3.094,3.094,0,0,0-3.112,3.1Z"
                transform="translate(-11.051 -16.66)"
                fill="#fff"
              />
            </g>
          </g>
        </g>
        <g id="_Group_4" data-name="&lt;Group&gt;" transform="translate(48.156 11.39)">
          <g id="Group_16834" data-name="Group 16834">
            <path
              id="Path_3697"
              data-name="Path 3697"
              d="M38.581,8.733a3.564,3.564,0,0,1,3.79,4c0,2.573-1.391,4.053-3.79,4.053h-2.91V8.733Zm-1.659,6.916h1.519a2.532,2.532,0,0,0,2.656-2.9,2.539,2.539,0,0,0-2.656-2.881H36.922Z"
              transform="translate(-35.671 -8.336)"
              fill="#fff"
            />
            <path
              id="Path_3698"
              data-name="Path 3698"
              d="M41.684,13.262a2.88,2.88,0,1,1,5.734,0,2.88,2.88,0,1,1-5.734,0Zm4.5,0c0-1.318-.592-2.088-1.631-2.088s-1.629.771-1.629,2.088.587,2.093,1.629,2.093S46.184,14.585,46.184,13.262Z"
              transform="translate(-33.571 -7.852)"
              fill="#fff"
            />
            <path
              id="Path_3699"
              data-name="Path 3699"
              d="M53.325,16.274H52.08L50.824,11.8h-.095l-1.251,4.477H48.245l-1.676-6.079h1.217l1.089,4.639h.09l1.25-4.639h1.151l1.25,4.639h.095l1.084-4.639h1.2Z"
              transform="translate(-31.856 -7.822)"
              fill="#fff"
            />
            <path
              id="Path_3700"
              data-name="Path 3700"
              d="M53.854,10.227h1.155v.966h.09a1.82,1.82,0,0,1,1.814-1.083,1.977,1.977,0,0,1,2.1,2.261v3.935h-1.2V12.672c0-.977-.425-1.463-1.312-1.463a1.394,1.394,0,0,0-1.452,1.54v3.556h-1.2Z"
              transform="translate(-29.307 -7.854)"
              fill="#fff"
            />
            <path
              id="Path_3701"
              data-name="Path 3701"
              d="M59.094,8.437h1.2v8.452h-1.2Z"
              transform="translate(-27.473 -8.437)"
              fill="#fff"
            />
            <path
              id="Path_3702"
              data-name="Path 3702"
              d="M61.221,13.262a2.88,2.88,0,1,1,5.734,0,2.881,2.881,0,1,1-5.734,0Zm4.5,0c0-1.318-.592-2.088-1.631-2.088s-1.629.771-1.629,2.088.587,2.093,1.629,2.093S65.721,14.585,65.721,13.262Z"
              transform="translate(-26.733 -7.852)"
              fill="#fff"
            />
            <path
              id="Path_3703"
              data-name="Path 3703"
              d="M66.4,14.585c0-1.094.815-1.725,2.261-1.815l1.647-.095v-.525c0-.642-.425-1-1.245-1-.67,0-1.134.246-1.267.676H66.636c.123-1.044,1.1-1.714,2.484-1.714,1.524,0,2.384.759,2.384,2.043V16.3H70.348V15.45h-.095a2.045,2.045,0,0,1-1.826.954A1.836,1.836,0,0,1,66.4,14.585Zm3.908-.519v-.508l-1.484.095c-.837.056-1.217.341-1.217.877s.475.865,1.127.865a1.433,1.433,0,0,0,1.574-1.329Z"
              transform="translate(-24.916 -7.852)"
              fill="#fff"
            />
            <path
              id="Path_3704"
              data-name="Path 3704"
              d="M71.348,13.847c0-1.921.987-3.138,2.523-3.138a2,2,0,0,1,1.864,1.066h.09V8.437h1.2v8.452h-1.15v-.96h-.095a2.11,2.11,0,0,1-1.909,1.061C72.325,16.989,71.348,15.772,71.348,13.847Zm1.239,0c0,1.289.608,2.065,1.624,2.065s1.636-.787,1.636-2.06-.631-2.065-1.636-2.065-1.624.781-1.624,2.06Z"
              transform="translate(-23.184 -8.437)"
              fill="#fff"
            />
            <path
              id="Path_3705"
              data-name="Path 3705"
              d="M79.234,13.262a2.88,2.88,0,1,1,5.734,0,2.88,2.88,0,1,1-5.734,0Zm4.5,0c0-1.318-.592-2.088-1.631-2.088s-1.629.771-1.629,2.088.587,2.093,1.629,2.093S83.733,14.585,83.733,13.262Z"
              transform="translate(-20.429 -7.852)"
              fill="#fff"
            />
            <path
              id="Path_3706"
              data-name="Path 3706"
              d="M84.669,10.227h1.155v.966h.09a1.82,1.82,0,0,1,1.814-1.083,1.977,1.977,0,0,1,2.1,2.261v3.935h-1.2V12.672c0-.977-.425-1.463-1.312-1.463a1.394,1.394,0,0,0-1.451,1.54v3.556h-1.2Z"
              transform="translate(-18.522 -7.854)"
              fill="#fff"
            />
            <path
              id="Path_3707"
              data-name="Path 3707"
              d="M94.077,9.074v1.541h1.317v1.011H94.077v3.126c0,.637.262.916.86.916a4,4,0,0,0,.457-.028v1a3.936,3.936,0,0,1-.653.061c-1.334,0-1.865-.469-1.865-1.641V11.625h-.965V10.615h.965V9.074Z"
              transform="translate(-15.987 -8.214)"
              fill="#fff"
            />
            <path
              id="Path_3708"
              data-name="Path 3708"
              d="M95.7,8.437h1.189v3.35h.095A1.871,1.871,0,0,1,98.842,10.7a2,2,0,0,1,2.094,2.266v3.925h-1.2V13.26c0-.971-.452-1.463-1.3-1.463A1.42,1.42,0,0,0,96.9,13.339v3.55H95.7Z"
              transform="translate(-14.659 -8.437)"
              fill="#fff"
            />
            <path
              id="Path_3709"
              data-name="Path 3709"
              d="M106.179,14.663a2.468,2.468,0,0,1-2.634,1.759,2.761,2.761,0,0,1-2.808-3.138,2.8,2.8,0,0,1,2.8-3.176c1.691,0,2.712,1.156,2.712,3.064v.419h-4.293v.067a1.607,1.607,0,0,0,1.619,1.741,1.457,1.457,0,0,0,1.446-.737Zm-4.22-1.959h3.07a1.467,1.467,0,0,0-1.5-1.575,1.555,1.555,0,0,0-1.574,1.575Z"
              transform="translate(-12.907 -7.852)"
              fill="#fff"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
export function GGPlay(props: SvgIconConstituentValues) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="206.72"
      height="80"
      viewBox="0 0 206.72 80"
      {...props}
    >
      <image
        id="google-play-badge"
        width="206.72"
        height="80"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoYAAAD6CAYAAAA89YbqAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAANhJJREFUeNrsnQucFNWZt98xKHIxghKUL7iA65U1goFdXDUq+/lLolkjBCNqgkh0veTLt15Wk5glQRY3qysqaBTvgCYSkygaN2ZVbprVSGAELyGCIAwgw8AIA8MwA3Pp7X9BtTVtT1d1d1Xf5nl+v56Zvkx3dZ3qPk+957zvqYjFYgYAAAAAcAC7AAAAAAAQQwAAAABADAEAAAAAMQQAAAAAxBAAAAAAEEMAAAAAQAwBAAAAADEEAAAAAMQQAAAAABBDAAAAAEAMAQAAAAAxBAAAAADEEAAAAAAQQwAAAABADAEAAAAAMQQAAAAAxBAAAAAAEEMAAAAAQAwBAAAAADEEAAAAAMQQAAAAABBDAAAAAEAMAQAAAAAxBAAAAADEEAAAAAAQQwAAAABADAEAAAAAMQQAAAAAxBAAAAAAEEMAAAAAQAwBAAAAADEEAAAAAMQQAAAAABBDAAAAAEAMAQAAAAAxBAAAAADEEAAAAAAQQwAAAABADAEAAAAAMQQAAACAMqFLZ3mjY8eOHdCtW7fRXbt2PSn++xiaHgAAANJRX1//x9bW1prGxsa5Tz/9dFVneM8VsVisbN/cFVdc8R99+/b9Zv/+/QccdthhXTjEAQAAIBuqq6sbN23atLKmpub2J5988mnEsERQZLBfv36zjz322NORQQAAAAibbdu2tbzzzjuzH3rooSsRwyLm6quvfnTEiBHf6datWwWHLQAAAEQtiEuWLLl51qxZ0xDDIkJRwiFDhiwfNGhQr1T319bW2ooVK6yqqsq5iK1btzoXAAAAAC8DBgywHj16JP4ePHiwnXjiida9e/eUj6+srFy+YcOGUeUwD7HkxXDcuHFjTz311J+nGjZ+7bXXnIukEAAAACAXhg8fbueee64jicloDuLixYtPLHU5LGkxlBSOHDlyTvLQcdzc7YknniAiCAAAAKGjCGLcQZxoohcNLb/55pvfLuXklJIVw1RSuHv3bkcIFSUEAAAAiJIxY8Y4Fy+lHjksSTHUnMIzzzxztXf4WFI4ZcqUxBxCAAAAgKhR9PDGG29sN/9Qchi/rXspvp+SXPlEiSZIIQAAABQa5THIQeQiLv369et20003LUMM84BK0nizj5FCAAAAKCRykAcffLDdbcOGDRt6+eWXX48YRoiGkFWn0Hub5hQihQAAAFBIli5das8880y724477rhJiGGEaEUTb7KJso9JNAEAAIBiQGKo2skuGuEstahhSYmhlrnzXle0EAAAAKBYSB5SLrWoYcmI4RVXXPEf3oQTRQqpUwgAAADFhLvSmouihpdeeukZiGHI9O3b95ve6wwhAwAAQDHy+9//vt313r17/wtiGDL9+/dPlBd31z4GAAAAKDaUiOKlT58+pyKGIaJsZO8wMlIIAAAAxYpK6XmHkwcMGHAEYhgi3bp1G+29TnkaAAAAKGb+8pe/eD2mQkEuxDAkunbtehJiCAAAAKVCQ0NDu+vJQS7EMAfiO/MYDjEAAAAoFbwRw1LiAJoOAAAAABBDAAAAAEAMAQAAAAAxBAAAAADEEAAAAAAQQwAAAABADAEAAAAAMQQAAACAgHRhFwDkn6FDh9qECRPsnHPOsd69e1tjY2Pivm7dutm7775rc+bMseeee87q6uoCPefll19uAwcOzGp7Fi1a5FzE2Wef7Vxyxfuc2Wz/rbfemvi7UNvUEdqW8ePH22mnnWaf+9znbPv27Tm3X6p9oP+dNm1a1v8/a9YsW7duHR84AAhOLBYr+st111236Kmnnoq5l8GDB8e06cV86THoiNiJE8fETn/+B7HTf/uD2BfuHBc76vKzYwf27lH0284luktcKGIrV66MbdmyJeZHXBZjNTU1senTp8d69erl+9xr1qyJZcsTTzyReB79HQZxscto33i3f+fOne3uK9Q2JV9GjRoVq62tdS5B2m/Tpk2x22+/PVD7pWrDbdu2OcdMNvtQr53J/3LhwiXci1zF6y7xk8nrS8G5GEqOgBOnXmNnvDLR7Fsn26bjDrJNxx5kjecfbX0nftXOev3f7PifjLEDD+vBjupExMXAZs6cac8++6wdd9xxTpTJj4MPPtj69u1rV155pX344YdOlLGz0NLSUnTtp0ij2vDwww93LkHar1+/fjqxdSKI2bSfosnxDsV5/UzxRqEBAILCUHLI9L/mVuv21b+zpY0LLFaxPyqr3/FLbXODfeYzB9j/ufyL9qVLT7O1D82ztff8np3WCaSwsrLSjjzySOvevXu7+3bs2GG7d+9OdOQahuzSpYv16NEj8Vj91mXevHmOJGp4EvLbfhK7/v37f+q+jz/+2Gk/tZm3/bziL0HU/6r9NHVg+fLlGcvhD3/4Q+cCAIAYltLO7NXHen37X+ytbT3jHftO69p1aUIKY/svLdZmVS3b7aMuB9ig6//BBl52lr1z85P28bw/swPLWAqPPvrodrdrTtqSJUtsxowZnxI9/c+oUaPslltusSOOOMIOPfRQ5/ZDDjnELrrookBiqOe/9957A2+nd97d448/7kQoUzF69Gg7+eSTE9dfffXVDufshTGXr9Db1JEU7tq1y15++WWbMmXKp0RPc/wuvfRS+973vudIncRQKMr44osv2nnnnZeRHOr/r776avvlL3+ZsVQCACCGBeTIS75nqyt6OiLY0DDW+X3QwUsTUmie382xmK1q3mJdD+1ix8+60lre22zv/r9Z1rimhh1ZRjz55JNOpNDLxo0b7fzzz++wk1fCgZIGdPnRj35kN998sxMxlIhIOILiTd7IhHQJGhJcr4Tpcdm+TilskyRccufS0NBgtbW1TvJJR0kduv2nP/2pPfDAA3bPPffYmDFjHKkXGlpesGCBs81+SSlbtmxxphK4gjp79mwbMmQIHyoAiBTmGIZp2V84zZpi+69IDneNtT17hn9KCmP6sf96k7XY282bbOPgrjbi9Yl2wvRxzD8sExT1O+OMMxJDwpKKVatW2Re+8IXAkR8Jxg033OBIoWQS8tt+EjEN67vtt3TpUmeuYJBMX4mfMs8V+a2vr0/cLtHUCYMfra2t7eRxwIABzokCAABiWCLUHdg9IYXu7931Y21v0/CUUuj9XRdrtMV71lvLhcfb31dOsYE3n8sOLXEeffTRdkkDGt4dMWJERuVLhCKHSGHh20+RQslipu13//33O9HDpqamxG2nn366b2khDSErYunOQdWUgptuuimrRBQAAMSwAPQceno7KXR/N+4ca82Sww6k0Blq3v/YjW077K0Da6z7TWfZl1bcbod9+W/YsSVIcs09SeG4ceMylgoonvZTjcBs20+JI4o4uihqeNddd/n+n6LFSlDy/h/JRwCAGJYIdW2flsKEHNbF5bBxWFopTMw/rGizNa0f29uH7bC/fupKG7bgB3bI3w1iB5cQKn7sLWlSXV0dajIGlF77KdrnjRqOHDnS/zslLqLf/e532wmp5lOGUewbAAAx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"
      />
    </svg>
  );
}
export function NavBarIcon(props: SvgIconConstituentValues) {
  return (
    <svg
      id="menu_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <defs></defs>
      <path fill="none" id="Path_3664" data-name="Path 3664" className="cls-1" d="M0,0H24V24H0Z" />
      <path
        id="Path_3665"
        data-name="Path 3665"
        className="cls-2"
        d="M3,18H21V16H3Zm0-5H21V11H3ZM3,6V8H21V6Z"
        fill={props.fill ? props.fill : "#231f20"}
      />
    </svg>
  );
}
export function SearchIcon(props: SvgIconConstituentValues) {
  return (
    <svg
      id="search_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <defs></defs>
      <path fill="none" id="Path_2090" data-name="Path 2090" className="cls-1" d="M0,0H24V24H0Z" />
      <path
        fill="#bcbcbc"
        id="Path_2091"
        data-name="Path 2091"
        className="cls-2"
        d="M15.5,14h-.79l-.28-.27a6.51,6.51,0,1,0-.7.7l.27.28v.79l5,4.99L20.49,19Zm-6,0A4.5,4.5,0,1,1,14,9.5,4.494,4.494,0,0,1,9.5,14Z"
      />
    </svg>
  );
}
export function LogoMember(props: SvgIconConstituentValues) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="28.923"
      height="20"
      viewBox="0 0 28.923 20"
      {...props}
    >
      <image
        id="successmore_symbol_only_logo"
        data-name="successmore symbol only logo"
        width="28.923"
        height="20"
        xlinkHref="data:image/png;base64,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"
      />
    </svg>
  );
}
export function PhoneIcon(props: SvgIconConstituentValues) {
  return (
    <svg
      id="phone_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      {...props}
    >
      <defs></defs>
      <path fill="none" id="Path_2065" data-name="Path 2065" className="cls-1" d="M0,0H22V22H0Z" />
      <path
        fill="#ff7500"
        id="Path_2066"
        data-name="Path 2066"
        className="cls-2"
        d="M6.318,10.141a13.886,13.886,0,0,0,6.041,6.041l2.017-2.017a.911.911,0,0,1,.935-.22,10.456,10.456,0,0,0,3.273.522.919.919,0,0,1,.917.917v3.2a.919.919,0,0,1-.917.917A15.582,15.582,0,0,1,3,3.917.919.919,0,0,1,3.917,3H7.125a.919.919,0,0,1,.917.917,10.414,10.414,0,0,0,.522,3.272.92.92,0,0,1-.229.935Z"
        transform="translate(-0.25 -0.25)"
      />
    </svg>
  );
}
export function Facebook(props: SvgIconConstituentValues) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10.001"
      height="20"
      viewBox="0 0 10.001 20"
      {...props}
    >
      <defs></defs>
      <path
        fill="#0f279e"
        id="facebook_2_"
        data-name="facebook (2)"
        className="cls-1"
        d="M14.362,3.321h1.826V.141A23.577,23.577,0,0,0,13.528,0C10.9,0,9.092,1.656,9.092,4.7V7.5H6.187v3.555H9.092V20h3.562V11.056h2.787L15.884,7.5H12.653V5.052c0-1.027.278-1.731,1.709-1.731Z"
        transform="translate(-6.187 0)"
      />
    </svg>
  );
}
export function BackIcon(props: SvgIconConstituentValues) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" {...props}>
      <defs></defs>
      <g id="Group_16206" data-name="Group 16206" transform="translate(-32 -41)">
        <circle
          fill=" #f4f5fa"
          id="Ellipse_189"
          data-name="Ellipse 189"
          className="cls-1"
          cx="15"
          cy="15"
          r="15"
          transform="translate(32 41)"
        />
        <g id="arrow_back_black_24dp" transform="translate(39 48)">
          <path
            fill="none"
            id="Path_2122"
            data-name="Path 2122"
            className="cls-2"
            d="M0,0H16V16H0Z"
          />
          <path
            fill="#ff7500"
            id="Path_2123"
            data-name="Path 2123"
            className="cls-3"
            d="M14.667,8.667H6.553L10.28,4.94,9.333,4,4,9.333l5.333,5.333.94-.94L6.553,10h8.113Z"
            transform="translate(-1.333 -1.333)"
          />
        </g>
      </g>
    </svg>
  );
}
export function MemberIdIcon(props: SvgIconConstituentValues) {
  return (
    <svg
      id="account_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path id="Path_3638" data-name="Path 3638" d="M0,0H24V24H0Z" fill="none" />
      <path
        id="Path_3639"
        data-name="Path 3639"
        d="M12,12A4,4,0,1,0,8,8,4,4,0,0,0,12,12Zm0,2c-2.67,0-8,1.34-8,4v2H20V18C20,15.34,14.67,14,12,14Z"
        fill="#ebebeb"
      />
    </svg>
  );
}
export function PasswordIcon(props: SvgIconConstituentValues) {
  return (
    <svg
      id="password_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path id="Path_3636" data-name="Path 3636" d="M0,0H24V24H0Z" fill="none" />
      <path
        id="Path_3637"
        data-name="Path 3637"
        d="M18,8H17V6A5,5,0,0,0,7,6V8H6a2.006,2.006,0,0,0-2,2V20a2.006,2.006,0,0,0,2,2H18a2.006,2.006,0,0,0,2-2V10A2.006,2.006,0,0,0,18,8Zm-6,9a2,2,0,1,1,2-2A2.006,2.006,0,0,1,12,17Zm3.1-9H8.9V6a3.1,3.1,0,0,1,6.2,0Z"
        fill="#ebebeb"
      />
    </svg>
  );
}
export function LogoSuccessMore(props: SvgIconConstituentValues) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="110.596"
      height="50"
      viewBox="0 0 110.596 50"
      {...props}
    >
      <image
        id="Success_More_Logo"
        data-name="Success More Logo"
        width="110.596"
        height="50"
        xlinkHref="data:image/png;base64,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"
      />
    </svg>
  );
}
export function UnVisibilityEye(props: SvgIconConstituentValues) {
  return (
    <svg
      id="visibility_off_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="20.045"
      height="20.045"
      viewBox="0 0 20.045 20.045"
      {...props}
    >
      <path
        id="Path_2067"
        data-name="Path 2067"
        d="M0,0H20.045V20.045H0ZM0,0H20.045V20.045H0ZM0,0H20.045V20.045H0ZM0,0H20.045V20.045H0Z"
        fill="none"
      />
      <path
        id="Path_2068"
        data-name="Path 2068"
        d="M10.188,6.341a4.178,4.178,0,0,1,4.176,4.176,4.053,4.053,0,0,1-.3,1.528L16.5,14.484a9.87,9.87,0,0,0,2.865-3.967,9.878,9.878,0,0,0-9.187-6.264,9.726,9.726,0,0,0-3.324.585l1.8,1.8A4.054,4.054,0,0,1,10.188,6.341ZM1.835,4.061l1.9,1.9.384.384A9.859,9.859,0,0,0,1,10.517,9.874,9.874,0,0,0,13.846,16.08l.351.351,2.447,2.439L17.7,17.809,2.9,3ZM6.454,8.68,7.749,9.974a2.356,2.356,0,0,0-.067.543,2.5,2.5,0,0,0,2.506,2.506,2.356,2.356,0,0,0,.543-.067l1.295,1.295A4.149,4.149,0,0,1,6.454,8.68Zm3.6-.651,2.631,2.631.017-.134A2.5,2.5,0,0,0,10.2,8.02Z"
        transform="translate(-0.165 -0.494)"
        fill="#e3e3e3"
      />
    </svg>
  );
}
export function VisibilityEye(props: SvgIconConstituentValues) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
      {...props}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  );
}
export function Close(props: SvgIconConstituentValues) {
  return (
    <svg
      id="close_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <path id="Path_3716" data-name="Path 3716" d="M0,0H18V18H0Z" fill="none" />
      <path
        id="Path_3717"
        data-name="Path 3717"
        d="M15.5,6.057,14.442,5,10.25,9.192,6.057,5,5,6.057,9.192,10.25,5,14.442,6.057,15.5l4.192-4.193L14.442,15.5,15.5,14.442,11.307,10.25Z"
        transform="translate(-1.25 -1.25)"
        fill="#bcbcbc"
      />
    </svg>
  );
}

export function MyOrderNavigationIcon(props: SvgIconConstituentValues) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <g id="list_alt_black_24dp" transform="translate(0)">
        <path
          id="Path_2084"
          data-name="Path 2084"
          d="M0,0H24V24H0Z"
          transform="translate(0)"
          fill="none"
        />
        <path
          id="Path_2085"
          data-name="Path 2085"
          d="M19,5V19H5V5H19m1.1-2H3.9a.9.9,0,0,0-.9.9V20.1a.967.967,0,0,0,.9.9H20.1a1.061,1.061,0,0,0,.9-.9V3.9A.967.967,0,0,0,20.1,3ZM11,7h6V9H11Zm0,4h6v2H11Zm0,4h6v2H11ZM7,7H9V9H7Zm0,4H9v2H7Zm0,4H9v2H7Z"
          transform="translate(0)"
          fill="#ff7500"
        />
      </g>
    </svg>
  );
}

export function ArrowRightNavigation(props: SvgIconConstituentValues) {
  return (
    <svg
      id="arrow_right_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path id="Path_3590" data-name="Path 3590" d="M0,0H24V24H0Z" fill="none" />
      <path
        id="Path_3591"
        data-name="Path 3591"
        d="M8.59,16.59,13.17,12,8.59,7.41,10,6l6,6-6,6Z"
        fill="#231f20"
      />
    </svg>
  );
}

export function AnalysisIcon(props: SvgIconConstituentValues) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <g id="statistic_black_24dp" transform="translate(0)">
        <path
          id="Path_3592"
          data-name="Path 3592"
          d="M0,0H24V24H0Z"
          transform="translate(0)"
          fill="none"
        />
        <path
          id="Path_3593"
          data-name="Path 3593"
          d="M5,9.2H8V19H5ZM10.6,5h2.8V19H10.6Zm5.6,8H19v6H16.2Z"
          transform="translate(0)"
          fill="#ff7500"
        />
      </g>
    </svg>
  );
}

export function SponsorIcon(props: SvgIconConstituentValues) {
  return (
    <svg
      id="referral_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path id="Path_2109" data-name="Path 2109" d="M0,0H24V24H0Z" fill="none" />
      <path
        id="Path_2110"
        data-name="Path 2110"
        d="M15,12a4,4,0,1,0-4-4A4,4,0,0,0,15,12ZM6,10V7H4v3H1v2H4v3H6V12H9V10Zm9,4c-2.67,0-8,1.34-8,4v2H23V18C23,15.34,17.67,14,15,14Z"
        fill="#ff7500"
      />
    </svg>
  );
}

export function HeartIcon(props: SvgIconConstituentValues) {
  return (
    <svg
      id="favorite_border_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="22.777"
      height="22.777"
      viewBox="0 0 22.777 22.777"
      {...props}
    >
      <path id="Path_2124" data-name="Path 2124" d="M0,0H22.777V22.777H0Z" fill="none" />
      <path
        id="Path_2125"
        data-name="Path 2125"
        d="M15.761,3A5.683,5.683,0,0,0,11.49,4.984,5.683,5.683,0,0,0,7.22,3,5.169,5.169,0,0,0,2,8.22c0,3.587,3.227,6.51,8.114,10.952l1.376,1.243,1.376-1.253c4.888-4.432,8.114-7.355,8.114-10.943A5.169,5.169,0,0,0,15.761,3ZM11.585,17.758l-.095.095-.095-.095c-4.517-4.09-7.5-6.8-7.5-9.538A3.244,3.244,0,0,1,7.22,4.9a3.71,3.71,0,0,1,3.388,2.24h1.775A3.687,3.687,0,0,1,15.761,4.9,3.244,3.244,0,0,1,19.083,8.22C19.083,10.962,16.1,13.667,11.585,17.758Z"
        transform="translate(-0.102 -0.153)"
        fill={props.customercolor2 || "#ff7500"}
      />
    </svg>
  );
}



export function AccountInfoIcon(props: SvgIconConstituentValues) {
  return (
    <svg
      id="account_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="16.734"
      height="16.734"
      viewBox="0 0 16.734 16.734"
      {...props}
    >
      <path id="Path_2094" data-name="Path 2094" d="M0,0H16.734V16.734H0Z" fill="none" />
      <path
        id="Path_2095"
        data-name="Path 2095"
        d="M9.578,9.578A2.789,2.789,0,1,0,6.789,6.789,2.788,2.788,0,0,0,9.578,9.578Zm0,1.395C7.716,10.973,4,11.907,4,13.762v1.395H15.156V13.762C15.156,11.907,11.44,10.973,9.578,10.973Z"
        transform="translate(-1.211 -1.211)"
        fill="#ff7500"
      />
    </svg>
  );
}

export function AddressBook(props: SvgIconConstituentValues) {
  return (
    <svg
      id="address_book_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path id="Path_3596" data-name="Path 3596" d="M0,0H24V24H0Z" fill="none" />
      <path
        id="Path_3597"
        data-name="Path 3597"
        d="M20.5,3l-.16.03L15,5.1,9,3,3.36,4.9A.5.5,0,0,0,3,5.38V20.5a.5.5,0,0,0,.5.5l.16-.03L9,18.9,15,21l5.64-1.9a.5.5,0,0,0,.36-.48V3.5A.5.5,0,0,0,20.5,3ZM15,19,9,16.89V5l6,2.11Z"
        fill="#ff7500"
      />
    </svg>
  );
}

export function SecurityIcon(props: SvgIconConstituentValues) {
  return (
    <svg
      id="security_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path id="Path_3598" data-name="Path 3598" d="M0,0H24V24H0Z" fill="none" />
      <path
        id="Path_3599"
        data-name="Path 3599"
        d="M12,1,3,5v6c0,5.55,3.84,10.74,9,12,5.16-1.26,9-6.45,9-12V5Zm0,10.99h7c-.53,4.12-3.28,7.79-7,8.94V12H5V6.3l7-3.11v8.8Z"
        fill="#ff7500"
      />
    </svg>
  );
}

export function NoteIcon(props: SvgIconConstituentValues) {
  return (
    <svg
      id="event_note_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path id="Path_2086" data-name="Path 2086" d="M0,0H24V24H0Z" fill="none" />
      <path
        id="Path_2087"
        data-name="Path 2087"
        d="M17,10H7v2H17Zm2-7H18V1H16V3H8V1H6V3H5A1.991,1.991,0,0,0,3.01,5L3,19a2,2,0,0,0,2,2H19a2.006,2.006,0,0,0,2-2V5A2.006,2.006,0,0,0,19,3Zm0,16H5V8H19Zm-5-5H7v2h7Z"
        fill="#ff7500"
      />
    </svg>
  );
}

export function NotificationsIcon(props: SvgIconConstituentValues) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="19.5"
      viewBox="0 0 19.5 19.5"
      {...props}
    >
      <path
        id="notifications_black_24dp"
        d="M12,22a2.006,2.006,0,0,0,2-2H10A2,2,0,0,0,12,22Zm6-6V11c0-3.07-1.64-5.64-4.5-6.32V4a1.5,1.5,0,0,0-3,0v.68C7.63,5.36,6,7.92,6,11v5L4,18v1H20V18Z"
        transform="translate(-4 -2.5)"
        fill="#ff7500"
      />
    </svg>
  );
}

export function TripPromotion(props: SvgIconConstituentValues) {
  return (
    <svg
      id="trip_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path id="Path_2118" data-name="Path 2118" d="M0,0H24V24H0Z" fill="none" />
      <path
        id="Path_2119"
        data-name="Path 2119"
        d="M21,16V14L13,9V3.5a1.5,1.5,0,0,0-3,0V9L2,14v2l8-2.5V19L8,20.5V22l3.5-1L15,22V20.5L13,19V13.5Z"
        fill="#ff7500"
      />
    </svg>
  );
}

export function OrganizationIcon(props: SvgIconConstituentValues) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <g id="org_tree_black_24dp" transform="translate(24) rotate(90)">
        <path id="Path_2111" data-name="Path 2111" d="M0,24H24V0H0Z" fill="none" />
        <path
          id="Path_2112"
          data-name="Path 2112"
          d="M20,10v8H13V15H7v3H0V10H7v3H9V3h4V0h7V8H13V5H11v8h2V10Z"
          transform="translate(2 3)"
          fill={props.fillColor2 || "#ff7500"}
        />
      </g>
    </svg>
  );
}

export function SettingIcon(props: SvgIconConstituentValues) {
  return (
    <svg
      id="settings_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path id="Path_3594" data-name="Path 3594" d="M0,0H24V24H0Z" fill="none" />
      <path
        id="Path_3595"
        data-name="Path 3595"
        d="M19.14,12.94A7.074,7.074,0,0,0,19.2,12a5.777,5.777,0,0,0-.07-.94l2.03-1.58a.491.491,0,0,0,.12-.61L19.36,5.55a.488.488,0,0,0-.59-.22l-2.39.96a7.064,7.064,0,0,0-1.62-.94L14.4,2.81a.484.484,0,0,0-.48-.41H10.08a.474.474,0,0,0-.47.41L9.25,5.35a7.22,7.22,0,0,0-1.62.94L5.24,5.33a.477.477,0,0,0-.59.22L2.74,8.87a.455.455,0,0,0,.12.61l2.03,1.58a5.563,5.563,0,0,0-.02,1.88L2.84,14.52a.491.491,0,0,0-.12.61l1.92,3.32a.488.488,0,0,0,.59.22l2.39-.96a7.064,7.064,0,0,0,1.62.94l.36,2.54a.492.492,0,0,0,.48.41h3.84a.466.466,0,0,0,.47-.41l.36-2.54a6.859,6.859,0,0,0,1.62-.94l2.39.96a.477.477,0,0,0,.59-.22l1.92-3.32a.463.463,0,0,0-.12-.61ZM12,15.6A3.6,3.6,0,1,1,15.6,12,3.611,3.611,0,0,1,12,15.6Z"
        fill="#ff7500"
      />
    </svg>
  );
}

export function HelpCenterIcon(props: SvgIconConstituentValues) {
  return (
    <svg
      id="help_center_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path id="Path_2116" data-name="Path 2116" d="M0,0H24V24H0Z" fill="none" />
      <path
        id="Path_2117"
        data-name="Path 2117"
        d="M11.5,2a8.5,8.5,0,0,0,0,17H12v3c4.86-2.34,8-7,8-11.5A8.506,8.506,0,0,0,11.5,2Zm1,14.5h-2v-2h2Zm0-3.5h-2c0-3.25,3-3,3-5a2,2,0,0,0-4,0h-2a4,4,0,0,1,8,0C15.5,10.5,12.5,10.75,12.5,13Z"
        fill="#ff7500"
      />
    </svg>
  );
}

export function DocumentWithIconTime(props: SvgIconConstituentValues) {
  return (
    <svg
      id="cycle_report_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect id="Rectangle_2273" data-name="Rectangle 2273" width="24" height="24" fill="none" />
      <path
        id="Path_3650"
        data-name="Path 3650"
        d="M17,12a5,5,0,1,0,5,5A5,5,0,0,0,17,12Zm1.65,7.35L16.5,17.2V14h1v2.79l1.85,1.85ZM18,3H14.82A2.988,2.988,0,0,0,9.18,3H6A2.006,2.006,0,0,0,4,5V20a2.006,2.006,0,0,0,2,2h6.11a6.743,6.743,0,0,1-1.42-2H6V5H8V8h8V5h2v5.08a7.03,7.03,0,0,1,2,.6V5A2.006,2.006,0,0,0,18,3ZM12,5a1,1,0,1,1,1-1A1,1,0,0,1,12,5Z"
        fill="#ff7500"
      />
    </svg>
  );
}

export function TravelVali(props: SvgIconConstituentValues) {
  return (
    <svg
      id="travel_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect id="Rectangle_2275" data-name="Rectangle 2275" width="24" height="24" fill="none" />
      <g id="Group_16489" data-name="Group 16489" transform="translate(5 2)">
        <path
          id="Path_3652"
          data-name="Path 3652"
          d="M9.5,18H8V9H9.5Zm3.25,0h-1.5V9h1.5ZM16,18H14.5V9H16ZM17,6H15V3a1,1,0,0,0-1-1H10A1,1,0,0,0,9,3V6H7A2.006,2.006,0,0,0,5,8V19a2.006,2.006,0,0,0,2,2,1,1,0,0,0,2,0h6a1,1,0,0,0,2,0,2.006,2.006,0,0,0,2-2V8A2.006,2.006,0,0,0,17,6ZM10.5,3.5h3V6h-3ZM17,19H7V8H17Z"
          transform="translate(-5 -2)"
          fill="#ff7500"
        />
      </g>
    </svg>
  );
}

export function NearExpireMember({ className, ...rest }: SvgIconConstituentValues) {
  return (
    <svg
      id="near_expire_member_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={clsx("fill-current text-[#ff7500]", className)}
      {...rest}
    >
      <g id="Group_16490" data-name="Group 16490">
        <rect id="Rectangle_2276" data-name="Rectangle 2276" width="24" height="24" fill="none" />
      </g>
      <g id="Group_16492" data-name="Group 16492" transform="translate(1 4)">
        <g id="Group_16491" data-name="Group 16491">
          <path
            id="Path_3653"
            data-name="Path 3653"
            d="M16.67,13.13A4.651,4.651,0,0,1,19,17v3h4V17C23,14.82,19.43,13.53,16.67,13.13Z"
            transform="translate(-1 -4)"
          />
          <path
            id="Path_3654"
            data-name="Path 3654"
            d="M15,12a4,4,0,0,0,0-8,4.178,4.178,0,0,0-1.33.24,5.98,5.98,0,0,1,0,7.52A4.178,4.178,0,0,0,15,12Z"
            transform="translate(-1 -4)"
          />
          <path
            id="Path_3655"
            data-name="Path 3655"
            d="M9,12A4,4,0,1,0,5,8,4,4,0,0,0,9,12ZM9,6A2,2,0,1,1,7,8,2.006,2.006,0,0,1,9,6Z"
            transform="translate(-1 -4)"
          />
          <path
            id="Path_3656"
            data-name="Path 3656"
            d="M9,13c-2.67,0-8,1.34-8,4v3H17V17C17,14.34,11.67,13,9,13Zm6,5H3v-.99C3.2,16.29,6.3,15,9,15s5.8,1.29,6,2Z"
            transform="translate(-1 -4)"
          />
        </g>
      </g>
    </svg>
  );
}

export function ExpireMember(props: SvgIconConstituentValues) {
  return (
    <svg
      id="expired_member_list_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect id="Rectangle_2277" data-name="Rectangle 2277" width="24" height="24" fill="none" />
      <path
        id="Path_3657"
        data-name="Path 3657"
        d="M20,17.17l-3.37-3.38a13.085,13.085,0,0,1,1.77.76A3.019,3.019,0,0,1,20,17.17Zm1.19,4.02L19.78,22.6,17.17,20H4V17.22a2.971,2.971,0,0,1,1.61-2.66,14.248,14.248,0,0,1,4.67-1.45L1.39,4.22,2.8,2.81ZM15.17,18l-3-3H12a12.108,12.108,0,0,0-5.48,1.34.971.971,0,0,0-.52.88V18ZM12,6a2,2,0,0,1,.7,3.87l1.48,1.48A4,4,0,1,0,8.65,5.82L10.13,7.3A1.989,1.989,0,0,1,12,6Z"
        fill="#ff7500"
      />
    </svg>
  );
}

export function Medal(props: SvgIconConstituentValues) {
  return (
    <svg
      id="increase_tier_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      {...props}
    >
      <g id="Group_16356" data-name="Group 16356">
        <rect id="Rectangle_1816" data-name="Rectangle 1816" width="14" height="14" fill="none" />
      </g>
      <g id="Group_16357" data-name="Group 16357" transform="translate(4.083 1.167)">
        <path
          id="Path_3614"
          data-name="Path 3614"
          d="M12.833,6.918V2H7V6.918a.578.578,0,0,0,.286.5L9.724,8.883l-.577,1.365-1.989.169,1.511,1.307-.461,1.943,1.709-1.033,1.709,1.033-.455-1.943,1.511-1.307-1.989-.169-.578-1.365,2.438-1.464A.578.578,0,0,0,12.833,6.918ZM10.5,7.968l-.583.35-.583-.35V2.583H10.5Z"
          transform="translate(-7 -2)"
          fill="#fff"
        />
      </g>
    </svg>
  );
}

export function MedalOrange(props: SvgIconConstituentValues) {
  return (
    <svg
      id="increase_tier_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="#ff7500"
      {...props}
    >
      <g id="Group_16356" data-name="Group 16356">
        <rect id="Rectangle_1816" data-name="Rectangle 1816" width="14" height="14" fill="none" />
      </g>
      <g id="Group_16357" data-name="Group 16357" transform="translate(4.083 1.167)">
        <path
          id="Path_3614"
          data-name="Path 3614"
          d="M12.833,6.918V2H7V6.918a.578.578,0,0,0,.286.5L9.724,8.883l-.577,1.365-1.989.169,1.511,1.307-.461,1.943,1.709-1.033,1.709,1.033-.455-1.943,1.511-1.307-1.989-.169-.578-1.365,2.438-1.464A.578.578,0,0,0,12.833,6.918ZM10.5,7.968l-.583.35-.583-.35V2.583H10.5Z"
          transform="translate(-7 -2)"
        />
      </g>
    </svg>
  );
}

export function CalendarArcticle(props: SvgIconConstituentValues) {
  return (
    <svg
      id="date_range_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      {...props}
    >
      <path id="Path_3623" data-name="Path 3623" d="M0,0H16V16H0Z" fill="none" />
      <path
        id="Path_3624"
        data-name="Path 3624"
        d="M7,8H5.667V9.333H7ZM9.667,8H8.333V9.333H9.667Zm2.667,0H11V9.333h1.333Zm1.333-4.667H13V2H11.667V3.333H6.333V2H5V3.333H4.333A1.327,1.327,0,0,0,3.007,4.667L3,14a1.333,1.333,0,0,0,1.333,1.333h9.333A1.337,1.337,0,0,0,15,14V4.667A1.337,1.337,0,0,0,13.667,3.333Zm0,10.667H4.333V6.667h9.333Z"
        transform="translate(-1 -0.667)"
        fill="#fff"
      />
    </svg>
  );
}
export function FilterBlack(props: SvgIconConstituentValues) {
  return (
    <svg
      id="filter_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path id="Path_2120" data-name="Path 2120" d="M0,0H24V24H0Z" fill="none" />
      <path
        id="Path_2121"
        data-name="Path 2121"
        d="M10,18h4V16H10ZM3,6V8H21V6Zm3,7H18V11H6Z"
        fill="#231f20"
      />
    </svg>
  );
}

export function ViewBannerArcticle(props: SvgIconConstituentValues) {
  return (
    <svg
      id="read_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      {...props}
    >
      <path id="Path_3625" data-name="Path 3625" d="M0,0H16V16H0Z" fill="none" />
      <path
        id="Path_3626"
        data-name="Path 3626"
        d="M8.333,4.5A7.885,7.885,0,0,0,1,9.5a7.878,7.878,0,0,0,14.667,0A7.885,7.885,0,0,0,8.333,4.5Zm0,8.333A3.333,3.333,0,1,1,11.667,9.5,3.335,3.335,0,0,1,8.333,12.833Zm0-5.333a2,2,0,1,0,2,2A2,2,0,0,0,8.333,7.5Z"
        transform="translate(-0.333 -1.5)"
        fill="#fff"
      />
    </svg>
  );
}
export function AddIconOrange(props: SvgIconConstituentValues) {
  return (
    <svg
      id="add_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      {...props}
    >
      <path id="Path_3587" data-name="Path 3587" d="M0,0H32V32H0Z" fill="none" />
      <path
        id="Path_3588"
        data-name="Path 3588"
        d="M23.667,15.667h-8v8H13v-8H5V13h8V5h2.667v8h8Z"
        transform="translate(1.667 1.667)"
        fill="#ff7500"
      />
    </svg>
  );
}

export function BackIconNews(props: SvgIconConstituentValues) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" {...props}>
      <defs></defs>
      <g id="Group_16206" data-name="Group 16206" transform="translate(-32 -41)">
        <circle
          fill="#f4f5fa"
          id="Ellipse_189"
          data-name="Ellipse 189"
          className="cls-1"
          cx="15"
          cy="15"
          r="15"
          transform="translate(32 41)"
        />
        <g id="arrow_back_black_24dp" transform="translate(39 48)">
          <path
            fill="none"
            id="Path_2122"
            data-name="Path 2122"
            className="cls-2"
            d="M0,0H16V16H0Z"
          />
          <path
            fill="#ff7500"
            id="Path_2123"
            data-name="Path 2123"
            className="cls-3"
            d="M14.667,8.667H6.553L10.28,4.94,9.333,4,4,9.333l5.333,5.333.94-.94L6.553,10h8.113Z"
            transform="translate(-1.333 -1.333)"
          />
        </g>
      </g>
    </svg>
  );
}

export function GroupSponsor(props: SvgIconConstituentValues) {
  return (
    <svg
      id="team_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      {...props}
    >
      <g id="Group_16569" data-name="Group 16569">
        <rect id="Rectangle_2279" data-name="Rectangle 2279" width="12" height="12" fill="none" />
      </g>
      <g id="Group_16571" data-name="Group 16571" transform="translate(0.5 2)">
        <g id="Group_16570" data-name="Group 16570">
          <path
            id="Path_3660"
            data-name="Path 3660"
            d="M16.67,13.13a2.325,2.325,0,0,1,1.165,1.935v1.5h2v-1.5C19.835,13.975,18.05,13.33,16.67,13.13Z"
            transform="translate(-8.835 -8.565)"
            fill="#0075c9"
          />
          <path
            id="Path_3661"
            data-name="Path 3661"
            d="M14.335,8a2,2,0,0,0,0-4,2.089,2.089,0,0,0-.665.12,2.99,2.99,0,0,1,0,3.76A2.089,2.089,0,0,0,14.335,8Z"
            transform="translate(-7.335 -4)"
            fill="#0075c9"
          />
          <path
            id="Path_3662"
            data-name="Path 3662"
            d="M7,8A2,2,0,1,0,5,6,2,2,0,0,0,7,8ZM7,5A1,1,0,1,1,6,6,1,1,0,0,1,7,5Z"
            transform="translate(-3 -4)"
            fill="#0075c9"
          />
          <path
            id="Path_3663"
            data-name="Path 3663"
            d="M5,13c-1.335,0-4,.67-4,2v1.5H9V15C9,13.67,6.335,13,5,13Zm3,2.5H2v-.495C2.1,14.645,3.65,14,5,14s2.9.645,3,1Z"
            transform="translate(-1 -8.5)"
            fill="#0075c9"
          />
        </g>
      </g>
    </svg>
  );
}

export function PVSponsor(props: SvgIconConstituentValues) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" {...props}>
      <text
        id="PV"
        transform="translate(0 11)"
        fill="#0075c9"
        font-size="10"
        font-family="SegoeUI, Segoe UI"
        font-weight="bolder"
      >
        <tspan x="0" y="0">
          PV
        </tspan>
      </text>
    </svg>
  );
}

export function AutoShipponsor(props: SvgIconConstituentValues) {
  return (
    <svg
      id="autoship_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      {...props}
    >
      <path id="Path_3658" data-name="Path 3658" d="M0,0H26V26H0Z" fill="none" />
      <path
        id="Path_3659"
        data-name="Path 3659"
        d="M21.583,8.333h-3.25V4H3.167A2.173,2.173,0,0,0,1,6.167V18.083H3.167a3.25,3.25,0,0,0,6.5,0h6.5a3.25,3.25,0,0,0,6.5,0h2.167V12.667Zm-.542,1.625,2.123,2.708H18.333V9.958ZM6.417,19.167A1.083,1.083,0,1,1,7.5,18.083,1.087,1.087,0,0,1,6.417,19.167Zm2.4-3.25a3.211,3.211,0,0,0-4.81,0H3.167V6.167h13v9.75Zm10.6,3.25A1.083,1.083,0,1,1,20.5,18.083,1.087,1.087,0,0,1,19.417,19.167Z"
        transform="translate(0.083 0.333)"
        fill="#bcbcbc"
      />
    </svg>
  );
}

export function DocumentSponsor(props: SvgIconConstituentValues) {
  return (
    <svg
      id="report_black_24dp"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...props}
    >
      <path id="Path_3648" data-name="Path 3648" d="M0,0H18V18H0Z" fill="none" />
      <path
        id="Path_3649"
        data-name="Path 3649"
        d="M7,12.5h6V14H7Zm0-3h6V11H7ZM11.5,2h-6A1.5,1.5,0,0,0,4,3.5v12A1.5,1.5,0,0,0,5.492,17H14.5A1.5,1.5,0,0,0,16,15.5v-9Zm3,13.5h-9V3.5h5.25V7.25H14.5Z"
        transform="translate(-1 -0.5)"
        fill={props.fillColor2 || "#0075c9"}
      />
    </svg>
  );
}

export function ScrollToRight(props: SvgIconConstituentValues) {
  return (
    <svg
      id="Group_16823"
      data-name="Group 16823"
      xmlns="http://www.w3.org/2000/svg"
      width="20.755"
      height="20.755"
      viewBox="0 0 16.755 16.755"
      {...props}
    >
      <circle
        id="Ellipse_194"
        data-name="Ellipse 194"
        cx="8.378"
        cy="8.378"
        r="8.378"
        transform="translate(0)"
        fill="#f4f5fa"
      />
      <g id="arrow_right_black_24dp" transform="translate(2.094 2.443)">
        <path id="Path_3677" data-name="Path 3677" d="M0,0H12.566V12.566H0Z" fill="none" />
        <path
          id="Path_3678"
          data-name="Path 3678"
          d="M9.348,6l-.738.738,2.4,2.4-2.4,2.4.738.738L12.49,9.142Z"
          transform="translate(-4.102 -2.858)"
          fill="#ff7500"
        />
      </g>
    </svg>
  );
}

export function ScrollToTop(props: SvgIconConstituentValues) {
  return (
    <svg
      id="Group_16828"
      data-name="Group 16828"
      xmlns="http://www.w3.org/2000/svg"
      width="20.755"
      height="20.755"
      viewBox="0 0 16.755 16.755"
      {...props}
    >
      <circle
        id="Ellipse_194"
        data-name="Ellipse 194"
        cx="8.378"
        cy="8.378"
        r="8.378"
        fill="#f4f5fa"
      />
      <g id="go_to_top_black_24dp" transform="translate(2.443 2.094)">
        <path id="Path_3683" data-name="Path 3683" d="M0,0H12.566V12.566H0Z" fill="none" />
        <path
          id="Path_3684"
          data-name="Path 3684"
          d="M4,8.189l.738.738L7.665,6.005v6.372H8.712V6.005l2.922,2.927.744-.744L8.189,4Z"
          transform="translate(-1.906 -1.906)"
          fill="#ff7500"
        />
      </g>
    </svg>
  );
}
