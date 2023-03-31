import { MouseEvent, useEffect, useRef, useState } from "react";
import { API_KEY_PAYMENT, KBANK_BASE_URL } from "src/constants/app";
import { useRouter } from "next/router";

// import QRPayment from "./qr-payment";

export default function QRCodeScreen() {
  // const [orderIdForQR, setOrderIdForQR] = useState("");
  const ref = useRef<HTMLButtonElement>(null);
  const [, setModalPaymentShow] = useState(false);

  const router = useRouter();
  const { totalPrice, orderIdForQR } = router.query;

  const closeCurrentTab = () => {
    window?.open("", "_self")?.close();
  };

  const onClickRealpayment = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const KPayment = (window as any).KPayment;
    if (KPayment) {
      const cancelOrder = () => {
        closeCurrentTab();
      };
      KPayment.show();
      KPayment.onClose(cancelOrder);
    }
  };

  useEffect(() => {
    if (orderIdForQR) {
      ref.current?.click();
      setModalPaymentShow(true);
    }
  }, [ref, orderIdForQR]);

  // useEffect(() => {
  //   if (modalPaymentShow && orderIdForQR) {
  //     const a: EventListener = () => {
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       const closeButtons = document.getElementsByClassName("close-buttton");
  //       for (let i = 0; i < closeButtons.length; i++) {
  //         const button = closeButtons[i] as HTMLElement;
  //         button.click();
  //       }
  //     };
  //     window.onbeforeunload = a;
  //   }
  // }, [modalPaymentShow, orderIdForQR]);

  return (
    <form style={{ display: "none" }}>
      <script
        type="text/javascript"
        src={`${KBANK_BASE_URL}/ui/v2/kpayment.min.js`}
        data-apikey={API_KEY_PAYMENT}
        data-amount={totalPrice || 0}
        data-currency="THB"
        data-payment-methods="qr"
        data-name="Checkout payment"
        data-show-button="false"
        data-order-id={orderIdForQR}
      ></script>
      <button type="button" ref={ref} onClick={onClickRealpayment}>
        Real Button Payment
      </button>
    </form>
  );
}
