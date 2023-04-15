import { useTranslation } from "react-i18next";

import { PreviewType } from "./types";
import { SponsorCard } from "src/components";
import { phoneNumberFormatter } from "src/lib/format";
import { AddressModel } from "src/types/address.model";

export default function Preview({
  email,
  dateOfBirth,
  gender,
  role,
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


      </div>

    </div>
  );
}
