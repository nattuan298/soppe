/* eslint-disable @typescript-eslint/no-explicit-any */
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Cookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { ButtonMui, ModalConfirm } from "src/components";
import { apiRoute } from "src/constants/apiRoutes";
import { API_KEY_PAYMENT, KBANK_BASE_URL, MID_PAYMENT } from "src/constants/app";
import { browserConfig } from "src/constants/browser-config";
import { makeUrlObjectFromRouteBase, routeCheckoutSuccessBase } from "src/constants/routes";
import { notifyToast } from "src/constants/toast";
import {
  actionGetDataFromLocalStore,
  clickNext,
  resetShippingFees,
} from "src/feature/checkout/slice";
import { fetchPostStatusQRFeature } from "src/feature/checkQRFeature/qr-feature.action";
import { handleChangeField } from "src/feature/checkout/thunkAction";
import {
  fetchCheckoutCreateDraftOrder,
  fetchCheckoutUpdateOrder,
  fetchCheckoutgetShippingFees,
  fetchPostPaymentCheckout,
} from "src/feature/checkout/action";
import { useLocationBase } from "src/hooks";
import axios from "src/lib/client/request";
import { RootState } from "src/state/store";
import ModalOrderSummary from "../shopping-cart/modal";
import ModalOrderFull from "./modal-order-full";
import useGetScreenWidth from "../../hooks/useGetScreenWidth";
import { deleteMultyProduct } from "../../feature/shopping-cart/slice";

const getDataLocalStorage = () => {
  const newState = localStorage.getItem("stateCheckout");
  if (newState) {
    // localStorage.removeItem("stateCheckout");
    return JSON.parse(newState);
  }
};

let newWindow: Window | null = null;

