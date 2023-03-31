import PaymentScreen from "src/modules/checkout/payment-card-screen";
import { GetServerSideProps } from "next";

export default function QRCodeScreen() {
  return (
    <div className="w-full text-black-dark">
      <PaymentScreen />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
