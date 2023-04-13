import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { Input, Radio } from "src/components";
import { SelectCountry2 } from "src/components/select-country-2";

interface Props {
  formik: any;
  status: string;
  location: string;
  disableCountry: boolean;
  setStatus: (value: string) => void;
  handleChangeLocation: (value: string) => void;
}

export function InformationTemplatePage({
  formik,
  status,
  location,
  disableCountry,
  setStatus,
  handleChangeLocation,
}: Props) {
  const { t } = useTranslation("common");

  const handleChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setStatus(value);
  };

  return (
    <div className="w-full">
      <div className="w-6/12">
        <label className="block">
          <span className="block mt-2 text-sm text-black required">{t`template-name`}</span>
          <Input
            name="name"
            className="h-12 w-full mt-1"
            type="text"
            placeholder={t`template-name`}
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
        <label className="block w-7/12">
          <span className="block mt-2 text-sm text-black required">{t`location-base`}</span>
          <SelectCountry2
            country={location}
            onSelect={handleChangeLocation}
            className="w-full mt-1"
            disabled={disableCountry}
          />
        </label>
      </div>
      <div className="w-6/12 flex mt-2">
        <label className="block w-5/12">
          <span className="block mt-2 text-sm text-black required">{t`default-status`}</span>
          <div className="radio-group">
            <div className="float-left flex justify-between items-center text-sm">
              <Radio
                checked={status === "Active"}
                onChange={handleChangeStatus}
                value={"Active"}
                name="radio-button-demo"
              />
              <label>
                <span>{t`yes`}</span>
              </label>
            </div>
            <div className="float-left flex justify-between items-center pl-12 text-sm">
              <Radio
                checked={status === "Inactive"}
                onChange={handleChangeStatus}
                value={"Inactive"}
                name="radio-button-demo"
              />
              <label>
                <span>{t`no`}</span>
              </label>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
