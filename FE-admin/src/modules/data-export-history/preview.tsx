import { useTranslation } from "react-i18next";

import { PreviewType } from "./type";
import { RoleChip } from "src/components";

export default function Preview({
  lastModified,
  dateOfBirth,
  gender,
  citizenship,
  twoFaStatus,
  roles,
}: PreviewType) {
  const { t } = useTranslation("common");
  return (
    <div className="preview w-2/3 my-7.5">
      <div className="info flex mb-7.5">
        <div className="w-1/5">
          <p className="info-label text-sm">{t("last-modified")}</p>
          <p className="text-sm">{lastModified}</p>
        </div>
        <div className="w-1/5">
          <p className="info-label">{t("date-of-birth")}</p>
          <p className="text-sm">{dateOfBirth}</p>
        </div>
        <div className="w-1/5">
          <p className="info-label">{t("gender")}</p>
          <p className="text-sm">{gender}</p>
        </div>
        <div className="w-1/5">
          <p className="info-label">{t("citizenship")}</p>
          <p className="text-sm">{citizenship}</p>
        </div>
        <div className="w-1/5">
          <p className="info-label">{t("2fa-status")}s</p>
          <p className="text-sm">{twoFaStatus}</p>
        </div>
      </div>
      <div className="roles">
        <p className="info-label">{t("role")}</p>
        <div className="flex">
          {roles.map((role) => (
            <RoleChip className="mr-5" key={role._id} id={role._id} name={role.name} />
          ))}
        </div>
      </div>
    </div>
  );
}
