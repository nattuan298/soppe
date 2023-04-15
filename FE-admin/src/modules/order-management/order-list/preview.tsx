import { useTranslation } from "react-i18next";

import { PreviewType } from "./types";
import { SponsorCard } from "src/components";
import { Address } from "src/types/order.model";
import { phoneNumberFormatter } from "src/lib/format";
import { useMemo } from "react";

export default function Preview({
  shippingAddress,
}: PreviewType) {
  const { t, i18n } = useTranslation("common");

  const { language } = i18n;
  function getAddress(address: Address): string {
    if (address) {
      if (language === "en" || !address.province) {
        return `${address.address}, 
      ${address.subDistrictEng}, 
      ${address.subDistrictEng}, 
      ${address.provinceEng}, 
      ${address.postalCode} ${address.country}`;
      }
      return `${address.address}, 
      ${address.subDistrict}, 
      ${address.district}, 
      ${address.province}, 
      ${address.postalCode} ${address.country}`;
    }
    return "";
  }
  const handleBusinessHour = (businessHours: string): string[] => {
    const resultHour = businessHours.split(",");
    return resultHour;
  };

  return (
    <div className="preview w-full my-7.5">
      <div className="info flex mb-7.5">
        {shippingAddress && (
          <div className="w-1/4 pr-20">
            <p className="info-label text-sm text-purple-primary">{t("shipping-address")}</p>
            <p className="font-light text-purple-primary">
              Receiver: {`${shippingAddress.firstName} ${shippingAddress.lastName}`} (
              { shippingAddress.phoneNumber})
            </p>
            <p className="font-light text-purple-primary">{shippingAddress.address}</p>
          </div>
        )}
        {/* {billingAddress && (
          <div className="w-1/4 pr-20">
            <p className="info-label text-sm text-purple-primary">{t("billing-address")}</p>
            <p className="font-light text-purple-primary">
              Receiver: {buyer.name} (
              {phoneNumberFormatter(billingAddress.phoneCode, billingAddress.phoneNumber)})
            </p>
            <p className="font-light text-purple-primary">{getAddress(billingAddress)}</p>
          </div>
        )} */}

      </div>
    </div>
  );
}