export default function Checkout() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    mainStep,
    address,
    billingAddress,
    callingListProduct,
    branch,
    shippingType,
    callingAPI,
    totalPV,
    totalQty,
    totalPrice,
    shippingFee,
    checkoutProducts,
    paymentMethod,
    coupon,
    couponRedeemAmount,
    discountCategory,
    couponDraft,
    orderNumber,
    realAddress,
    isOpenModalTopay,
  } = useSelector((state: RootState) => state.checkout);
  const {
    listProducts,
  } = useSelector((state: RootState) => state.cart);
  const stateCheckout = useSelector((state: RootState) => state.checkout);
  const { tax } = useLocationBase();
  const { scmPoint } = useSelector((state: RootState) => state.user);
  const productCheckout = checkoutProducts.map((item) => {
    return {
      productId: item._id,
      quantity: item.qty,
    };
  });
  const addressCheckout = realAddress.find((item) => item._id === address);

  const router = useRouter();
  const {
    token,
    totalPrice: totalPriceParam,
    paymentMethod: paymentMethodParam,
    orderIdForQR,
    chargeId,
  } = router.query;
  const [loading, setLoading] = useState(false);
  const [insufficient, setInsufficient] = useState(false);
  const [modalPaymentShow, setModalPaymentShow] = useState(false);
  const [isOpenPopupOTP, setisOpenPopupOTP] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const refButtonRedirect = useRef<HTMLButtonElement>(null);
  const { userInfor } = useSelector((state: RootState) => state.user);
  const screen = useGetScreenWidth();
  // enable/disable when change paymentMethod
  useEffect(() => {
    if (paymentMethod === "SCM Point") {
      if (totalPrice + shippingFee - couponRedeemAmount > scmPoint) {
        setInsufficient(true);
      } else {
        setInsufficient(false);
      }
    } else {
      setInsufficient(false);
    }
  }, [paymentMethod, totalPrice, shippingFee, scmPoint, couponRedeemAmount]);

  useEffect(() => {
    const data = getDataLocalStorage();
    const isPaymentCheckout = localStorage.getItem("isPaymentCheckout");
    if (data) {
      dispatch(actionGetDataFromLocalStore(data));
    }

    if (token && typeof token === "string") {
      const callbackError = (message: string) => {
        notifyToast("error", message);
        setLoading(false);
      };
      dispatch(fetchPostPaymentCheckout({ token, data, callbackError }));
    }

    if (isPaymentCheckout && typeof isPaymentCheckout === "string") {
      localStorage.removeItem("isPaymentCheckout");
      const timeout = setTimeout(() => {
        ref.current?.click();
        setModalPaymentShow(true);
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [token, dispatch, ref, t]);

  const handleClick = async () => {
    // if (mainStep === 1 && shippingType === "Ship to address") {
    //   return await dispatch(fetchCheckoutgetShippingFees());
    // }


    dispatch(clickNext());
  };

  const handelSuccess =
    (id: string) => {
      router.push(
        makeUrlObjectFromRouteBase(routeCheckoutSuccessBase, {
          orderId: id,
        }),
      );
      notifyToast("default", "Order successfully", t);
    };

  const disabledAddress = useMemo(() => {
    if (mainStep === 1) {
      if (shippingType === "Ship to address") {
        return !address || !billingAddress;
      }

      return !branch.id;
    }

    return false;
  }, [mainStep, branch, address, billingAddress, shippingType]);

  const disabledStep1 = useMemo(() => {
    return mainStep === 0 && (callingListProduct || listProducts.length === 0);
  }, [mainStep, callingListProduct, listProducts]);

  const disabled = disabledAddress || disabledStep1 || callingAPI;

  const onClickPayment = async () => {
    try {
      const bodyCheckout = {
        products: productCheckout,
        shippingAddress: {
          firstName: addressCheckout?.firstName,
          lastName: addressCheckout?.lastName,
          phoneNumber: addressCheckout?.phoneNumber,
          address: `${addressCheckout?.addressDetail},${addressCheckout?.subDistrict},${addressCheckout?.district},${addressCheckout?.province}`,
        },
      };
      const response = await axios.post("/orders", bodyCheckout);
      if (response.status === 201) {
        localStorage.removeItem(
          "listProducts");
        dispatch(deleteMultyProduct(listProducts.map((item) => item._id)));
        handelSuccess(response.data._id);
      }
    } catch (e: any) {
    }
  };



  useEffect(() => {
    setLoading(!!token);
  }, [token]);

  // open otp popup
  useEffect(() => {
    if (stateCheckout.chargeId) {
      if (stateCheckout.redirect_url) {
        refButtonRedirect.current?.click();
      }

      const interval = setInterval(() => {
        if (newWindow) {
          if (newWindow.closed) {
            setisOpenPopupOTP(false);
            newWindow = null;
            clearInterval(interval);
            const callApi = async () => {
              try {
                setLoading(true);
                const res = await axios.get(
                  `${apiRoute.payment.statePayment}?orderId=${stateCheckout.orderId}&chargeId=${stateCheckout.chargeId}&refType=sale`,
                );

                if (res.data.paymentState === "Failed") {
                  notifyToast("error", "common:can_not_process_payment", t);
                  axios.put(`${apiRoute.orders.listOrders}/${stateCheckout.orderId}/remove-coupon`);
                  dispatch(handleChangeField({ redirect_url: "", chargeId: "" }));
                  dispatch(handleChangeField({ coupon: "" }));
                  dispatch(handleChangeField({ couponDraft: "" }));
                  dispatch(handleChangeField({ couponRedeemAmount: 0 }));
                  dispatch(handleChangeField({ discountCategory: "" }));
                  setLoading(false);
                }
              } catch (e) {}

              setLoading(false);
            };

            callApi();
          }
        }
      }, 2000);

      return () => {
        interval && clearInterval(interval);
      };
    }
  }, [stateCheckout.redirect_url, dispatch, stateCheckout.orderId, stateCheckout.chargeId, t]);

  // update order when payment qr success


  // update order with payment card


  // add orderIdForQR in state
  useEffect(() => {
    if (orderIdForQR && typeof orderIdForQR === "string") {
      dispatch(handleChangeField({ orderIdForQR }));
    }
  }, [orderIdForQR, dispatch]);

  //  add orderIdForQR in local storage
  useEffect(() => {
    if (orderIdForQR && typeof orderIdForQR === "string") {
      localStorage.setItem("stateCheckout", JSON.stringify({ ...stateCheckout, orderIdForQR }));
    }
  }, [orderIdForQR, dispatch, stateCheckout]);


  const totalProductPrice = (totalPrice / (1 + tax)).toFixed(2);
  const taxes = (((totalPrice + shippingFee) / (1 + tax)) * tax).toFixed(2);
  const disabledButtonStep2 = Boolean(
    loading || insufficient || (couponDraft && !coupon) || callingAPI,
  );
  const moreParams = useMemo(() => {
    if (paymentMethodParam === "qr") {
      return {};
    }

    return {
      "data-mid": MID_PAYMENT,
    };
  }, [paymentMethodParam]);

  // cancel order when close tab
  useEffect(() => {
    const a: EventListener = () => {
      if (modalPaymentShow && orderIdForQR) {
        localStorage.setItem("orderIdNeedClean", stateCheckout.orderId);
      }
    };

    window.onbeforeunload = a;
  }, [modalPaymentShow, orderIdForQR, stateCheckout.orderId]);

  // cancel order when close tab
  useEffect(() => {
    const orderIdNeedClean = localStorage.getItem("orderIdNeedClean");
    if (orderIdNeedClean) {
      localStorage.removeItem("orderIdNeedClean");
      if (!chargeId) {
        axios.put(`${apiRoute.orders.listOrders}/${orderIdNeedClean}/remove-coupon`);
      }
    }
  }, [chargeId]);

  const handleReloadPage = () => {
    router.push("/my-order");
  };

  return (
    <div>
      <ModalConfirm
        open={isOpenModalTopay}
        confirmType="unable-delete"
        message={t`common:this_order_id_no_longer_exists`}
        onConfirm={handleReloadPage}
      />
      {mainStep !== 2 && (
        <ButtonMui
          className="sm:mt-7 w-[153px] sm:w-full float-right sm:float-none"
          textClassName="font-normal"
          height={screen === "Desktop" ? 45 : 40}
          onClick={handleClick}
          disabled={disabled}
          showCircle={callingAPI}
        >
          {t`common:next`}
        </ButtonMui>
      )}

      {mainStep === 2 && (
        <ButtonMui
          className="w-[153px] sm:w-full float-right sm:float-none"
          height={screen === "Desktop" ? 50 : 40}
          disabled={disabledButtonStep2}
          showCircle={callingAPI || loading}
          onClick={onClickPayment}
        >{t`common:make_payment`}</ButtonMui>
      )}

      <div className="absolute hidden sm:block right-0 -top-20 h-screen">
        {mainStep !== 2 && (
          <ModalOrderSummary
            buttonTitle={t`common:next`}
            totalPV={totalPV}
            totalQty={totalQty}
            totalPrice={totalPrice}
            disabledButton={disabled}
            onClickPayment={handleClick}
            showCircleButton={callingAPI}
          />
        )}
        {mainStep === 2 && (
          <ModalOrderFull
            totalPV={totalPV}
            totalProductPrice={totalProductPrice}
            shippingFee={(shippingFee / (1 + tax)).toFixed(2)}
            totalShippingFee={shippingFee.toFixed(2)}
            taxes={taxes}
            totalPrice={totalPrice + shippingFee - couponRedeemAmount}
            onClickPayment={onClickPayment}
            disabledButton={disabledButtonStep2}
            hiddenShippingFee={shippingType === "Pickup"}
            coupon={coupon}
            couponRedeemAmount={couponRedeemAmount}
            discountCategory={discountCategory}
            showCircleButton={callingAPI || loading}
          />
        )}
      </div>



    </div>
  );
}
