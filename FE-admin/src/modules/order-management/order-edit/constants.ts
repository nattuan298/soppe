import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export const statusOptions = [
  {
    title: "To Pay",
    value: "To Pay",
  },
  {
    title: "To Ship",
    value: "To Ship",
  },
  {
    title: "To Receive",
    value: "To Receive",
  },
  {
    title: "To Review",
    value: "To Review",
  },
  {
    title: "Complete",
    value: "Complete",
  },
];

type OptionType = {
  title: string;
  value: string | number | boolean;
};

export const useStatusOptions = () => {
  const { t } = useTranslation("common");
  const [statusOptions, setStatusOptions] = useState<OptionType[]>([]);
  useEffect(() => {
    setStatusOptions([
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
        title: t("complete"),
        value: "Complete",
      },
    ]);
  }, [t]);
  return statusOptions;
};
