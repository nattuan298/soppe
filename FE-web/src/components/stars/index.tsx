import cls from "./style.module.css";

const StarFull = () => {
  return (
    <img
      className={cls.star}
      width="14"
      height="14"
      src="/assets/images/star_black_24dp.png"
      alt=""
    />
  );
};
const StarHalf = () => {
  return <img className={cls.star} src="/assets/images/star_half_black_24dp.png" alt="" />;
};
const StarEmpty = () => {
  return <img className={cls.star} src="/assets/images/star_outline_black_24dp.png" alt="" />;
};

const Stars = ({ numberOfStars }: { numberOfStars: number }) => {
  switch (Math.round(numberOfStars * 2) / 2) {
    case 0:
      return (
        <>
          <StarEmpty />
          <StarEmpty />
          <StarEmpty />
          <StarEmpty />
          <StarEmpty />
        </>
      );

    case 0.5:
      return (
        <>
          <StarHalf />
          <StarEmpty />
          <StarEmpty />
          <StarEmpty />
          <StarEmpty />
        </>
      );

    case 1:
      return (
        <>
          <StarFull />
          <StarEmpty />
          <StarEmpty />
          <StarEmpty />
          <StarEmpty />
        </>
      );

    case 1.5:
      return (
        <>
          <StarFull />
          <StarHalf />
          <StarEmpty />
          <StarEmpty />
          <StarEmpty />
        </>
      );

    case 2:
      return (
        <>
          <StarFull />
          <StarFull />
          <StarEmpty />
          <StarEmpty />
          <StarEmpty />
        </>
      );

    case 2.5:
      return (
        <>
          <StarFull />
          <StarFull />
          <StarHalf />
          <StarEmpty />
          <StarEmpty />
        </>
      );

    case 3:
      return (
        <>
          <StarFull />
          <StarFull />
          <StarFull />
          <StarEmpty />
          <StarEmpty />
        </>
      );

    case 3.5:
      return (
        <>
          <StarFull />
          <StarFull />
          <StarFull />
          <StarHalf />
          <StarEmpty />
        </>
      );

    case 4:
      return (
        <>
          <StarFull />
          <StarFull />
          <StarFull />
          <StarFull />
          <StarEmpty />
        </>
      );

    case 4.5:
      return (
        <>
          <StarFull />
          <StarFull />
          <StarFull />
          <StarFull />
          <StarHalf />
        </>
      );

    case 5:
      return (
        <>
          <StarFull />
          <StarFull />
          <StarFull />
          <StarFull />
          <StarFull />
        </>
      );

    default:
      return (
        <>
          <StarFull />
          <StarFull />
          <StarFull />
          <StarFull />
          <StarFull />
        </>
      );
  }
};

export default Stars;
