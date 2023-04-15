import { useTranslation } from "react-i18next";
import { Input, Select } from "src/components";
import { SelectCountry2 } from "src/components/select-country-2";

interface Props {
  status: string;
  formik: any;
  location: string;
  disableCountry: boolean;
  disableStatus: boolean;
  setStatus: (value: string | null) => void;
  handleChangeLocation: (value: string) => void;
}

export function InformationProductSlide({
  formik,
  status,
  location,
  disableCountry,
  disableStatus,
  setStatus,
  handleChangeLocation,
}: Props) {
  const { t } = useTranslation("common");

  return (
    <div className="w-full">
      <div className="w-6/12">
        <label className="block">
          <span className="block mt-2 text-sm text-black required">{t`section-product-slide-name`}</span>
          <Input
            name="name"
            className="h-12 w-full mt-1"
            type="text"
            placeholder={t`section-product-slide-name`}
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
      <div className="w-6/12 flex mt-2 gap-5">
        <label className="block w-5/12">
          <span className="block mt-2 text-sm text-black required">{t`status`}</span>
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
        <label className="block w-7/12">
          <span className="block mt-2 text-sm text-black required">{t`location-base`}</span>
          <SelectCountry2
            className="w-full mt-1"
            country={location}
            disabled={disableCountry}
            onSelect={handleChangeLocation}
          />
        </label>
      </div>
    </div>
  );
}
