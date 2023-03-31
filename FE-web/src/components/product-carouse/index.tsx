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

  const accessToken = useMemo(() => {
    return get(signinState, "payload.data.accessToken");
  }, [signinState]);

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

  const clickProductVideo = (e: MouseEvent<HTMLElement>, productCode: string) => {
    e.stopPropagation();
    handleRedirect(productCode)();
  };

  const imagePropperty = (product: ProductType) => {
    if (product?.media && product?.media.length > 1 && product?.media[0].fileType === "VIDEO") {
      return "media[1].urlPreSign";
    }
    return "media[0].urlPreSign";
  };

  const handleAddToCart = (product: ProductType) => () => {
    const callBack = (message: string, typeMessage: string) => notifyToast(typeMessage, message, t);
    dispatch(addProductToCart({ qty: 1, product, callBack, isLoggedIn }));
  };

  const hasOnlyVideo = (product: ProductType) => {
    const { media } = product;
    return !media.find(({ fileType }) => fileType !== "VIDEO") && media.length >= 1;
  };

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
          const imageurl = imagePropperty(product);
          const onlyVideo = hasOnlyVideo(product);
          const { isNewProduct } = product;
          const image = get(product, imageurl);

          return (
            <div className={`${cls.product} relative`} key={product.productCode}>
              <div className={cls.title}>
                {onlyVideo ? (
                  <Fragment>
                    <div onClick={(e) => clickProductVideo(e, product.productCode)}>
                      <video
                        src={get(product, "media[0].urlPreSign") || imageDummy}
                        controls={false}
                        className={classnames(
                          cls.image_product,
                          "w-[150px] sm:w-[270px] h-[150px] sm:h-[270px]",
                        )}
                        style={{
                          objectFit: "fill",
                          marginBottom: "7px",
                        }}
                        playsInline
                      />
                      <IconPlay
                        className="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4"
                        width={"90px"}
                        height={"90px"}
                      />
                    </div>
                  </Fragment>
                ) : (
                  <Image
                    className={classnames(
                      cls.image_product,
                      image ? cls.image_White : cls.image_LightGray,
                    )}
                    width={"270"}
                    height={"270"}
                    src={image || imageDummy}
                    alt=""
                    onClick={handleRedirect(product.productCode)}
                  />
                )}
              </div>
              {isNewProduct && <NewCollectionIcon className="absolute -top-1 left-4 h-9 w-8" />}
              <div className={cls.main}>
                <div className={cls.nameStar}>
                  <div className={cls.title} onClick={handleRedirect(product.productCode)}>
                    {truncateStr(product.productName, 49)}
                  </div>
                  <div className="inline-flex items-center">
                    {/* @ts-ignore */}
                    <Stars numberOfStars={getStars(product.rating)} />
                    <Tooltip title={product.productCode} placement="bottom-end">
                      <div className="max-w-[100px] text-brown text-[8px] sm:text-sm ml-2 text-overflow-ellipsis">
                        SKU: {product.productCode}
                      </div>
                    </Tooltip>
                  </div>
                  <div className={cls.spacer2}></div>
                </div>

                <div className={`${cls.price_line} flex justify-between sm:justify-center`}>
                  <div className="w-auto sm:w-1/2 float-left flex flex-col sm:flex-row">
                    <div className={cls.member_price}>
                      {symbol}
                      {product[accessToken ? "memberPrice" : "personalPrice"]?.toLocaleString()}
                    </div>
                    {accessToken && (
                      <div className={cls.personal_price}>
                        {symbol}
                        {product.personalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>

                  <div className="w-auto sm:w-1/2 float-left relative flex flex-col  sm:flex-row-reverse items-center self-start">
                    <img
                      className={cls.icon_cart}
                      src="/assets/images/add_shopping_cart_black_24dp.png"
                      alt=""
                      onClick={handleAddToCart(product)}
                    />
                    {accessToken && <div className={cls.pv}>{product.pv?.toLocaleString()} PV</div>}
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
