import useTranslation from "next-translate/useTranslation";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, Title } from "src/components";
import { handleChangeField } from "src/feature/signup/slice";
import { SignupState } from "src/feature/signup/type";
import { RootState } from "src/state/store";

export default function PaymentMethod() {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { paymentMethod } = useSelector((state: RootState) => state.signup);
  const options = useMemo(
    () => [
      { title: t("qr-payment"), value: "QR code" },
      { title: t("credit_debit"), value: "Credit/ Debit Card" },
    ],
    [t],
  );
  const handleChangeSelect = (name: keyof SignupState) => (e: { value: string | null }) => {
    if (e.value) {
      dispatch(handleChangeField({ [name]: e.value }));
    }
  };

  return (
    <div className="mt-6 sm:mb-6">
      <span className="text-lg font-medium">{t`payment_method`}</span>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 mt-2">
        <div className="col-span-1">
          <Title title={t`payment_method`} isRequired className=" mb-1" />

          <Select
            options={options}
            defaultValue={paymentMethod}
            onChange={handleChangeSelect("paymentMethod")}
          />
        </div>
      </div>
    </div>
  );
}
