import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import cls from "./skeleton.module.css";

const useStyles = makeStyles({
  root: {
    "&.MuiSkeleton-root": {
      backgroundColor: "#F4F5FA",
    },
  },
});

export default function ProductSkeleton() {
  const classes = useStyles();

  return (
    <div className={cls.product}>
      <Skeleton
        animation="wave"
        width={270}
        height={270}
        variant="rect"
        className={classNames(cls.image_product, classes.root)}
      />
      <div className={cls.main}>
        <div className={cls.nameStar}>
          <Skeleton
            animation="wave"
            variant="rect"
            className={classNames(cls.title, classes.root)}
          />
          <Skeleton
            animation="wave"
            variant="rect"
            width={100}
            height={11}
            className={classNames(cls.stars, classes.root)}
          />
          <div className={cls.spacer2}></div>
        </div>
        <div className={`${cls.price_line}`}>
          {/* <div className="w-1/2 float-left">
            <Skeleton animation="wave" variant="rect" className={cls.member_price} />
            <Skeleton animation="wave" variant="rect" className={cls.personal_price} />
          </div>
          <div className="w-1/2 float-left flex items-center flex-row-reverse">
            <img
              className={cls.icon_cart}
              src="/assets/images/add_shopping_cart_black_24dp.png"
              alt=""
            />
            <Skeleton animation="wave" variant="rect" className={cls.pv} />
          </div> */}
          <div className="w-full">
            <Skeleton
              animation="wave"
              variant="rect"
              className={classNames(cls.price, classes.root)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
