import { Divider } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { ButtonMui } from "src/components";
import NumberFormatCustome from "src/components/text/number-format";
import { useLocationBase } from "src/hooks";
import Link from "next/link";

interface ModalOrderSummaryType {
  onClickPayment?: () => void;
  totalProductPrice: string;
  totalPV: number;
  shippingFee: string;
  disabledButton?: boolean;
  taxes: string;
  totalPrice: number;
  hiddenShippingFee?: boolean;
  showCircleButton?: boolean;
  coupon?: string;
  couponRedeemAmount?: number;
  discountCategory?: string;
  totalShippingFee: string;
}

export default function ModalOrderFull({
  onClickPayment,
  totalPV = 0,
  totalProductPrice,
  shippingFee,
  disabledButton,
  taxes,
  totalPrice,
  hiddenShippingFee,
  coupon,
  couponRedeemAmount = 0,
  showCircleButton,
  totalShippingFee,
}: ModalOrderSummaryType) {
  const { t } = useTranslation("common");
  const { symbol } = useLocationBase();

  return (
    <div className="w-72 sticky top-24 right-0 pt-2 pb-6 pl-4 pr-4 rounded-0.625 shadow-modal bg-white">
      <p className="font-medium text-lg mb-4">{t`order_summary`}</p>
      <div className="grid grid-cols-5 gap-4 mb-2.5">
        <div className="col-span-3">
          <span className="text-sm">{t`total_product_price`}</span>
        </div>
        <div className="col-span-2">
          <NumberFormatCustome value={totalProductPrice} className="text-sm" prefix={symbol} />
        </div>
      </div>
      {!hiddenShippingFee && (
        <div className="grid grid-cols-5 gap-4 mb-2.5">
          <div className="col-span-3">
            <span className="text-sm">{t`shipping_fees`}:</span>
          </div>
          <div className="col-span-2">
            <span className="text-sm">
              <NumberFormatCustome value={shippingFee} prefix={symbol} />
            </span>
          </div>
        </div>
      )}
      <div className="grid grid-cols-5 gap-4 mb-2.5">
        <div className="col-span-3">
          <span className="text-sm">{t`taxes`}:</span>
        </div>
        <div className="col-span-2">
          <span className="text-sm">
            <NumberFormatCustome value={taxes} prefix={symbol} />
          </span>
        </div>
      </div>
      <Link href="">
        <a
          target="_blank"
          className="text-0.6875 text-blue cursor-pointer"
        >{t`more_about_taxes`}</a>
      </Link>
      {!hiddenShippingFee && (
        <div className="grid grid-cols-5 gap-4 mb-2.5">
          <div className="col-span-3">
            <span className="text-sm">{t`total_shipping_fees`}:</span>
          </div>
          <div className="col-span-2">
            <span className="text-sm">
              <NumberFormatCustome value={totalShippingFee} prefix={symbol} />
            </span>
          </div>
        </div>
      )}
      {coupon && (
        <div className="grid grid-cols-5 gap-4 mt-2.5">
          <div className="col-span-3">
            <span className="text-sm">
              <span>{t`discount`}</span>:
            </span>
          </div>
          <div className="col-span-2">
            <span className="text-sm">
              <NumberFormatCustome value={couponRedeemAmount.toFixed(2)} prefix={symbol} />
            </span>
          </div>
        </div>
      )}
      <Divider className="mt-4 mb-4" />
      <div className="flex justify-between items-center gap-4">
        <span className="font-medium text-lg">{t`total`}</span>

        <span className="font-medium text-lg">
          <NumberFormatCustome value={totalPrice.toFixed(2)} prefix={symbol} />
        </span>
      </div>
      <Divider className="mt-4 mb-6" />
      <ButtonMui
        onClick={onClickPayment}
        height={45}
        textClassName="font-normal"
        disabled={disabledButton}
        showCircle={showCircleButton}
      >
        {t`make_payment`}
      </ButtonMui>
    </div>
  );
}
