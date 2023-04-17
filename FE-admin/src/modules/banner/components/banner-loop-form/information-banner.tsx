import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input, Select } from "src/components";
import { SelectCountry2 } from "src/components/select-country-2";
import { UploadBanner } from "../banner-add-form/upload-banner";

interface Props {
  status: string;
  formik: any;
  disableStatus: boolean;
  location: string;
  disableCountry: boolean;
  setStatus: (value: string | null) => void;
  handleChangeLocation: (value: string) => void;
}

export function InFormationBanner({
  formik,
  status,
  disableStatus,
  setStatus,
}: Props) {
  const { t } = useTranslation("common");
  const [desktopBanner, setDesktopBanner] = useState<File | null>(null);


  const setNewTabletBanner = (file: File) => {
    console.log(file);
    setDesktopBanner(file);
    formik.setFieldValue("desktopBanner", file);
  };

  return (
    <div className="w-full">
      <div className="w-6/12">
        <label className="block">
          <span className="block mt-2 text-base text-black required">Banner Name</span>
          <Input
            name="name"
            className="h-12 w-full mt-1"
            type="text"
            placeholder="Banner name"
            value={formik.values.name}
            onChange={formik.handleChange}
            errorMessage={
              formik.touched.name && formik.errors.name ? t(formik.errors.name as "to_ship") : ""
            }
            inputProps={{
              maxLength: 2500,
            }}
          />
        </label>
      </div>
      <div className="w-6/12 flex mt-2">
        <label className="block w-5/12">
          <span className="block mt-2 text-base text-black required">{t`status`}</span>
          <Select
            disable={disableStatus}
            className="float-left w-full h-12 rounded-md mt-1"
            options={[
              { title: t("active"), value: "1" },
              { title: t("inactive"), value: "2" },
            ]}
            defaultValue={status}
            onChange={setStatus}
          />
        </label>
      </div>
      <UploadBanner
        BannerName={t("desktop_size_banner")}
        className="mt-10 upload-image"
        setImage={setNewTabletBanner}
        defaultBg={formik.values.desktopBanner}
        formName={"desktopBanner"}
        formik={formik}
      />

    </div>
  );
}
