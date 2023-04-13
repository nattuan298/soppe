/* eslint-disable indent */
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ProductCard from "src/components/card/product";
import DialogCustome from "src/components/dialog";
import OrderProductDetail from "src/components/modal/order-product-detail";
import Stars from "src/components/stars";
import ShareIcon from "src/components/svgs/share";
import DescriptionTruncate from "src/components/text/description-truncate";
import Link from "src/components/text/link";
import NumberFormat from "src/components/text/number-format";
import { apiRoute } from "src/constants/apiRoutes";
import {
  makeUrlObjectFromRouteBase,
  routeCheckoutUrl,
  routeFavoriteProductUrl,
  routeProductsListing,
  routeReviewProductBase,
  routeSigninUrl,
} from "src/constants/routes";
import { notifyToast } from "src/constants/toast";
import { fetchCheckoutCreateOrder } from "src/feature/checkout/action";
import { addProductToCart } from "src/feature/shopping-cart/slice";
import { useLocationBase } from "src/hooks";
import useLoggedIn from "src/hooks/useLoggedIn";
import axios from "src/lib/client/request";
import { getThumbimageFromMedia } from "src/utils/product";
import { ProductType } from "types/api-response-type";
import ImagesSlider from "./images_slider";
import Review from "./Review";
import { getLocationBase } from "src/lib/getLocationsBase";
import { Tooltip } from "@material-ui/core";
import { ButtonMui, ProductsCarousel } from "../../components";
import useGetScreenWidth from "../../hooks/useGetScreenWidth";

interface ProductDetailType {
  productDetail: ProductType;
  relatedProducts: ProductType[];
  setProduct: Dispatch<SetStateAction<ProductType>>;
}

export default function ProductDetail({
  productDetail,
  relatedProducts,
  setProduct,
}: ProductDetailType) {
  const { t, lang } = useTranslation("common");
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn, priceFieldName } = useLoggedIn();
  const [openModalSignIn, setopenModalSignIn] = useState(false);
  const [callingAPI, setcallingAPI] = useState(false);
  const [listFavouriteProduct, setlistFavouriteProduct] = useState([]);
  const [errAddFavouriteProduct, seterrAddFavouriteProduct] = useState(false);
  const { symbol } = useLocationBase();
  const screen = useGetScreenWidth();
  useEffect(() => {
    const callApi = async () => {
      const locationBase = getLocationBase();
      const response = await axios.get(
        `${apiRoute.favoriteProduct.getFavorites}?countryCode=${locationBase}`,
      );
      setlistFavouriteProduct(response.data.data);
    };

    if (isLoggedIn) {
      callApi();
    }
  }, [productDetail, isLoggedIn]);

  const realRelatedProducts = relatedProducts.filter(
    (item) => item._id !== productDetail._id,
  );

  const handleAddToCart = (product: ProductType, qty: number = 1) => {
    const callBack = (message: string, typeMessage: string) => notifyToast(typeMessage, message, t);
    dispatch(addProductToCart({ qty, product, callBack, isLoggedIn }));
  };

  const handleCloseModal = () => {
    setopenModalSignIn(false);
  };

  const handleConfirmModal = () => {
    handleCloseModal();
    router.push(routeSigninUrl);
  };

  const handleBuyNow = async (qty: number) => {
    if (!isLoggedIn) {
      return setopenModalSignIn(true);
    }
    setcallingAPI(true);
    const callbackCreateOrder = (res: {
      error?: { message?: string };
      payload?: string;
      type?: string;
    }) => {
      if (res.type === "checkout/createOrder/fulfilled") {
        return router.push(routeCheckoutUrl);
      }

      if (res.error && res.payload) {
        notifyToast("error", res.payload);
      }
      setcallingAPI(false);
    };
    // dispatch(
    //   fetchCheckoutCreateOrder({
    //     checkoutProduct: [
    //       {
    //         ...productDetail,
    //         qty,
    //         description: "",
    //         media: productDetail.mediaUrl,
    //       },
    //     ],
    //     callback: callbackCreateOrder,
    //   }),
    // );

    // const res = (await dispatch(
    //   createOrder([
    //     {
    //       ...productDetail,
    //       qty,
    //       description: {
    //         en: "",
    //         th: "",
    //       },
    //       media: [getThumbimageFromMedia(productDetail.media)],
    //     },
    //   ]),
    // )) as {
    //   error?: { message?: string };
    //   payload?: string;
    //   type?: string;
    // };

    // if (res.type === "checkout/createOrder/fulfilled") {
    //   return router.push(routeCheckoutUrl);
    // }

    // if (res.error && res.payload) {
    //   notifyToast("error", res.payload);
    // }
    // setcallingAPI(false);
  };

  const addToFavourite = async () => {
    if (listFavouriteProduct.length >= 30) {
      return seterrAddFavouriteProduct(true);
    }
    const res = await axios.post(`${apiRoute.favoriteProduct.getFavorites}`, {
      productId: productDetail._id,
    });
    setProduct((preState) => ({ ...preState, isFavorite: true, favouriteId: res.data._id }));
  };

  const removeFavourite = async () => {
    await axios.delete(`${apiRoute.favoriteProduct.getFavorites}/${productDetail._id}`);
    setProduct((preState) => ({ ...preState, isFavorite: false }));
  };

  const handleClickSeeAll = () => {
    router.push(
      makeUrlObjectFromRouteBase(routeProductsListing, { category: productDetail.categoryId }),
    );
  };

  const handleCloseModalError = () => {
    seterrAddFavouriteProduct(false);
  };

  const handleConfirmModalError = () => {
    router.push(routeFavoriteProductUrl);
  };

  const handleClickShare = () => {
    navigator.clipboard.writeText(window.location.href);
    notifyToast("default", "copy_success", t);
  };
