import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { OptionType } from "src/components/select/index";

export function useStatusOptions() {
  const [statusOption, setStatusOption] = useState<OptionType[]>([
    {
      title: "",
      value: "",
    },
  ]);

  const { t } = useTranslation("common");
  useEffect(() => {
    setStatusOption([
      {
        title: t("waiting_approve"),
        value: "waiting_approve",
      },
      {
        title: t("delivery"),
        value: "delivery",
      },
      {
        title: t("receipted"),
        value: "receipted",
      },
    ]);
  }, [localStorage.getItem("i18nextLng")]);
  return statusOption;
}

export function usePaymentMethodOptions() {
  const { t } = useTranslation("common");
  const [paymentMethodOptions, setPaymentMethodOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    setPaymentMethodOptions([
      {
        title: t("credit/_debit_card"),
        value: "Credit/ Debit Card",
      },
      {
        title: t("qr_code"),
        value: "QR code",
      },
    ]);
  }, [localStorage.getItem("i18nextLng")]);

  return paymentMethodOptions;
}
