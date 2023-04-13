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
        title: t("to_pay"),
        value: "To Pay",
      },
      {
        title: t("to_ship"),
        value: "To Ship",
      },
      {
        title: t("to_receive"),
        value: "To Receive",
      },
      {
        title: t("to_review"),
        value: "To Review",
      },
      {
        title: t("cancel/refund"),
        value: "Cancel-Refund",
      },
      {
        title: t("complete"),
        value: "Complete",
      },
      {
        title: t("pending"),
        value: "Pending",
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
        title: t("scm_point"),
        value: "SCM Point",
      },
      {
        title: t("qr_code"),
        value: "QR code",
      },
    ]);
  }, [localStorage.getItem("i18nextLng")]);

  return paymentMethodOptions;
}
