import { useTranslation } from "react-i18next";

import { PreviewType } from "./types";
import { SponsorCard } from "src/components";
import { phoneNumberFormatter } from "src/lib/format";
import { AddressModel } from "src/types/address.model";

export default function Preview({
  email,
  dateOfBirth,
  gender,
  citizenship,
  facebookConnect,
  FAStatus,
  shippingAddress,
  billingAddress,
  sponsorData,
}: PreviewType) {
  const { t } = useTranslation("common");
  const lang = localStorage.getItem("i18nextLng");
  function getAddress(address: AddressModel | undefined): string {
    if (address) {
      if (lang === "th") {
        return `${address.address}, 
        ${address.subDistrict}, 
        ${address.district}, 
        ${address.province}, 
        ${address.postalCode} ${address.country}`;
      }
      return `${address.address}, 
      ${address.subDistrictEng}, 
      ${address.districtEng}, 
      ${address.provinceEng}, 
      ${address.postalCode} ${address.country}`;
    }
    return "";
  }

  return (
    <div className="preview w-full my-7.5">
      <div className="info flex mb-7.5">
        <div className="w-1/3">
          <p className="info-label text-base">{t("email")}</p>
          <p>{email}</p>
        </div>
        <div className="w-1/3">
          <p className="info-label text-base">{t("date-of-birth")}</p>
          <p>{dateOfBirth}</p>
        </div>
        <div className="w-1/5">
          <p className="info-label text-base">{t("gender")}</p>
          <p>{t(gender?.toLocaleLowerCase() as "to_ship")}</p>
        </div>
        <div className="w-1/5">
          <p className="info-label text-base">{t("citizenship")}</p>
          <p>{t(citizenship?.toLocaleLowerCase() as "to_ship")}</p>
        </div>
        <div className="w-1/3">
          <p className="info-label text-base">{t("facebook-connection")}</p>
          <p>{facebookConnect}</p>
        </div>
        <div className="w-1/3">
          <p className="info-label text-base">{t("2fa-status")}</p>
          <p>{FAStatus}</p>
        </div>
      </div>
      <div className="info flex mb-7.5">
        {shippingAddress && (
          <div className="w-1/4">
            <p className="info-label text-base">{t("shipping-address")}</p>
            <p>
              {t`receiver`}: {shippingAddress?.firstName} {shippingAddress?.lastName} (
              {phoneNumberFormatter(shippingAddress?.phoneCode, shippingAddress?.phoneNumber)})
            </p>
            <p>{getAddress(shippingAddress)}</p>
          </div>
        )}
        {(shippingAddress || billingAddress) && <div className="w-1/6"></div>}
        {billingAddress && (
          <div className="w-3/9">
            <p className="info-label text-base">{t("billing-address")}</p>
            <p>
              {t`receiver`}: {billingAddress?.firstName} {billingAddress?.lastName} (
              {phoneNumberFormatter(billingAddress?.phoneCode, billingAddress?.phoneNumber)})
            </p>
            <p>{getAddress(billingAddress)}</p>
          </div>
        )}
        {sponsorData && (
          <div className="w-3/9">
            <p className="info-label text-base mb-2.5">{t("sponsor")}</p>
            <SponsorCard sponsorData={sponsorData} />
          </div>
        )}
      </div>
    </div>
  );
}
