/* eslint-disable no-console */
import { Checkbox, Divider } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonMui, Title } from "src/components";
import Link from "next/link";
// import Link from "src/components/text/link";
import NumberFormatCustome from "src/components/text/number-format";
import { apiRoute } from "src/constants/apiRoutes";
import { API_KEY_PAYMENT, KBANK_BASE_URL, MID_PAYMENT } from "src/constants/app";
import { notifyToast } from "src/constants/toast";
import {
  actionGetDataFromLocalStore,
  handleChangeField,
  postSignupfulfilled,
} from "src/feature/signup/slice";
import { fetchPostPaymentSignup } from "src/feature/signup/action";
import { useLocationBase } from "src/hooks";
import axios from "src/lib/client/request";
import { RootState } from "src/state/store";
import ModalOrderSummary from "./modal-order-summary";
import OrderSummary from "./order-summary";
import PaymentMethod from "./payment-method";
import Promotion from "./promotion";

// 4417706600005830

let newWindow: Window | null = null;

const getDataLocalStorage = () => {
  const newState = localStorage.getItem("stateSignUp");
  if (newState) {
    localStorage.removeItem("stateSignUp");
    return JSON.parse(newState);
  }
};

export default function Checkout() {
  // not use common in this file
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const {
    token,
    totalPrice: totalPriceParam,
    orderIdForQR,
    paymentMethod: paymentMethodParam,
    chargeId,
  } = router.query;
  const { tax } = useLocationBase();

  const dispatch = useDispatch();

  const stateSignUp = useSelector((state: RootState) => state.signup);

  const totalPrice = useMemo(
    () => (stateSignUp.memberType === "1" ? 300 : 100),
    [stateSignUp.memberType],
  );

  const callbackError = useCallback(
    (message: string) => {
      notifyToast("error", message, t);
      setLoading(false);
    },
    [t],
  );

  const onClickRealpayment = () => {
    localStorage.setItem("stateSignUp", JSON.stringify(stateSignUp));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const KPayment = (window as any).KPayment;
    if (KPayment) {
      const cancelOrder = () => {
        const callApi = async () => {
          await axios.put(`${apiRoute.sponsors.sponsors}/${stateSignUp.orderId}/remove-coupon`);
        };
        if (orderIdForQR) {
          callApi();
          dispatch(handleChangeField({ coupon: "" }));
          dispatch(handleChangeField({ couponDraft: "" }));
          dispatch(handleChangeField({ couponRedeemAmount: 0 }));
        }
      };
      KPayment.onClose(cancelOrder);
      KPayment.show();
    }
  };

  const onClickPayment = async () => {
    const finalPrice = totalPrice - stateSignUp.couponRedeemAmount;
    if (finalPrice === 0) {
      setLoading(true);
      dispatch(fetchPostPaymentSignup({ data: stateSignUp, callbackError }));
    }
    localStorage.setItem(
      "stateSignUp",
      JSON.stringify({
        ...stateSignUp,
        redirect_url: "",
        chargeId: "",
        paymentStatusForNonSecure: "",
      }),
    );
    localStorage.setItem("isPaymentSignup", "true");
    const url = new URL(window.location.href);
    url.searchParams.delete("token");
    url.searchParams.delete("mid");
    url.searchParams.delete("paymentMethod");
    url.searchParams.delete("orderIdForQR");
    url.searchParams.delete("memberType");
    url.searchParams.set("totalPrice", (totalPrice - stateSignUp.couponRedeemAmount).toString());

    if (stateSignUp.paymentMethod === "QR code") {
      setLoading(true);
      try {
        await dispatch(
          fetchPostPaymentSignup({ data: stateSignUp, callbackError, urlObject: url }),
        );
      } catch (e) {}
      setLoading(false);
      return;
    }
    url.searchParams.set("memberType", stateSignUp.memberType);

    window.location.href = url.href;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // (window as any).KPayment?.show();
    // localStorage.setItem("stateSignUp", JSON.stringify(stateSignUp));
  };

  useEffect(() => {
    const data = getDataLocalStorage();
    const isPaymentSignup = localStorage.getItem("isPaymentSignup");
    if (data) {
      dispatch(actionGetDataFromLocalStore(data));
    }

    if (token && typeof token === "string") {
      dispatch(fetchPostPaymentSignup({ token, data, callbackError }));
    }

    if (isPaymentSignup && typeof isPaymentSignup === "string") {
      localStorage.removeItem("isPaymentSignup");
      const timeout = setTimeout(() => {
        ref.current?.click();
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [token, dispatch, ref, t, callbackError]);

  // const callAPI2 = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${apiRoute.payment.statePaymentRegister}?orderId=${stateSignUp.orderId}&chargeId=${stateSignUp.chargeId}&refType=register`,
  //     );
  //     return res.data.paymentState;
  //   } catch (e) {
  //     return "";
  //   }
  // };

  useEffect(() => {
    const redirect_url = stateSignUp.redirect_url;
    if (redirect_url && !newWindow) {
      if (redirect_url) {
        newWindow = window.open(
          redirect_url,
          "_blank",
          "location=yes,height=600,width=1000,scrollbars=yes,status=yes,left=100,resizable=yes",
        );
        if (!newWindow) {
          dispatch(handleChangeField({ redirect_url: "", chargeId: "" }));
          setLoading(false);
          notifyToast(
            "error",
            "Pop-up Blocker is enabled! Please add this site to your exception list.",
          );
        }

        const interval = setInterval(() => {
          if (newWindow) {
            if (newWindow.closed) {
              setLoading(true);
              // callAPI2().then((paymentStatus) => {
              //   if (paymentStatus === "Failed") {
              //     setLoading(false);
              //     dispatch(handleChangeField({ redirect_url: "", chargeId: "" }));
              //   }
              // });
              dispatch(handleChangeField({ redirect_url: "" }));
              newWindow = null;
              clearInterval(interval);
            }
          }
        }, 3000);

        return () => {
          interval && clearInterval(interval);
        };
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateSignUp.redirect_url, dispatch]);

  // payment with card
  useEffect(() => {
    if (
      stateSignUp.orderId &&
      (stateSignUp.chargeId || totalPrice - stateSignUp.couponRedeemAmount === 0)
    ) {
      setLoading(true);
      if (stateSignUp.paymentStatusForNonSecure === "success") {
        dispatch(postSignupfulfilled());
        // use for non secure and total price === 0
        // const callAPI = async () => {
        // (await dispatch(postSignup())) as {
        //   error?: { message?: string };
        //   payload?: string;
        // };
        // if (res.error && res.payload) {
        //   notifyToast("error", res.payload);
        // }
        // if (!res.error) {
        //   notifyToast("default", "common:payment_successfully", t);
        // } else {
        //   setLoading(false);
        // }
        // };
        // callAPI();
      } else {
        // use for secure
        let count = 0;
        const callAPI = async () => {
          try {
            const res = await axios.get(
              `${apiRoute.payment.statePaymentRegister}?orderId=${stateSignUp.orderId}&chargeId=${stateSignUp.chargeId}&refType=register`,
            );

            if (!stateSignUp.redirect_url) {
              count += 1;
            }

            if (
              res.data.paymentState === "Succeeded" &&
              res.data.transactionState === "Authorized"
            ) {
              clearInterval(interval);
              dispatch(postSignupfulfilled());
              // (await dispatch(postSignup())) as {
              //   error?: { message?: string };
              //   payload?: string;
              // };

              // if (res.error && res.payload) {
              //   setLoading(false);
              //   notifyToast("error", res.payload);
              // }

              // if (!res.error) {
              //   notifyToast("default", "common:payment_successfully", t);
              // } else {
              //   setLoading(false);
              // }
            }

            if (res.data.paymentState === "Failed") {
              notifyToast("error", "common:can_not_process_payment", t);
              clearInterval(interval);
              setLoading(false);
              axios.put(`${apiRoute.sponsors.sponsors}/${stateSignUp.orderId}/remove-coupon`);
              dispatch(handleChangeField({ coupon: "" }));
              dispatch(handleChangeField({ couponDraft: "" }));
              dispatch(handleChangeField({ couponRedeemAmount: 0 }));
            }
            if (count === 5 && res.data.paymentState === "Pending") {
              clearInterval(interval);
              dispatch(handleChangeField({ mainStep: 7 }));
            }
          } catch (e) {
            clearInterval(interval);
            setLoading(false);
          }
        };
        const interval = setInterval(() => {
          callAPI();
        }, 5000);

        return () => {
          clearInterval(interval);
        };
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    stateSignUp.orderId,
    stateSignUp.chargeId,
    dispatch,
    stateSignUp.paymentStatusForNonSecure,
    totalPrice,
    stateSignUp.couponRedeemAmount,
    stateSignUp.redirect_url,
  ]);

  const disableButton = useMemo(() => {
    return loading || !!(stateSignUp.couponDraft && !stateSignUp.coupon);
  }, [stateSignUp.couponDraft, stateSignUp.coupon, loading]);

  const moreParams = useMemo(() => {
    if (paymentMethodParam === "qr") {
      return {
        "data-order-id": orderIdForQR,
      };
    }

    return {
      "data-mid": MID_PAYMENT,
    };
  }, [paymentMethodParam, orderIdForQR]);

  // update order when payment qr success, will have charge id of kbank in the url
  useEffect(() => {
    if (chargeId && stateSignUp.orderId && stateSignUp.orderIdForQR) {
      let count = 0;
      setLoading(true);
      const callAPI = async () => {
        try {
          const res = await axios.get(
            `${apiRoute.payment.statePaymentRegister}?orderId=${stateSignUp.orderId}&orderPaymentId=${stateSignUp.orderIdForQR}&refType=register`,
          );
          count++;
          if (res.data.paymentState === "Succeeded" && res.data.transactionState === "Authorized") {
            clearInterval(interval);
            dispatch(postSignupfulfilled());
            // (await dispatch(postSignup())) as {
            //   error?: { message?: string };
            //   payload?: string;
            // };

            // if (res.error && res.payload) {
            //   notifyToast("error", res.payload);
            // }

            // if (!res.error) {
            //   notifyToast("default", "common:payment_successfully", t);
            // } else {
            //   setLoading(false);
            // }
          }

          if (res.data.paymentState === "Failed") {
            clearInterval(interval);
            notifyToast("error", "common:can_not_process_payment", t);
            setLoading(false);
            axios.put(`${apiRoute.sponsors.sponsors}/${stateSignUp.orderId}/remove-coupon`);
            dispatch(handleChangeField({ coupon: "" }));
            dispatch(handleChangeField({ couponDraft: "" }));
            dispatch(handleChangeField({ couponRedeemAmount: 0 }));
          }
          if (count === 5 && res.data.paymentState === "Pending") {
            dispatch(handleChangeField({ mainStep: 7 }));
            clearInterval(interval);
          }
        } catch (e) {
          clearInterval(interval);
          setLoading(false);
        }
      };
      const interval = setInterval(() => {
        callAPI();
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chargeId, dispatch, stateSignUp.orderId, stateSignUp.orderIdForQR]);

  // save orderIdForQR, use when payment qr
  useEffect(() => {
    if (orderIdForQR && typeof orderIdForQR === "string") {
      dispatch(handleChangeField({ orderIdForQR }));
    }
  }, [orderIdForQR, dispatch]);

  useEffect(() => {
    if (orderIdForQR && typeof orderIdForQR === "string") {
      localStorage.setItem("stateSignUp", JSON.stringify({ ...stateSignUp, orderIdForQR }));
    }
  }, [orderIdForQR, dispatch, stateSignUp]);

  const taxPrice = useMemo(() => (totalPrice / (1 + tax)) * tax, [totalPrice, tax]);
  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(handleChangeField({ isRemarked: e.target.checked }));
  };
  return (
    <div className="sm:w-1216 w-screen mx-auto relative mt-1 sm:mt-10 mb-16 p-4 sm:p-0">
      <div className="flex justify-between">
        <div className="sm:w-720 w-screen">
          <OrderSummary totalPrice={totalPrice} />
          <Divider />
          <PaymentMethod />
          <div className="hidden sm:block">
            <Divider />
          </div>
          <div className="sm:mt-6">
            <Title title={t`common:receipt_status`} className="mt-2" />
            <label className="flex items-center sm:mt-2.5 mr-9 mb-6 sm:mb-0">
              <Checkbox color="primary" checked={stateSignUp.isRemarked} onChange={handleChecked} />
              {t`common:need_a_receipt`}
            </label>
          </div>
          <Divider />
          <Promotion />
          <Divider />
          <div className="mt-6 mb-6">
            <div className="flex items-center justify-between">
              <span>{t`common:total_product_price`}</span>
              <span>฿{(totalPrice - taxPrice).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{t`common:taxes`}</span>
              <span>฿{taxPrice.toFixed(2)}</span>
            </div>
            <Link href="https://scmconnext.com/help-center-3/61b1844b133b46494dc544b3">
              <a
                target="_blank"
                className="text-0.625 text-blue block"
              >{t`common:more_about_taxes`}</a>
            </Link>

            {stateSignUp.coupon && (
              <div className="flex items-center justify-between">
                <span>{t`common:discount`}</span>
                <NumberFormatCustome value={stateSignUp.couponRedeemAmount.toFixed(2)} prefix="฿" />
              </div>
            )}
          </div>

          <Divider />
          <div className="mt-6 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-xl font-medium">{t`common:total`}</span>
              <span className="text-xl font-medium">
                ฿{(totalPrice - stateSignUp.couponRedeemAmount).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="block sm:hidden">
            <Divider />
          </div>
          <div className="hidden sm:block">
            <ButtonMui
              disabled={disableButton}
              showCircle={loading}
              onClick={onClickPayment}
            >{t`common:make_payment`}</ButtonMui>
          </div>

          <form style={{ display: "none" }}>
            <script
              type="text/javascript"
              src={`${KBANK_BASE_URL}/ui/v2/kpayment.min.js`}
              data-apikey={API_KEY_PAYMENT}
              data-amount={totalPriceParam || 0}
              data-currency="THB"
              data-payment-methods={paymentMethodParam === "qr" ? "qr" : "card"}
              data-name="Checkout payment"
              data-show-button="false"
              {...moreParams}
            ></script>

            <button
              type="button"
              ref={ref}
              style={{ display: "none" }}
              onClick={onClickRealpayment}
            >
              Real Button Payment
            </button>
          </form>
        </div>

        <div className="relative sm:-top-24" style={{ height: "calc(100% + 96px)" }}>
          <ModalOrderSummary
            disabled={disableButton}
            showCircle={loading}
            onClickPayment={onClickPayment}
          />
        </div>
      </div>
    </div>
  );
}
