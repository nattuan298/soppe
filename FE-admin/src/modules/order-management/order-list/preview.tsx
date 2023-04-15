import { useTranslation } from "react-i18next";

import { PreviewType } from "./types";
import { SponsorCard } from "src/components";
import { Address } from "src/types/order.model";
import { phoneNumberFormatter } from "src/lib/format";
import { useMemo } from "react";

export default function Preview({
  buyer,
  shippingAddress,
  billingAddress,
  pickupAddress,
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
        <div className="w-1/4">
          <p className="info-label text-sm text-purple-primary">{t("buyer")}</p>
          <SponsorCard
            sponsorData={{
              sponsorId: buyer.id,
              name: buyer.name,
              avatar: buyer.avatar,
              documentStatus: buyer.documentStatus,
            }}
          />
        </div>
        {shippingAddress && (
          <div className="w-1/4 pr-20">
            <p className="info-label text-sm text-purple-primary">{t("shipping-address")}</p>
            <p className="font-light text-purple-primary">
              Receiver: {buyer.name} (
              {phoneNumberFormatter(shippingAddress.phoneCode, shippingAddress.phoneNumber)})
            </p>
            <p className="font-light text-purple-primary">{getAddress(shippingAddress)}</p>
          </div>
        )}
        {billingAddress && (
          <div className="w-1/4 pr-20">
            <p className="info-label text-sm text-purple-primary">{t("billing-address")}</p>
            <p className="font-light text-purple-primary">
              Receiver: {buyer.name} (
              {phoneNumberFormatter(billingAddress.phoneCode, billingAddress.phoneNumber)})
            </p>
            <p className="font-light text-purple-primary">{getAddress(billingAddress)}</p>
          </div>
        )}
        {pickupAddress && (
          <div className="w-1/4 pr-20">
            <p className="info-label text-sm text-purple-primary">{t("pickup-branch")}</p>
            <p className="font-light text-purple-primary">
              {pickupAddress.country},{" "}
              {language === "en" || !pickupAddress.province
                ? pickupAddress.provinceEng
                : pickupAddress.province}
            </p>
            <p className="font-light text-purple-primary">
              {language === "en" || !pickupAddress.branch
                ? pickupAddress.branchEng
                : pickupAddress.branch}{" "}
              {t("branch")}
            </p>
            <p className="font-light text-purple-primary">
              {language === "en" || !pickupAddress.address
                ? pickupAddress.addressEng
                : pickupAddress.address}
            </p>
            {pickupAddress.phoneNumbers.map((phone) => (
              <p className="font-light text-purple-primary">
                Tel: ({phoneNumberFormatter(pickupAddress.phoneCode, phone)})
              </p>
            ))}
            {pickupAddress &&
              handleBusinessHour(
                language === "en" ? pickupAddress.businessHoursEng : pickupAddress.businessHours,
              ).map((item: string) => <p className="font-light text-purple-primary">{item}</p>)}
          </div>
        )}
      </div>
    </div>
  );
}
