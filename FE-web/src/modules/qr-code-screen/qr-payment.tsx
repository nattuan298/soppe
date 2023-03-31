import { MouseEvent, useRef } from "react";
import { API_KEY_PAYMENT, KBANK_BASE_URL } from "src/constants/app";

interface QRPaymentProps {
  totalPriceParam: number;
  orderIdForQR: string;
}

export default function QRPayment({ totalPriceParam, orderIdForQR }: QRPaymentProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const onClickRealpayment = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).KPayment?.show();
  };
  return (
    <form style={{ display: "block" }}>
      <script
        type="text/javascript"
        src={`${KBANK_BASE_URL}/ui/v2/kpayment.min.js`}
        data-apikey={API_KEY_PAYMENT}
        data-amount={totalPriceParam || 0}
        data-currency="THB"
        data-payment-methods={"qr"}
        data-name="Checkout payment"
        data-show-button="false"
        data-order-id={orderIdForQR}
      ></script>
      <button type="button" ref={ref} style={{ display: "block" }} onClick={onClickRealpayment}>
        Real Button Payment
      </button>
    </form>
  );
}
