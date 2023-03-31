import { Divider } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ButtonMui } from "src/components";
import NumberFormatCustome from "src/components/text/number-format";
import { useLocationBase } from "src/hooks";
import { RootState } from "src/state/store";
// import { useRouter } from "next/router";
import Link from "next/link";

interface ModalOrderSummaryType {
  onClickPayment: () => void;
  disabled: boolean;
  showCircle: boolean;
}

export default function ModalOrderSummary({
  onClickPayment,
  disabled,
  showCircle,
}: ModalOrderSummaryType) {
  const { t } = useTranslation("common");
  const { memberType, couponRedeemAmount, coupon } = useSelector(
    (state: RootState) => state.signup,
  );
  const { tax } = useLocationBase();
  // const router = useRouter();

  const totalPrice = useMemo(() => (memberType === "1" ? 300 : 100), [memberType]);
  const taxPrice = useMemo(() => (totalPrice / (1 + tax)) * tax, [totalPrice, tax]);

  return (
    <div className="w-screen sm:w-72 bottom-0 right-0 pt-[15px] pb-[15px] sm:pt-3 sm:pb-6 px-4 rounded-RadiusFooter sm:rounded-0.625 shadow-modal bg-white fixed sm:sticky sm:top-24  z-[1000] sm:z-0">
      <p className="font-medium text-lg mb-4 hidden sm:block">{t`order_summary`}</p>
      <div className="grid-cols-5 gap-4 mb-2.5 hidden sm:grid">
        <div className="col-span-3">
          <span className="text-sm">{t`total_product_price`}</span>
        </div>
        <div className="col-span-2">
          <span className="text-sm">฿{(totalPrice - taxPrice).toFixed(2)}</span>
        </div>
      </div>

      <div className="sm:grid grid-cols-5 gap-4 mb-2.5 hidden">
        <div className="col-span-3">
          <span className="text-sm">{t`taxes`}</span>
        </div>
        <div className="col-span-2">
          <span className="text-sm">฿{taxPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="hidden sm:block">
        <Link href="https://scmconnext.com/help-center-3/61b1844b133b46494dc544b3">
          <a
            target="_blank"
            className="text-0.6875 text-blue cursor-pointer"
          >{t`more_about_taxes`}</a>
        </Link>
      </div>

      {coupon && (
        <div className="sm:grid grid-cols-5 gap-4 mt-2 hidden">
          <div className="col-span-3">
            <span className="text-sm">
              <span>{t`discount`}</span>:
            </span>
          </div>
          <div className="col-span-2">
            <span className="text-sm">
              <NumberFormatCustome value={couponRedeemAmount.toFixed(2)} prefix="฿" />
            </span>
          </div>
        </div>
      )}

      <Divider className="mt-4 mb-4 hidden sm:block" />
      <div className="flex items-center justify-between sm:block">
        <div className="flex justify-start sm:justify-between flex-1">
          <span className="font-medium text-lg sm:mr-0 mr-[10px]">{t`total`}</span>
          <span className="font-medium text-lg">
            ฿{(totalPrice - couponRedeemAmount).toFixed(2)}
          </span>
        </div>
        <Divider className="mt-4 mb-6 hidden sm:block" />
        <div className="w-full flex-1">
          {" "}
          <ButtonMui
            showCircle={showCircle}
            disabled={disabled}
            onClick={onClickPayment}
          >{t`make_payment`}</ButtonMui>
        </div>
      </div>
    </div>
  );
}
