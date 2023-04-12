import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { get, isEmpty } from "lodash";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Fragment, MouseEvent, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import Stars from "src/components/stars";
import NewCollectionIcon from "src/components/svgs/new_collection";
import { imageDummy } from "src/constants/app";
import { makeUrlObjectFromRouteBase, routeProductDetailBase } from "src/constants/routes";
import { notifyToast } from "src/constants/toast";
import { addProductToCart } from "src/feature/shopping-cart/slice";
import { SigninType } from "src/feature/signin/sign-in-slice";
import { truncateStr } from "src/utils";
import { ProductType, ProductsType } from "types/api-response-type";
import IconPlay from "../svgs/iconPlay";
import cls from "./products.module.css";
import classnames from "classnames";
import { useLocationBase } from "src/hooks";
import useLoggedIn from "src/hooks/useLoggedIn";
import { Tooltip } from "@material-ui/core";
import useGetScreenWidth from "../../hooks/useGetScreenWidth";

interface RefObject<T> {
  readonly current: T | null;
}

export function ProductsCarousel({ products }: { products: ProductsType }) {
  console.log(products);
  const [activeSlide, setActiveSlide] = useState(0);
  const refSlider = useRef() as RefObject<Slider>;
  const { symbol, locationBase } = useLocationBase();
  const { isLoggedIn } = useLoggedIn();
  const router = useRouter();
  const signinState = useSelector((state: { signin: SigninType }) => state.signin);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const screen = useGetScreenWidth();
  const slideSettings = useMemo(
    () => ({
      dots: false,
      autoplay: false,
      infinite: false,
      speed: 1000,
      arrows: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 1250,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 360,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    }),
    [],
  );



  if (isEmpty(products)) {
    return null;
  }

  const getStars = (rating: number) => {
    return Math.round(rating * 2) / 2;
  };

  const handleRedirect = (id: string) => () => {
    router.push(makeUrlObjectFromRouteBase(routeProductDetailBase, { id, locationBase }));
  };

  const handleClickLeft = () => {
    refSlider.current?.slickPrev();
  };

  const handleClickRight = () => {
    refSlider.current?.slickNext();
  };



  const handleAddToCart = (product: ProductType) => () => {
    const callBack = (message: string, typeMessage: string) => notifyToast(typeMessage, message, t);
    dispatch(addProductToCart({ qty: 1, product, callBack, isLoggedIn }));
  };

  console.log(activeSlide);
  return (
    <div
      className={`${
        products.length > (screen === "Desktop" ? 4 : 2) ? "product-banner" : "product-banner4"
      } relative`}
    >
      <Slider
        {...slideSettings}
        className={classnames(cls.products)}
        ref={refSlider}
        beforeChange={(_, next) => {
          setActiveSlide(next);
        }}
      >
        {products.slice(0, 10).map((product) => {

          const { isNewProduct } = product;

          return (
            <div className={`${cls.product} relative`} key={product._id}>
              <div className={cls.title}>

                <Image
                  className={classnames(
                    cls.image_product,
                    product.mediaUrl ? cls.image_White : cls.image_LightGray,
                  )}
                  width={"270"}
                  height={"270"}
                  src={product.mediaUrl || imageDummy}
                  alt=""
                  onClick={handleRedirect(product._id)}
                />

              </div>
              {isNewProduct && <NewCollectionIcon className="absolute -top-1 left-4 h-9 w-8" />}
              <div className={cls.main}>
                <div className={cls.nameStar}>
                  <div className={cls.title} onClick={handleRedirect(product._id)}>
                    {truncateStr(product.productName, 49)}
                  </div>
                  <div className="inline-flex items-center">
                    {/* @ts-ignore */}
                    <Stars numberOfStars={getStars(product.rating)} />

                  </div>
                  <div className={cls.spacer2}></div>
                </div>

                <div className={`${cls.price_line} flex justify-between sm:justify-center`}>
                  <div className="w-auto sm:w-1/2 float-left flex flex-col sm:flex-row">
                    <div className={cls.member_price}>
                      {symbol}
                      {product.price?.toLocaleString()}
                    </div>

                  </div>

                  <div className="w-auto sm:w-1/2 float-left relative flex flex-col  sm:flex-row-reverse items-center self-start">
                    <img
                      className={cls.icon_cart}
                      src="/assets/images/add_shopping_cart_black_24dp.png"
                      alt=""
                      onClick={handleAddToCart(product)}
                    />

                    {/* <div className={cls.spacer}></div> */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      {activeSlide > 0 && (
        <div className="h-1/3 items-center absolute left-0 top-1/3 hidden sm:flex">
          <div className={`${cls.arrowBg} py-3`}>
            <ChevronLeftIcon className="text-5xl cursor-pointer" onClick={handleClickLeft} />
          </div>
        </div>
      )}

      <div
        className={`hidden sm:${
          activeSlide + 4 < products.length ? "block" : "hidden"
        } h-1/3 flex items-center absolute right-0 top-1/3`}
      >
        <div className={`${cls.arrowBg} py-3`}>
          <ChevronRightIcon className="text-5xl cursor-pointer" onClick={handleClickRight} />
        </div>
      </div>
    </div>
  );
}
