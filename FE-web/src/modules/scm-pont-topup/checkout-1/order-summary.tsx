import useTranslation from "next-translate/useTranslation";
import { ButtonMui } from "src/components";
import { useLocationBase } from "src/hooks";
import styles from "./style.module.css";
import { useRouter } from "next/router";
interface pointsType {
  points: number;
  handlePayment: () => void;
  disabled: boolean;
  showCircle: boolean;
}
export function OrderSummary({ points, handlePayment, disabled, showCircle }: pointsType) {
  const { t } = useTranslation("common");
  const { symbol } = useLocationBase();
  const router = useRouter();

  const handleMakePayment = () => {
    handlePayment();
  };
  return (
    <div
      className={`${styles.order_summary} w-screen sm:w-[290px] z-[1000] sm:z-0 sm:max-w-96 h-auto sm:absolute -top-24 right-0 bg-white rounded-0.625 shadow-modalSummary`}
    >
      <div className="font-medium text-lg mb-4 hidden sm:block">{t`order_summary`}</div>
      <div className="hidden sm:block">
        <div className="flex justify-between">
          <div className="font-Regular text-sm mb-2.5">{t`total_product_price`}</div>
          <div className="font-Regular text-sm">
            {symbol}
            {new Intl.NumberFormat("en-US").format(points)}.00
          </div>
        </div>
        <div
          className={`${styles.link_read_more} cursor-pointer`}
          onClick={() => {
            router.push("/help-center-3/61bb046f48567dc9f8acd97e");
          }}
        >{t`read_more_scm_point_topup`}</div>
      </div>
      <div className="border-b mt-6 hidden sm:block"></div>
      <div className="flex sm:block justify-between items-center">
        <div className="sm:mt-4 sm:mb-6 flex justify-start sm:justify-between flex-1">
          <div className="font-medium text-lg mr-[10px]">{t`total`}:</div>
          <div className="font-medium text-lg">
            {symbol}
            {new Intl.NumberFormat("en-US").format(points)}.00
          </div>
        </div>
        <div className="w-full flex-1">
          <ButtonMui
            disabled={disabled}
            height={45}
            onClick={handleMakePayment}
            showCircle={showCircle}
          >{t`make_payment`}</ButtonMui>
        </div>
      </div>
    </div>
  );
}
