import { Checkbox, Divider, FormHelperText } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { ChangeEvent, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, Title } from "src/components";
import Link from "next/link";
import NumberFormatCustome from "src/components/text/number-format";
import { handleChangeField, saveStore } from "src/feature/checkout/thunkAction";
import { CheckoutState } from "src/feature/checkout/type";
import { useLocationBase } from "src/hooks";
import { RootState } from "src/state/store";
import CouponInput from "./coupon-input";

const optionsOrderType = [
  { title: "ROC", value: "ROC" },
  { title: "BMC", value: "BMC" },
];

export default function Step3() {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const {
    paymentMethod,
    totalPrice,
    shippingFee,
    totalPV,
    sa_type,
    shippingType,
    coupon,
    couponRedeemAmount,
    locationBase,
    isRemarked,
  } = useSelector((state: RootState) => state.checkout);
  const { status } = useSelector((state: RootState) => state.checkStatusQR);
  const { scmPoint } = useSelector((state: RootState) => state.user);
  const { symbol, tax } = useLocationBase();
  const handleChangeSelect = (name: keyof CheckoutState) => (e: { value: string | null }) => {
    if (e.value) {
      dispatch(handleChangeField({ [name]: e.value }));
      dispatch(saveStore());
    }
  };

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(handleChangeField({ isRemarked: e.target.checked }));
  };
  const totalProductPrice = (totalPrice / (1 + tax)).toFixed(2);
  const taxes = (((totalPrice + shippingFee) / (1 + tax)) * tax).toFixed(2);

  const listPaymentMethod = useMemo(() => {
    if (locationBase === "Thailand") {
      if (status) {
        return [
          { title: t("qr-payment"), value: "QR code" },
          { title: t("credit-debit"), value: "Credit/ Debit Card" },
          { title: t("scm-point"), value: "SCM Point" },
        ];
      }
      return [
        { title: t("credit-debit"), value: "Credit/ Debit Card" },
        { title: t("scm-point"), value: "SCM Point" },
      ];
    }
    return [{ title: t("scm-point"), value: "SCM Point" }];
  }, [locationBase, status, t]);
  return (
    <div>
      <div className="mt-[15px] sm:mt-6">
        <p className="font-medium">{t`payment_method`}</p>
        <Title title={t`payment_method`} isRequired className="mt-3 sm:mt-2" />
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <Select
              options={listPaymentMethod}
              defaultValue={paymentMethod}
              onChange={handleChangeSelect("paymentMethod")}
            />
          </div>
        </div>
        {paymentMethod === "SCM Point" && (
          <div>
            <div className="flex items-center mt-4">
              <span className="text-sm mr-2">{t`your_current`}</span>
              <div className="w-10 h-5 text-xs text-orange bg-opacity-10 bg-orange mr-2 flex justify-center items-center">
                {t`SCMP`}
              </div>
              <span className="text-sm mr-1">
                <NumberFormatCustome value={scmPoint} />
              </span>
              <div className="text-0.375 flex items-start h-5 flex-1">{t`points`}</div>
            </div>
            {scmPoint < totalPrice + shippingFee - couponRedeemAmount && (
              <FormHelperText error>{t`insufficient_scm_point`}</FormHelperText>
            )}
          </div>
        )}
        <Divider className="hidden sm:block mt-6" />
      </div>
      <div className="mt-6">
        <Title title={t`receipt_status`} className="mt-2" />
        <label className="flex items-center mt-1 sm:mt-2.5 mr-9">
          <Checkbox color="primary" checked={isRemarked} onChange={handleChecked} />
          {t`need_a_receipt`}
        </label>
        <Divider className="mt-6" />
      </div>

      <div className="mt-6">
        <p className="font-medium">{t`order_type`}</p>
        <Title title={t`order_type`} className="mt-2" isRequired />
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <Select
              options={optionsOrderType}
              defaultValue={sa_type}
              onChange={handleChangeSelect("sa_type")}
            />
          </div>
        </div>
        <Divider className="mt-6" />
      </div>

      <CouponInput />

      <div className="mt-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3 sm:col-span-2">
            <span>{t`total_product_price`}</span>
          </div>
          <div className="col-span-1 sm:col-span-2">
            <NumberFormatCustome value={totalProductPrice} prefix={symbol} />
          </div>
        </div>

        {shippingType !== "Pickup" && (
          <div className="grid grid-cols-4 gap-4 mt-2">
            <div className="col-span-3 sm:col-span-2">
              <span>{t`shipping_fees`}</span>
            </div>
            <div className="col-span-1 sm:col-span-2 ">
              <NumberFormatCustome value={(shippingFee / (1 + tax)).toFixed(2)} prefix={symbol} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-4 gap-4 mt-2">
          <div className="col-span-3 sm:col-span-2">
            <span>{t`taxes`}</span>
          </div>
          <div className="col-span-1 sm:col-span-2">
            <NumberFormatCustome value={taxes} prefix={symbol} />
          </div>
        </div>
        <Link href="https://scmconnext.com/help-center-3/61b1844b133b46494dc544b3">
          <a target={"_blank"} className="text-0.6875 text-blue mt-2">{t`more_about_taxes`}</a>
        </Link>
        {shippingType !== "Pickup" && (
          <div className="grid grid-cols-4 gap-4 mt-2">
            <div className="col-span-3 sm:col-span-2">
              <span>{t`total_shipping_fees`}</span>
            </div>
            <div className="col-span-1 sm:col-span-2">
              <NumberFormatCustome value={shippingFee.toFixed(2)} prefix={symbol} />
            </div>
          </div>
        )}
        {coupon && (
          <div className="grid grid-cols-4 gap-4 mt-2">
            <div className="col-span-3 sm:col-span-2">
              <span>{t`discount`}</span>
            </div>
            <div className="col-span-1 sm:col-span-2">
              <NumberFormatCustome value={couponRedeemAmount.toFixed(2)} prefix={symbol} />
            </div>
          </div>
        )}
        <Divider className="mt-6" />
      </div>

      <div className="mt-6">
        <div className="flex justify-between sm:grid grid-cols-4 sm:gap-4 mb-2.5">
          <div className="col-span-3 sm:col-span-2">
            <span className="font-medium text-xl">{t`total`}:</span>
          </div>
          <div className="col-span-1 sm:col-span-2">
            <NumberFormatCustome
              className="font-medium text-xl"
              value={(totalPrice + shippingFee - couponRedeemAmount).toFixed(2)}
              prefix={symbol}
            />
          </div>
        </div>
        <Divider className="mt-6" />
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-4 gap-4 mb-2.5">
          <div className="col-span-3 sm:col-span-2">
            <span className="text-brown">{t`total_received_PV`}:</span>
          </div>
          <div className="col-span-1 sm:col-span-2">
            <NumberFormatCustome className="text-brown" value={totalPV} suffix=" PV" />
          </div>
        </div>
        <Divider className="mt-6" />
      </div>
    </div>
  );
}
