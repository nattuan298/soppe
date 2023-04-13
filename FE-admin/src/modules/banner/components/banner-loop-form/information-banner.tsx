import { ChangeEvent, KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { Input, Select } from "src/components";
import { SelectCountry2 } from "src/components/select-country-2";

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
  location,
  disableCountry,
  setStatus,
  handleChangeLocation,
}: Props) {
  const { t } = useTranslation("common");

  const onChangeValueDuration = (event: ChangeEvent<HTMLInputElement>) => {
    const { valueAsNumber } = event.target;
    if (isNaN(valueAsNumber)) {
      formik.setFieldValue("totalDuration", "");
    }
    if (valueAsNumber <= 10 && valueAsNumber > 0) {
      formik.setFieldValue("totalDuration", valueAsNumber);
    }
  };

  const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <div className="w-full">
      <div className="w-6/12">
        <label className="block">
          <span className="block mt-2 text-base text-black required">{t`banner-loop-name`}</span>
          <Input
            name="name"
            className="h-12 w-full mt-1"
            type="text"
            placeholder={t`banner-loop-name`}
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
        <label className="block w-7/12 mr-2">
          <span className="block mt-2 text-base text-black required">{t`display-duration`}</span>
          <Input
            name="totalDuration"
            className="h-12 w-full mt-1"
            type="number"
            placeholder={t`placeholder-duration`}
            value={formik.values.totalDuration}
            onChange={onChangeValueDuration}
            onKeyPress={onKeyPress}
            errorMessage={
              formik.touched.totalDuration && formik.errors.totalDuration
                ? t(formik.errors.totalDuration as "to_ship")
                : ""
            }
          />
        </label>
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
      <div className="w-6/12 flex mt-2">
        <label className="block w-7/12">
          <span className="block mt-2 text-base text-black required">{t`location-base`}</span>
          <SelectCountry2
            country={location}
            onSelect={handleChangeLocation}
            className="w-full mt-1"
            disabled={disableCountry}
          />
        </label>
      </div>
    </div>
  );
}