console.log(productDetail);
  return (
    <div className="mx-auto w-auto sm:w-1216 relative mb-8">
      <div className="sm:flex sm:mt-8">
        <div className="flex-grow sm:pr-8">
          <div className="grid grid-cols-7 gap-4">
            <div className="col-span-7 sm:col-span-3">
              <ImagesSlider
                isNewProduct={productDetail.isNewProduct}
                images={[productDetail.mediaUrl]}
                isFavourite={productDetail.isFavorite}
                addToFavorite={addToFavourite}
                removeFavorite={removeFavourite}
                handleShare={handleClickShare}
              />
            </div>
            <div className="col-span-7 sm:col-span-4 mx-4 sm:mx-0">
              <p className="font-medium text-lg">{productDetail.productName}</p>
              <div className="mt-2 flex items-center">
                <Stars numberOfStars={productDetail.rating} />
                {isLoggedIn && !productDetail.isFavorite && (
                  <span>
                    <FavoriteBorderIcon
                      className="ml-4 mr-4 cursor-pointer text-orange w-4.5 hidden sm:block"
                      onClick={addToFavourite}
                    />
                  </span>
                )}
                {isLoggedIn && productDetail.isFavorite && (
                  <span>
                    <FavoriteIcon
                      className="ml-4 mr-4 cursor-pointer text-orange w-4.5 hidden sm:block"
                      onClick={removeFavourite}
                    />
                  </span>
                )}
                <div onClick={handleClickShare}>
                  <ShareIcon className="cursor-pointer hidden sm:block" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <NumberFormat
                    className="text-orange text-xl mr-2"
                    value={productDetail.price}
                    prefix={symbol}
                  />
                </div>
           {isLoggedIn && productDetail.isAbleToReview &&
                <ButtonMui className="w-3 "
                variant="outlined"
                height={36}
                onClick={() => router.push({ pathname: routeReviewProductBase,
                query: {
                  id: productDetail._id,
                  image: productDetail.mediaUrl,
                  name: productDetail.productName,
                },
                })}
                >
                        Review
                      </ButtonMui>}
              </div>

              <div className="mt-4 flex items-center justify-between mb-2">
                <span className="font-medium">{t`description`}</span>
           <div></div>
              </div>
              <DescriptionTruncate
                value={productDetail.description}
              />
            </div>
          </div>

          {/* Review */}
          <Review rating={productDetail.rating} productCode={productDetail._id} />

          {/* Related Product */}
          {relatedProducts.length > 1 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mx-4">
                <span className="text-black-dark text-base sm:text-lg font-medium">{t`related_products`}</span>
                <Link
                  className="text-[10px] sm:text-sm"
                  onClick={handleClickSeeAll}
                >{t`see_all`}</Link>
              </div>

              {screen === "Desktop" ? (
                <div className="grid grid-cols-4 gap-6">
                  {realRelatedProducts.slice(0, 4).map((item) => {
                    return (
                      <div className="col-span-1" key={item._id}>
                        <ProductCard productDetail={item} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <Fragment>
                  <ProductsCarousel products={realRelatedProducts} />
                </Fragment>
              )}
            </div>
          )}
        </div>

        <div>
          <OrderProductDetail
            productDetail={productDetail}
            handleAddToCart={handleAddToCart}
            handleBuyNow={handleBuyNow}
            disabled={callingAPI}
          />

          <DialogCustome
            open={openModalSignIn}
            handleClose={handleCloseModal}
            handleConfirm={handleConfirmModal}
          >
            <div className="text-center mb-8 mt-6 text-sm">{t`sign_in_to_use`}</div>
          </DialogCustome>
        </div>
      </div>
      <DialogCustome
        open={errAddFavouriteProduct}
        handleClose={handleCloseModalError}
        handleConfirm={handleConfirmModalError}
        buttonConfirmTite={t`ok`}
      >
        <div className="text-center mb-8 mt-6 text-sm">{t`maximum_number_favortite_product`}</div>
      </DialogCustome>
    </div>
  );
}
