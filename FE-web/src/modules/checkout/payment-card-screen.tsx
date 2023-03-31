import { Fragment, MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { apiRoute } from "src/constants/apiRoutes";
import { API_KEY_PAYMENT, KBANK_BASE_URL, MID_PAYMENT } from "src/constants/app";
import { browserConfig } from "src/constants/browser-config";

// import QRPayment from "./qr-payment";

const typeOf = {
  shipToAddress: "Ship to address",
  pickUp: "Pickup",
};

const typeOfPayment = {
  sale: "sale",
  scmPoint: "scm-point",
  register: "register",
};

export default function PaymentScreen() {
  const ref = useRef<HTMLButtonElement>(null);
  const [messError, setMessError] = useState("");
  const router = useRouter();
  const { totalPrice, orderNumber, provinceId, couponCode, type, token, accessToken, paymentType } =
    router.query;

  const closeCurrentTab = () => {
    window?.open("", "_self")?.close();
  };

  // const openOTP = (redirect_url: string) => {
  //   const newWindow = window.open(
  //     redirect_url,
  //     "_blank",
  //     "location=yes,height=600,width=1000,scrollbars=yes,status=yes,left=100,resizable=yes",
  //   );
  //   const interval = setInterval(() => {
  //     if (newWindow) {
  //       if (newWindow.closed) {
  //         clearInterval(interval);
  //         console.log(redirectUrl);
  //         window.location.href = redirectUrl;
  //       }
  //     }
  //   }, 2000);
  // };

  const paymentCheckout = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (paymentInfo: any) => {
      const url = new URL(window.location.href);
      url.searchParams.delete("token");
      url.searchParams.delete("mid");
      url.searchParams.delete("paymentMethods");
      try {
        const {
          reference_order = "",
          amount = "",
          provinceId = "",
          type = "",
          couponCode = "",
          accessToken = "",
          paymentType = "sale",
        } = paymentInfo;
        const res2 = await axios.post(
          `${browserConfig.apiBaseUrl}${apiRoute.payment.normalCharge}`,
          {
            amount,
            currency: "THB",
            description: "Checkout Payment",
            source_type: "card",
            mode: "token",
            reference_order,
            token,
            ref_1: paymentType,
            provinceId,
            type,
            couponCode,
          },
          {
            headers: {
              "X-Frame-Options": "SAMEORIGIN",
              "Content-type": "application/json",
              "XSRF-TOKEN": "csrfToken",
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        const { id, redirect_url, status, transaction_state } = res2.data;

        // non secure
        console.log("chargeId", id);
        console.log(JSON.stringify({ chargeId: id }));
        url.searchParams.set("status", status);
        if (status === "success") {
          if (transaction_state === "Pre-Authorized") {
            window.location.href = redirect_url;
          } else if (transaction_state === "Authorized") {
            window.location.href = url.href;
          }
        } else if (status === "fail") {
          window.location.href = url.href;
          setTimeout(() => (window.location.href = url.href), 3000);
        } else if (status === "pending" && redirect_url) {
          window.location.href = redirect_url;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.log(e);
        const error = e.response?.status !== 401 ? e.response?.data?.message : "";
        setMessError(error);
        url.searchParams.set("status", "fail");
        if (error) {
          setTimeout(() => (window.location.href = url.href), 3000);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [token],
  );

  const registerSignUp = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (paymentInfo: any) => {
      const url = new URL(window.location.href);
      url.searchParams.delete("token");
      url.searchParams.delete("mid");
      url.searchParams.delete("paymentMethods");
      try {
        const { reference_order = "", amount = "", couponCode = "" } = paymentInfo;
        const res2 = await axios.post(
          `${browserConfig.apiBaseUrl}/${apiRoute.payment.registerCharge}`,
          {
            amount,
            currency: "THB",
            description: "Register Payment",
            source_type: "card",
            mode: "token",
            reference_order,
            token,
            ref_1: "register",
            couponCode,
          },
          {
            headers: {
              "X-Frame-Options": "SAMEORIGIN",
              "Content-type": "application/json",
              "XSRF-TOKEN": "csrfToken",
            },
          },
        );

        const { id, redirect_url, status, transaction_state } = res2.data;

        console.log("chargeId", id);
        console.log(JSON.stringify({ chargeId: id }));
        url.searchParams.set("status", status);
        if (status === "success") {
          if (transaction_state === "Pre-Authorized") {
            window.location.href = redirect_url;
          } else if (transaction_state === "Authorized") {
            window.location.href = url.href;
          }
        } else if (status === "fail") {
          window.location.href = url.href;
          setTimeout(() => (window.location.href = url.href), 3000);
        } else if (status === "pending" && redirect_url) {
          window.location.href = redirect_url;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.log(e);
        const error = e.response?.status !== 401 ? e.response?.data?.message : "";
        setMessError(error);
        url.searchParams.set("status", "fail");
        if (error) {
          setTimeout(() => (window.location.href = url.href), 3000);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [token],
  );

  const handlePaymentMethod = useCallback(() => {
    const paymentInfo = sessionStorage.getItem("PaymentInfo");
    if (paymentInfo) {
      const data = JSON.parse(paymentInfo);
      const { paymentType } = data;
      if (paymentType === "register") {
        registerSignUp(data);
      } else {
        paymentCheckout(data);
      }
    }
  }, [registerSignUp, paymentCheckout]);

  const onClickRealpayment = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const KPayment = (window as any).KPayment;
    if (KPayment) {
      const cancelOrder = () => {
        closeCurrentTab();
        console.log("cancel order");
      };
      KPayment.show();
      KPayment.onClose(cancelOrder);
    }
  };

  useEffect(() => {
    if (totalPrice && orderNumber && ref.current) {
      ref.current?.click();
    }
  }, [ref, totalPrice, orderNumber]);

  useEffect(() => {
    if (orderNumber && totalPrice) {
      sessionStorage.setItem(
        "PaymentInfo",
        JSON.stringify({
          amount: +totalPrice,
          couponCode,
          reference_order: orderNumber,
          provinceId,
          accessToken,
          type: typeOf[type as "shipToAddress"],
          paymentType: typeOfPayment[paymentType as "sale"],
        }),
      );
    }
  }, [totalPrice, couponCode, orderNumber, provinceId, accessToken, type, paymentType]);

  useEffect(() => {
    if (token && typeof token === "string") {
      handlePaymentMethod();
    }
  }, [handlePaymentMethod, token]);

  // useEffect(() => {
  //   if (redirect_url && typeof redirect_url === "string") {
  //     window.location.href = redirect_url as "url";
  //   }
  // }, [redirect_url]);

  return (
    <Fragment>
      <form style={{ display: "none" }}>
        <script
          type="text/javascript"
          src={`${KBANK_BASE_URL}/ui/v2/kpayment.min.js`}
          data-apikey={API_KEY_PAYMENT}
          data-amount={totalPrice || 0}
          data-currency="THB"
          data-payment-methods="card"
          data-name="Checkout payment"
          data-show-button="false"
          data-mid={MID_PAYMENT}
          data-customerid="cust_prod_12345678"
        ></script>
        <button type="button" ref={ref} onClick={onClickRealpayment}>
          Real Button Payment
        </button>
      </form>
      <h3 className="errorMessage w-full text-center">{messError}</h3>
    </Fragment>
  );
}
