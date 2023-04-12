import { get, isEmpty } from "lodash";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Fragment, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";

// import { useCookies } from "react-cookie";
import Stars from "src/components/stars";
import NewCollectionIcon from "src/components/svgs/new_collection";
import { imageDummy } from "src/constants/app";
import { makeUrlObjectFromRouteBase, routeProductDetailBase } from "src/constants/routes";
import { notifyToast } from "src/constants/toast";
import { addProductToCart } from "src/feature/shopping-cart/slice";
import { SigninType } from "src/feature/signin/sign-in-slice";
import { truncateStr } from "src/utils";
import { ProductType, ProductsType } from "types/api-response-type";
import { FavoriteIcon } from "../svgs";
import cls from "./products.module.css";
import IconPlay from "../svgs/iconPlay";
import { useLocationBase } from "src/hooks";
import useLoggedIn from "src/hooks/useLoggedIn";
import { Tooltip } from "@material-ui/core";

export function Products({
  products,
  type,
  favorite,
  deleteProduct,
}: {
  products: ProductsType;
  type?: string;
  favorite?: string;
  deleteProduct?: (value: string | undefined) => void;
}) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const signinState = useSelector((state: { signin: SigninType }) => state.signin);
  const dispatch = useDispatch();
  const { symbol, locationBase } = useLocationBase();
  const { isLoggedIn } = useLoggedIn();
  console.log(products);
  const STYLE_MAIN_ITEM =
    "min-h-[100px] sm:min-h-[100px] sm:min-h-[125px] px-[5px] sm:px-[5px] sm:px-[16px] flex flex-col";
  const STYLE_MAIN = "min-w-[145px] px-[6px] sm:px-[16px] pb-[4.97px] sm:pb-[0px] flex flex-col";
  const STYLE_DESKTOP_PRODUCT_ITEM =
    "w-[165px] md:w-[210px] min-h-[268px] md:min-h-[335px] rounded-[10px]";
  const STYLE_DESKTOP_PRODUCT =
    "m-h-[268px] sm:m-h-[410px] sm:mt-[-10px] w-auto sm:w-[270px] rounded-[10px]";

  const accessToken = useMemo(() => {
    return get(signinState, "payload.data.accessToken");
  }, [signinState]);

  if (isEmpty(products)) {
    return null;
  }

  const getStars = (rating: number) => {
    return Math.round(rating * 2) / 2;
  };

  const handleRedirect = (id?: string) => () => {
    id && router.push(makeUrlObjectFromRouteBase(routeProductDetailBase, { id }));
  };


  const handleAddToCart = (product: ProductType) => () => {
    const callBack = (message: string, typeMessage: string) => notifyToast(typeMessage, message, t);
    dispatch(addProductToCart({ qty: 1, product, callBack, isLoggedIn }));
  };

  const handleFavorite = (id: string | undefined) => () => {
    if (deleteProduct) {
      deleteProduct(id);
    }
  };
  // const hasOnlyVideo = (product: ProductType) => {
  //   const { media } = product;
  //   return !media.find(({ fileType }) => fileType !== "VIDEO") && media.length >= 1;
  // };

  return (
    <div
      className={
        type === "listing"
          ? "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-[30px] lg:gap-[45px] mb-10 "
          : cls.products
      }
    >
      {products.map((product) => {
        const { isNewProduct } = product;
        return (
          <div
            className={`${cls.newProduct} ${
              type === "listing" ? STYLE_DESKTOP_PRODUCT_ITEM : STYLE_DESKTOP_PRODUCT
            }`}
            key={product._id}
          >
            <div className={cls.title}>
              {/* {false ? (
                <Fragment>
                  <video
                    src={
                      get(product, "media[0].urlPreSign")
                        ? `${get(product, "media[0].urlPreSign")}#t=0.001`
                        : imageDummy
                    }
                    controls={false}
                    className={classnames(
                      cls.image_product,
                      `${type === "listing" ? "w-[165px] sm:w-[210px]" : "w-[270px]"} ${
                        type === "listing" ? "h-[165px] sm:h-[210px]" : "h-[270px]"
                      } object-fill`,
                    )}
                    onClick={handleRedirect(product.productCode)}
                    playsInline
                  />
                  <IconPlay
                    className={`absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 ${
                      type === "listing" ? "w-15 h-15" : "w-[90px] h-[90px]"
                    }`}
                  />
                </Fragment>
              ) : ( */}
              <Image
                className={classnames(
                  cls.image_product,
                  cls.image_White,
                )}
                width={type === "listing" ? 210 : 270}
                height={type === "listing" ? 210 : 270}
                src={product.mediaUrl || imageDummy}
                alt="image product"
                onClick={handleRedirect(favorite ? product?.productId : product?._id)}
              />
              {/* )} */}

              {favorite ? (
                <div className={cls.favorite} onClick={handleFavorite(product._id)}>
                  <FavoriteIcon />
                </div>
              ) : null}
              {isNewProduct && <NewCollectionIcon className="absolute -top-1 left-4 h-9 w-8" />}
            </div>

            <div className={type === "listing" ? STYLE_MAIN_ITEM : STYLE_MAIN}>
              <div className={cls.nameStar}>
                <div
                  className={classnames(
                    cls.title,
                    type === "listing" ? cls.titleListing : cls.titleHome,
                  )}
                  onClick={handleRedirect(favorite ? product?.productId : product?._id)}
                >
                  {truncateStr(product.productName, 49)}
                </div>
                <div className="flex items-center">
                  <Stars numberOfStars={getStars(product.rating)} />

                </div>
                <div className={cls.spacer2}></div>
              </div>

              <div className={`${cls.price_line} flex justify-between sm:justify-center mb-3`}>
                <div className="w-auto sm:w-1/2 float-left">
                  <div
                    className={classnames(
                      cls.member_price,
                      type === "listing" ? cls.member_Listing : cls.member_priceHome,
                    )}
                  >
                    {product.price?.toLocaleString()}
                    {symbol}

                  </div>
                  {accessToken && (
                    <div
                      className={classnames(
                        cls.personal_price,
                        type === "listing" ? cls.personal_priceOther : cls.personal_priceHome,
                      )}
                    >
                      {/* {symbol} */}
                      {/* {product.personalPrice.toLocaleString()} */}
                    </div>
                  )}
                </div>

                <div className="w-auto sm:w-1/2 float-left relative flex flex-col sm:flex-row-reverse sm:items-center items-end sm:self-start sm:mb-0 mb-[5px]">
                  <img
                    className={classnames(
                      cls.icon_cart,
                      type === "listing" ? cls.icon_cartList : cls.icon_cartHome,
                    )}
                    src="/assets/images/add_shopping_cart_black_24dp.png"
                    alt=""
                    onClick={handleAddToCart(product)}
                  />

                  <div className={cls.spacer}></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
