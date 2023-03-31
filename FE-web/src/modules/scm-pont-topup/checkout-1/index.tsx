/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logo } from "src/components/svgs";
import { useEffect, useMemo, useRef, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { ButtonMui, Select, Title } from "src/components";
import styles from "./style.module.css";
import { OrderSummary } from "./order-summary";
import { useRouter } from "next/router";
import { routeConfirmPointTopupBase } from "src/constants/routes";
import { Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/state/store";
import {
  actionGetDataFromLocalStore,
  changeError,
  changefieldOrderIdForQR,
  changefieldStatus,
  resetStateCheckout,
} from "src/feature/scm-point-topup/slice";
import {
  fetchGetDetailPointTopup,
  fetchGetEcommission,
  fetchPayLoadPaymentCheckout,
  fetchPutDecreaseEcommission,
} from "src/feature/scm-point-topup/action";
import { API_KEY_PAYMENT, KBANK_BASE_URL, MID_PAYMENT } from "src/constants/app";
import axios from "src/lib/client/request";
import { apiRoute } from "src/constants/apiRoutes";
import { notifyToast } from "src/constants/toast";
import NumberWithIcon from "src/components/input/number-with-icon";
import { useLocationBase } from "src/hooks";
import { browserConfig } from "src/constants/browser-config";
import { Cookies } from "react-cookie";
import { fetchPostStatusQRFeature } from "src/feature/checkQRFeature/qr-feature.action";
import useGetScreenWidth from "../../../hooks/useGetScreenWidth";
import Image from "next/image";

const cookies = new Cookies();
const tokenAuthen = cookies.get("token");

const getDataLocalStorage = () => {
  const newState = localStorage.getItem("stateCheckoutPoint");
  if (newState) {
    return JSON.parse(newState);
  }
};
export function CheckoutPointTopup() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const stateCheckout = useSelector((state: RootState) => state.scmPoint);
  const OrderId = useSelector((state: RootState) => state.scmPoint.OrderId);
  const statusMakePayment = useSelector((state: RootState) => state.scmPoint.statusMakePayment);
  const total = useSelector((state: RootState) => state.scmPoint.total);
  const TotalEcommission = useSelector((state: RootState) => state.scmPoint.TotalEcommission);
  const { t } = useTranslation("common");
  const router = useRouter();
  const {
    token,
    totalPrice: totalPriceParam,
    MethodPayment: paymentMethodParam,
    orderIdForQR,
    chargeId,
  } = router.query;
  const [point, setPoints] = useState<number>(total);
  const [errorPoints, setErrorPoint] = useState<string>("");
  const [mode, setMode] = useState("");
  const ref = useRef<HTMLButtonElement>(null);
  const { locationBase, symbol, currencyUnit } = useLocationBase();
  const { status } = useSelector((state: RootState) => state.checkStatusQR);
  const { userInfor } = useSelector((state: RootState) => state.user);
  const screen = useGetScreenWidth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const data = getDataLocalStorage();
    if (data) {
      setMode(data.paymentMethod);
    } else {
      setMode("QR Payment");
    }
  }, []);

  useEffect(() => {
    if (chargeId && OrderId && stateCheckout.orderIdForQR) {
      setLoading(true);
      let count = 0;
      const callAPI = async () => {
        try {
          const res = await axios.get(
            `${apiRoute.payment.statePayment}?orderId=${OrderId}&orderPaymentId=${stateCheckout.orderIdForQR}&refType=scm-point`,
          );
          count++;
          if (res.data.paymentState === "Succeeded" && res.data.transactionState === "Authorized") {
            clearInterval(interval);
            dispatch(fetchGetDetailPointTopup(res.data.orderId));
            router.push(routeConfirmPointTopupBase);
          }
          if (count === 5 && res.data.paymentState === "Pending") {
            router.push(routeConfirmPointTopupBase);
            localStorage.setItem("OrderId", stateCheckout.OrderId);
            clearInterval(interval);
          }
        } catch (e) {}
      };
      const interval = setInterval(() => {
        callAPI();
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chargeId, OrderId, stateCheckout.orderIdForQR, dispatch, router]);

  useEffect(() => {
    const data = getDataLocalStorage();
    if (orderIdForQR && typeof orderIdForQR === "string") {
      dispatch(changefieldOrderIdForQR(orderIdForQR));
      localStorage.setItem("stateCheckoutPoint", JSON.stringify({ ...data, orderIdForQR }));
    }
  }, [dispatch, orderIdForQR, stateCheckout]);
  useEffect(() => {
    const totalCheckout = localStorage.getItem("pointTopup");
    totalCheckout && setPoints(parseInt(totalCheckout));
  }, []);

  useEffect(() => {
    if (stateCheckout.errorMessage !== "") {
      notifyToast("error", stateCheckout.errorMessage);
      dispatch(changeError(""));
    }
    if (stateCheckout.OrderId && stateCheckout.chargeId) {
      if (stateCheckout.paymentStatusForNonSecure === "success") {
        notifyToast("default", "payment_successfully", t);
        dispatch(fetchGetDetailPointTopup(stateCheckout.OrderId));
        router.push(routeConfirmPointTopupBase);
        dispatch(resetStateCheckout());
        dispatch(changefieldStatus(""));
      } else {
        let count = 0;
        setLoading(true);
        const callApi = async () => {
          const response = await axios
            .get(
              `${apiRoute.payment.statePayment}?orderId=${stateCheckout.OrderId}&chargeId=${stateCheckout.chargeId}&refType=scm-point`,
            )
            .catch((e) => {
              count = 0;
              clearInterval(interval);
              dispatch(resetStateCheckout());
              return { data: { error: e.response.data.message } };
            });
          if (!stateCheckout.openOTPPopup) {
            count += 1;
          }
          if (
            response.data.paymentState === "Succeeded" &&
            response.data.transactionState === "Authorized"
          ) {
            clearInterval(interval);
            dispatch(fetchGetDetailPointTopup(response.data.orderId));
            router.push(routeConfirmPointTopupBase);
          }
          if (response.data.paymentState === "Failed") {
            notifyToast("error", "can_not_process_payment", t);
            clearInterval(interval);
          }
          if (count === 5 && response.data.paymentState === "Pending") {
            localStorage.setItem("OrderId", stateCheckout.OrderId);
            router.push(routeConfirmPointTopupBase);
            clearInterval(interval);
          }
        };
        const interval = setInterval(() => {
          callApi();
        }, 5000);
        return () => {
          clearInterval(interval);
        };
      }
    }
  }, [
    dispatch,
    router,
    stateCheckout.OrderId,
    stateCheckout.chargeId,
    stateCheckout.errorMessage,
    stateCheckout.paymentStatusForNonSecure,
    stateCheckout.openOTPPopup,
    t,
  ]);
  useEffect(() => {
    const data = getDataLocalStorage();
    const isPaymentCheckout = localStorage.getItem("isPaymentCheckoutPoint");
    if (data) {
      setPoints(data.total);
      dispatch(actionGetDataFromLocalStore(data));
    }
    if (token && typeof token === "string") {
      dispatch(fetchPayLoadPaymentCheckout({ token, data }));
    }
    if (isPaymentCheckout && typeof isPaymentCheckout === "string") {
      localStorage.removeItem("isPaymentCheckoutPoint");
      const timeout = setTimeout(() => {
        ref.current?.click();
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (statusMakePayment === "success") {
      localStorage.setItem("OrderId", OrderId);
      notifyToast("default", "payment_successfully", t);
      setTimeout(() => {
        router.push(routeConfirmPointTopupBase);
      }, 3000);
    }
  }, [OrderId, dispatch, router, statusMakePayment, t]);
  const handleChangePoint = (value: any) => {
    setErrorPoint("");
    setPoints(value);
  };
  const handleChangeSelect = ({ value }: { value: string; title: string }) => {
    if (value === "") {
      return;
    }
    if (value === "E-commission") {
      dispatch(fetchGetEcommission());
    }
    setMode(value);
  };

  const onClickRealpayment = () => {
    const KPayment = (window as any).KPayment;
    if (KPayment) {
      // cancel order when click popup
      const cancelOrder = () => {
        const callApi = async () => {
          fetch(
            `${browserConfig.apiBaseUrl}${apiRoute.pointTopup.updatePayment}/${stateCheckout.OrderId}`,
            {
              method: "PUT",
              keepalive: true,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenAuthen}`,
              },
            },
          );
        };
        if (orderIdForQR) {
          callApi();
        }
      };
      KPayment.onClose(cancelOrder);
    }
    KPayment.show();
  };

  useEffect(() => {
    if (userInfor?.memberId) {
      dispatch(fetchPostStatusQRFeature(userInfor?.memberId));
    }
  }, [dispatch, userInfor?.memberId]);

  const listPaymentMethod = useMemo(() => {
    if (locationBase === "Thailand") {
      if (status) {
        return [
          {
            title: t`qr_payment`,
            value: "QR Payment",
          },
          {
            title: t`credit_debit`,
            value: "Credit/Debit",
          },
          {
            title: t`e_commission`,
            value: "E-commission",
          },
        ];
      }
      return [
        {
          title: t`credit_debit`,
          value: "Credit/Debit",
        },
        {
          title: t`e_commission`,
          value: "E-commission",
        },
      ];
    }
    return [
      {
        title: t`e_commission`,
        value: "E-commission",
      },
    ];
  }, [locationBase, status, t]);

  const handlePayment = async () => {
    const bodyRequest = {
      total: point,
    };
    const url = new URL(window.location.href);

    if (point > 1000000) {
      setErrorPoint(t`topup_amount_validate`);
      return;
    }
    if (mode === "E-commission") {
      if (point > TotalEcommission.data) {
        notifyToast("error", t`insufficient_commission`);
      } else {
        dispatch(fetchPutDecreaseEcommission(point));
      }
    }
    if (mode === "Credit/Debit") {
      setLoading(true);
      try {
        const response = await axios.post(`${apiRoute.pointTopup.makeOrder}`, {
          ...bodyRequest,
          paymentMethod: "Credit/ Debit Card",
        });
        if (response.status === 200) {
          localStorage.setItem(
            "stateCheckoutPoint",
            JSON.stringify({
              ...stateCheckout,
              OrderId: response.data._id,
              total: point,
              paymentMethod: "Credit/Debit",
            }),
          );
          localStorage.setItem("isPaymentCheckoutPoint", "true");
          url.searchParams.set("totalPrice", point.toString());
          url.searchParams.set("MethodPayment", mode.toString());
          url.searchParams.delete("token");
          url.searchParams.delete("mid");
          url.searchParams.delete("paymentMethods");
          localStorage.removeItem("pointTopup");
          window.location.href = url.href;
        }
      } catch (e: any) {
        const message = e.response?.data?.message || "";
        if (message) {
          notifyToast("error", message);
        }
        setLoading(false);
        return;
      }
    }
    if (mode === "QR Payment") {
      setLoading(true);
      const response = await axios.post(`${apiRoute.pointTopup.makeOrder}`, {
        ...bodyRequest,
        paymentMethod: "QR code",
      });
      if (response.status === 200) {
        localStorage.setItem(
          "stateCheckoutPoint",
          JSON.stringify({
            ...stateCheckout,
            OrderId: response.data._id,
            total: point,
            paymentMethod: "QR Payment",
          }),
        );
        try {
          const res = await axios.post(`${apiRoute.payment.createOrderForQR}`, {
            amount: point,
            currency: "THB",
            description: "Checkout payment by QR code",
            source_type: "qr",
            reference_order: response.data._id,
            ref_1: "scm-point",
          });
          localStorage.setItem("isPaymentCheckoutPoint", "true");
          url.searchParams.set("orderIdForQR", res.data.id);
          url.searchParams.set("totalPrice", point.toString());
          url.searchParams.set("MethodPayment", "qr");
          localStorage.removeItem("pointTopup");
          window.location.href = url.href;
        } catch (error: any) {
          const message = error.response?.data?.message || "";
          if (message) {
            notifyToast("error", message);
          }
          setLoading(false);
          return;
        }
      }
    }
  };
  const moreParams = useMemo(() => {
    if (paymentMethodParam === "qr") {
      return {};
    }
    return {
      "data-mid": MID_PAYMENT,
    };
  }, [paymentMethodParam]);

  return (
    <div className="mx-auto w-full sm:w-1216 sm:mt-8 sm:mb-16 relative">
      <div className="flex justify-between relative">
        <div className="w-full sm:w-3/5 sm:p-0 p-4">
          <div className="font-medium text-lg mb-6">{t`order_summary`}</div>
          {screen === "Desktop" && (
            <table className="w-full table">
              <tr className="text-sm font-normal ">
                <td>{t`product`}</td>
                <td className="pl-8">{t`quantity`}</td>
                <td>{t`price`}</td>
              </tr>
              <tr>
                <td>
                  <div className="flex">
                    {/* logo svg can not show in ios, have to use logo png */}
                    <Image src="/assets/images/logo.png" alt="logo scm" width={85} height={65} />
                    <div className="ml-4 flex items-center justify-center font-Regular">
                      <div>{t`topup-scm-point`}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="h-20 w-32">
                    <div className="mt-14">
                      <NumberWithIcon onChange={handleChangePoint} value={point} max={1000000} />
                    </div>
                    {errorPoints && <p className="text-sm text-red mt-2">{t(`${errorPoints}`)}</p>}
                  </div>
                </td>
                <td className="text-orange">
                  {symbol}
                  {new Intl.NumberFormat("en-US").format(point)}
                </td>
              </tr>
            </table>
          )}

          <div className="sm:hidden flex gap-4 mb-4">
            <div>
              <Logo />
            </div>
            <div className=" sm:hidden flex flex-col gap-1">
              <div className="mb-[13px] sm:mb-0">{t`topup-scm-point`}</div>
              <NumberWithIcon onChange={handleChangePoint} value={point} max={1000000} />
              {errorPoints && <p className="text-sm text-red mt-2">{t(`${errorPoints}`)}</p>}
              <div className="text-orange mt-[10px] sm:mt-0">
                {symbol}
                {new Intl.NumberFormat("en-US").format(point)}
              </div>
            </div>
          </div>
          <Divider />
          <div className="mt-8 mb-6">
            <div className="font-medium text-lg mb- mb-3">{t`payment_method`}</div>
            <div className=" w-full sm:w-1/2">
              <Title title={t`payment_method`} isRequired />
              <Select
                options={listPaymentMethod}
                placeholder={t`payment_method`}
                defaultValue={mode}
                onChange={handleChangeSelect}
              />
            </div>
            {mode === "E-commission" ? (
              <div className="flex mt-4">
                <div className="text-sm">{t`your_current`}</div>
                <div
                  className={`${styles.small_scm_logo} mx-4 text-orange bg-orange bg-opacity-10 text-center`}
                >
                  <div className={`${styles.scmp_text}`}>{t`e_commission`}</div>
                </div>
                <div className="text-sm">{TotalEcommission.data}</div>
                <div className={`${styles.points}`}>
                  <div>{currencyUnit}</div>
                </div>
              </div>
            ) : null}
          </div>
          <Divider />
          <div className="mt-6 mb-5">
            <div className="flex justify-between">
              <div className="font-medium mb-6">{t`total_product_price`}</div>
              <div>
                {symbol}
                {new Intl.NumberFormat("en-US").format(point)}.00
              </div>
            </div>
            <div
              className={`${styles.link_read_more} cursor-pointer`}
              onClick={() => {
                router.push("/help-center-3/61bb046f48567dc9f8acd97e");
              }}
            >{t`read_more_scm_point_topup`}</div>
          </div>
          <Divider />
          <div className="my-5 flex justify-between">
            <div className="font-medium text-xl">{t`total`}</div>
            <div className="font-medium text-xl">
              {symbol}
              {new Intl.NumberFormat("en-US").format(point)}.00
            </div>
          </div>
          <Divider />
          <div className="mt-6 hidden sm:block">
            <div className="w-full">
              <ButtonMui
                showCircle={loading}
                disabled={!mode || !(point > 0) || loading}
                onClick={handlePayment}
              >{t`make_payment`}</ButtonMui>
            </div>
          </div>
          <form style={{ display: mode === "Credit/Debit" ? "block" : "none" }}>
            <script
              type="text/javascript"
              src={`${KBANK_BASE_URL}/ui/v2/kpayment.min.js`}
              data-apikey={API_KEY_PAYMENT}
              data-amount={totalPriceParam}
              data-currency="THB"
              data-payment-methods={paymentMethodParam === "qr" ? "qr" : "card"}
              data-name="Checkout payment"
              data-mid={MID_PAYMENT}
              data-show-button="false"
              data-order-id={orderIdForQR}
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
        <div className="">
          <div className="fixed sm:sticky bottom-0 right-0  sm:top-48 z-[1000] sm:z-0">
            <OrderSummary
              points={point}
              handlePayment={handlePayment}
              disabled={!mode || !(point > 0) || loading}
              showCircle={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
