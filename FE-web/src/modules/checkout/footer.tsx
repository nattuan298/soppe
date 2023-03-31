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
  const stateCheckout = useSelector((state: RootState) => state.checkout);
  const { tax } = useLocationBase();
  const { scmPoint } = useSelector((state: RootState) => state.user);

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
    if (mainStep === 1 && shippingType === "Ship to address") {
      return await dispatch(fetchCheckoutgetShippingFees());
    }

    if (mainStep === 1 && shippingType === "Pickup") {
      return await dispatch(resetShippingFees());
    }
    dispatch(clickNext());
  };

  const handelSuccess = useCallback(
    (notshowMessage?: boolean) => {
      router.push(
        makeUrlObjectFromRouteBase(routeCheckoutSuccessBase, {
          orderId: stateCheckout.orderId,
        }),
      );
      !notshowMessage && notifyToast("default", "common:payment_successfully", t);
    },
    [stateCheckout.orderId, router, t],
  );

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
    return mainStep === 0 && (callingListProduct || checkoutProducts.length === 0);
  }, [mainStep, callingListProduct, checkoutProducts]);

  const disabled = disabledAddress || disabledStep1 || callingAPI;

  const onClickPayment = async () => {
    try {
      await axios.get(`${apiRoute.orders.listOrders}/${stateCheckout.orderId}`);
    } catch (e: any) {
      if (e.response.data.statusCode === 404) {
        dispatch(handleChangeField({ isOpenModalTopay: true }));
        return;
      }
    }
    const finalPrice = totalPrice + shippingFee - couponRedeemAmount;
    if (paymentMethod === "SCM Point" || finalPrice === 0) {
      setLoading(true);
      const callbackUpdated = (res2: { error?: { message?: string }; payload?: string }) => {
        if (res2.error && res2.payload) {
          notifyToast("error", res2.payload);
          setLoading(false);
        }
        if (!res2.error) {
          handelSuccess();
        }
      };
      dispatch(fetchCheckoutUpdateOrder(callbackUpdated));
      // const res = (await dispatch(updateOrder())) as {
      //   error?: { message?: string };
      //   payload?: string;
      // };

      // if (res.error && res.payload) {
      //   notifyToast("error", res.payload);
      //   setLoading(false);
      //   axios.put(`${apiRoute.orders.listOrders}/${stateCheckout.orderId}/remove-coupon`);
      // }
      // if (!res.error) {
      //   handelSuccess();
      // }
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.delete("token");
    url.searchParams.delete("mid");
    url.searchParams.delete("paymentMethod");
    url.searchParams.delete("orderIdForQR");
    if (paymentMethod === "QR code") {
      const shippingAddress = realAddress.find((item) => item._id === address);

      try {
        setLoading(true);
        const res = await axios.post(`${apiRoute.payment.createOrderForQR}`, {
          amount: finalPrice,
          currency: "THB",
          description: "Checkout payment by QR code",
          source_type: "qr",
          reference_order: orderNumber,
          ref_1: "sale",
          ref_2: "sale",
          ref_3: "sale",
          provinceId:
            shippingType === "Ship to address" && shippingAddress ? shippingAddress.provinceId : "",
          type: shippingType,
          couponCode: coupon,
        });

        url.searchParams.set("orderIdForQR", res.data.id);
        url.searchParams.set("paymentMethod", "qr");
        setLoading(false);
      } catch (e: any) {
        dispatch(handleChangeField({ coupon: "" }));
        dispatch(handleChangeField({ couponDraft: "" }));
        dispatch(handleChangeField({ couponRedeemAmount: 0 }));
        dispatch(handleChangeField({ discountCategory: "" }));

        const message = e.response?.data?.message || "";
        const scmStatusErrorCode = e.response?.data?.scmStatusErrorCode || "";
        if (message) {
          notifyToast("error", message);
        }
        if (scmStatusErrorCode !== "SCM_PAYMENT_CONFLICT") {
          await axios.put(`${apiRoute.orders.listOrders}/${stateCheckout.orderId}/remove-coupon`);
        }

        setLoading(false);
        return;
      }
    }
    await dispatch(fetchCheckoutCreateDraftOrder());
    localStorage.setItem(
      "stateCheckout",
      JSON.stringify({ ...stateCheckout, redirect_url: "", chargeId: "" }),
    );
    localStorage.setItem("isPaymentCheckout", "true");
    url.searchParams.set("totalPrice", finalPrice.toString());
    window.location.href = url.href;
  };

  const onClickRealpayment = () => {
    localStorage.setItem("stateCheckout", JSON.stringify(stateCheckout));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const KPayment = (window as any).KPayment;
    if (KPayment) {
      // cancel order when click popup
      const cancelOrder = () => {
        const callApi = async () => {
          const res = await axios.get(
            `${apiRoute.payment.statePayment}?orderId=${stateCheckout.orderId}&orderPaymentId=${stateCheckout.orderIdForQR}&refType=sale`,
          );
          if (res.data.paymentState === "Failed") {
            const cookies = new Cookies();
            const tokenAuthen = cookies.get("token");
            fetch(
              `${browserConfig.apiBaseUrl}${apiRoute.orders.listOrders}/${stateCheckout.orderId}/remove-coupon`,
              {
                method: "PUT",
                keepalive: true,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${tokenAuthen}`,
                },
              },
            );
            dispatch(handleChangeField({ coupon: "" }));
            dispatch(handleChangeField({ couponDraft: "" }));
            dispatch(handleChangeField({ couponRedeemAmount: 0 }));
            dispatch(handleChangeField({ discountCategory: "" }));
          }

          if (res.data.paymentState === "Succeeded" && res.data.transactionState === "Authorized") {
            const callbackUpdated = (res2: { error?: { message?: string }; payload?: string }) => {
              if (res2.error && res2.payload) {
                notifyToast("error", res2.payload);
                setLoading(false);
              }
              if (!res2.error) {
                handelSuccess();
              }
            };
            dispatch(fetchCheckoutUpdateOrder(callbackUpdated));
            //   const res2 = (await dispatch(updateOrder())) as {
            //     error?: { message?: string };
            //     payload?: string;
            //   };
            //   if (res2.error && res2.payload) {
            //     notifyToast("error", res2.payload);
            //     setLoading(false);
            //   }
            //   if (!res2.error) {
            //     handelSuccess();
            //   }
          }
        };
        if (orderIdForQR) {
          callApi();
        }
        setModalPaymentShow(false);
      };
      KPayment.onClose(cancelOrder);
      KPayment.show();
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
  useEffect(() => {
    if (chargeId && stateCheckout.orderId && stateCheckout.orderIdForQR) {
      let count = 0;
      const callAPI = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            `${apiRoute.payment.statePayment}?orderId=${stateCheckout.orderId}&orderPaymentId=${stateCheckout.orderIdForQR}&refType=sale`,
          );
          count++;
          if (res.data.paymentState === "Succeeded" && res.data.transactionState === "Authorized") {
            interval && clearInterval(interval);
            const callbackUpdated = (res2: { error?: { message?: string }; payload?: string }) => {
              if (res2.error && res2.payload) {
                notifyToast("error", res2.payload);
                setLoading(false);
              }
              if (!res2.error) {
                handelSuccess();
              }
            };
            dispatch(fetchCheckoutUpdateOrder(callbackUpdated));
            // const res = (await dispatch(updateOrder())) as {
            //   error?: { message?: string };
            //   payload?: string;
            // };
            // if (res.error && res.payload) {
            //   notifyToast("error", res.payload);
            //   setLoading(false);
            // }
            // if (!res.error) {
            //   handelSuccess();
            // }
          }

          if (res.data.paymentState === "Failed") {
            interval && clearInterval(interval);
            notifyToast("error", "common:can_not_process_payment", t);
            setLoading(false);
            axios.put(`${apiRoute.orders.listOrders}/${stateCheckout.orderId}/remove-coupon`);
            dispatch(handleChangeField({ coupon: "" }));
            dispatch(handleChangeField({ couponDraft: "" }));
            dispatch(handleChangeField({ couponRedeemAmount: 0 }));
            dispatch(handleChangeField({ discountCategory: "" }));
          }
          if (count === 5 && res.data.paymentState === "Pending") {
            interval && clearInterval(interval);
            handelSuccess(true);
          }
        } catch (e) {}
      };
      setTimeout(() => {
        setLoading(true);
      }, 500);
      const interval = setInterval(() => {
        callAPI();
      }, 5000);
    }
  }, [chargeId, dispatch, t, stateCheckout.orderId, handelSuccess, stateCheckout.orderIdForQR]);

  // update order with payment card
  useEffect(() => {
    if (stateCheckout.orderId && stateCheckout.chargeId) {
      setLoading(true);
      if (stateCheckout.paymentStatusForNonSecure === "success") {
        // use for non secure
        // const callAPI = async () => {
        //   const res = (await dispatch(updateOrder())) as {
        //     error?: { message?: string };
        //     payload?: string;
        //   };

        //   if (res.error && res.payload) {
        //     notifyToast("error", res.payload);
        //     setLoading(false);
        //   }
        //   if (!res.error) {
        //     handelSuccess();
        //   }
        // };

        // callAPI();
        const callbackUpdated = (res2: { error?: { message?: string }; payload?: string }) => {
          if (res2.error && res2.payload) {
            notifyToast("error", res2.payload);
            setLoading(false);
          }
          if (!res2.error) {
            handelSuccess();
          }
        };
        dispatch(fetchCheckoutUpdateOrder(callbackUpdated));
      } else {
        // use for secure
        let count = 0;
        const callAPI = async () => {
          if (isOpenPopupOTP) {
            return;
          }
          const res = await axios.get(
            `${apiRoute.payment.statePayment}?orderId=${stateCheckout.orderId}&chargeId=${stateCheckout.chargeId}&refType=sale`,
          );
          count += 1;
          if (res.data.paymentState === "Succeeded" && res.data.transactionState === "Authorized") {
            clearInterval(interval);
            const callbackUpdated = (res2: { error?: { message?: string }; payload?: string }) => {
              if (res2.error && res2.payload) {
                notifyToast("error", res2.payload);
                setLoading(false);
              }
              if (!res2.error) {
                handelSuccess();
              }
            };
            dispatch(fetchCheckoutUpdateOrder(callbackUpdated));
            // const res = (await dispatch(updateOrder())) as {
            //   error?: { message?: string };
            //   payload?: string;
            // };

            // if (res.error && res.payload) {
            //   notifyToast("error", res.payload);
            //   setLoading(false);
            // }
            // if (!res.error) {
            //   handelSuccess();
            // }
          }

          if (res.data.paymentState === "Failed") {
            notifyToast("error", "common:can_not_process_payment", t);
            clearInterval(interval);
            setLoading(false);
            axios.put(`${apiRoute.orders.listOrders}/${stateCheckout.orderId}/remove-coupon`);
            dispatch(handleChangeField({ coupon: "" }));
            dispatch(handleChangeField({ couponDraft: "" }));
            dispatch(handleChangeField({ couponRedeemAmount: 0 }));
            dispatch(handleChangeField({ discountCategory: "" }));
          }
          if (count === 5 && res.data.paymentState === "Pending") {
            clearInterval(interval);
            handelSuccess(true);
          }
        };
        const interval = setInterval(() => {
          callAPI();
        }, 5000);

        if (!isOpenPopupOTP && !stateCheckout.redirect_url) {
          const callAPI2 = async () => {
            const res = await axios.get(
              `${apiRoute.payment.statePayment}?orderId=${stateCheckout.orderId}&chargeId=${stateCheckout.chargeId}&refType=sale`,
            );

            if (res.data.paymentState === "Failed") {
              axios.put(`${apiRoute.orders.listOrders}/${stateCheckout.orderId}/remove-coupon`);
              clearInterval(interval);
              setLoading(false);
              dispatch(handleChangeField({ coupon: "" }));
              dispatch(handleChangeField({ couponDraft: "" }));
              dispatch(handleChangeField({ couponRedeemAmount: 0 }));
              dispatch(handleChangeField({ discountCategory: "" }));
            }
          };
          callAPI2();
        }

        return () => {
          clearInterval(interval);
        };
      }
    }
  }, [
    stateCheckout.orderId,
    stateCheckout.chargeId,
    stateCheckout.paymentStatusForNonSecure,
    dispatch,
    t,
    handelSuccess,
    isOpenPopupOTP,
    stateCheckout.redirect_url,
  ]);

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

  useEffect(() => {
    if (userInfor?.memberId) {
      dispatch(fetchPostStatusQRFeature(userInfor?.memberId));
    }
  }, [dispatch, userInfor?.memberId]);

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

      <form style={{ display: mainStep === 2 ? "block" : "none" }}>
        <script
          type="text/javascript"
          src={`${KBANK_BASE_URL}/ui/v2/kpayment.min.js`}
          data-apikey={API_KEY_PAYMENT}
          data-amount={totalPriceParam || 0}
          data-currency="THB"
          data-payment-methods={paymentMethodParam === "qr" ? "qr" : "card"}
          data-name="Checkout payment"
          data-show-button="false"
          data-order-id={orderIdForQR}
          {...moreParams}
        ></script>

        <button type="button" ref={ref} style={{ display: "none" }} onClick={onClickRealpayment}>
          Real Button Payment
        </button>
      </form>

      <button
        className="hidden"
        ref={refButtonRedirect}
        onClick={() => {
          const redirect_url = stateCheckout.redirect_url;

          if (redirect_url) {
            setisOpenPopupOTP(true);
            newWindow = window.open(
              redirect_url,
              "_blank",
              "location=yes,height=600,width=1000,scrollbars=yes,status=yes,left=100,resizable=yes",
            );
            dispatch(handleChangeField({ redirect_url: "" }));
            if (!newWindow) {
              setisOpenPopupOTP(false);
              dispatch(handleChangeField({ redirect_url: "", chargeId: "" }));
              setLoading(false);
              notifyToast(
                "error",
                "Pop-up Blocker is enabled! Please add this site to your exception list.",
              );
            }
          }
        }}
      >
        Button to redirect
      </button>
    </div>
  );
}
