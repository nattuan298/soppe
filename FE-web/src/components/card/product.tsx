// import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
// import { useCookies } from "react-cookie";
import Stars from "src/components/stars";
import Image from "src/components/image";
import { makeUrlObjectFromRouteBase, routeProductDetailBase } from "src/constants/routes";
import { ProductType } from "types/api-response-type";
import NewCollectionIcon from "../svgs/new_collection";
import NumberFormat from "../text/number-format";
import styles from "./product.module.css";
import useLoggedIn from "src/hooks/useLoggedIn";
import { useDispatch } from "react-redux";
import { addProductToCart } from "src/feature/shopping-cart/slice";
import { getThumbimageFromMedia } from "src/utils/product";
import { notifyToast } from "src/constants/toast";
import useTranslation from "next-translate/useTranslation";
import { useLocationBase } from "src/hooks";
import { Tooltip } from "@material-ui/core";

export default function ProductCard({ productDetail }: { productDetail: ProductType }) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { isLoggedIn, priceFieldName } = useLoggedIn();
  const { symbol, locationBase } = useLocationBase();
  console.log(locationBase, "dsadsa");
  const handleRedirect = () => {
    router.push(
      makeUrlObjectFromRouteBase(routeProductDetailBase, {
        id: productDetail._id,
      }),
    );
  };

  const handleAddToCart = () => {
    const callBack = (message: string, typeMessage: string) => notifyToast(typeMessage, message, t);
    dispatch(addProductToCart({ qty: 1, product: productDetail, callBack, isLoggedIn }));
  };

  return (
    <div className={styles.product_container}>
      <div className="relative">
        <Image
          src={productDetail.mediaUrl}
          className="cursor-pointer w-full"
          classNameImage={productDetail.mediaUrl ? "bg-white" : "bg-lighterGray"}
          onClick={handleRedirect}
          fileType={"IMAGE"}
          showIconVideo
          sizeIcon={{ width: "50", height: "50" }}
        />
        {productDetail.isNewProduct && (
          <NewCollectionIcon className="absolute -top-1 left-5 h-9 w-8" />
        )}
      </div>
      <div className="p-2 h-32">
        <div className="line-clamp-2 cursor-pointer" onClick={handleRedirect}>
          {productDetail.productName}
        </div>
        <div className="flex items-center">
          <Stars numberOfStars={productDetail.rating} />

        </div>
      </div>
      <div className="absolute bottom-0 p-2 pb-4 w-full">
        <div className="flex justify-between">
          <div className="flex items-center justify-between w-1/2 flex-wrap">
            <NumberFormat
              className="text-orange text-base mr-2"
              value={productDetail.price}
              prefix={symbol}
            />

          </div>
          <div className="flex w-1/2 flex-wrap flex-row-reverse">
            <img
              src="/assets/images/add_shopping_cart_black_24dp.png"
              alt=""
              className="cursor-pointer h-5"
              onClick={handleAddToCart}
            />

          </div>
        </div>
      </div>
    </div>
  );
}
