import { SvgIconConstituentValues } from "../svg";

export default function Star(props: SvgIconConstituentValues) {
  return (
    <img
      //   className={cls.star}
      width="28"
      height="28"
      src="/assets/images/star_black_24dp.png"
      alt=""
      {...props}
    />
  );
}
