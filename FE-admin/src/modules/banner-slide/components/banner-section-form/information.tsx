import { useTranslation } from "react-i18next";
import { Input, Select } from "src/components";

interface PropsType {
  status: string;
  formik: any;
  setStatus: (value: string | null) => void;
}

export function InformationBanner({ formik, status, setStatus }: PropsType) {
  const { t } = useTranslation("common");

  return (
    <div className="w-full">
      <div className="w-6/12">
        <label className="block">
          <span className="block mt-2 text-base text-black required">{t`banner-name`}</span>
          <Input
            name="name"
            className="h-12 w-full mt-1"
            type="text"
            placeholder={t`banner-name`}
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
          <span className="block mt-2 text-base text-black">{t("hyperlink")}</span>
          <Input
            name="hyperlink"
            className="h-12 w-full mt-1"
            type="text"
            placeholder={t("hyperlink")}
            value={formik.values.hyperlink}
            onChange={formik.handleChange}
            errorMessage={
              formik.touched.hyperlink && formik.errors.hyperlink
                ? t(formik.errors.hyperlink as "to_ship")
                : ""
            }
          />
        </label>
        <label className="block w-5/12">
          <span className="block mt-2 text-base text-black required">{t("status")}</span>
          <Select
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
    </div>
  );
}
