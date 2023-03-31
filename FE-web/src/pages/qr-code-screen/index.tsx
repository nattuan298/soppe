import QrCode from "src/modules/qr-code-screen";
import { GetServerSideProps } from "next";

export default function QRCodeScreen() {
  return (
    <div className="w-full text-black-dark">
      <QrCode />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
