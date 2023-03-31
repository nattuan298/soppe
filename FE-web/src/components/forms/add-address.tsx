import useTranslation from "next-translate/useTranslation";
import { Select, Title } from "src/components";
import InputBasic from "../input/input-basic";
import InputOnlyNumber from "../input/only-number";
import TextArea from "../input/text-area";
import SelectCountry from "../select/country";
import SelectPhoneCode from "../select/phone_code";

export default function AddAddress() {
  const { t } = useTranslation("common");
  return (
    <div>
      <div className="grid-cols-2 grid gap-8">
        <div className="col-span-1">
          <Title title={t`first-name`} isRequired />
          <InputBasic
            placeholder={t`first-name`}
            // value={firstName}
            // onChange={handleChange("firstName")}
          />
        </div>
        <div className="col-span-1">
          <Title title={t`last-name`} isRequired />
          <InputBasic
            placeholder={t`last-name`}
            // value={firstName}
            // onChange={handleChange("firstName")}
          />
        </div>
      </div>
      <div className="grid-cols-2 grid gap-8 mt-4">
        <div className="col-span-1">
          <Title title={t`phone-number`} isRequired />
          <SelectPhoneCode
            // phoneCode={phoneCode}
            // phoneNumber={phoneNumber}
            // handleChangePhoneCode={handleChangePhoneCode}
            // handleChangePhoneNumber={handleChangePhoneNumber}
            placeholderInput={t`phone-number`}
            // phoneNumberError={errors.phoneNumber}
          />
        </div>
        <div className="col-span-1">
          <Title title={t`country`} isRequired />
          <SelectCountry />
        </div>
      </div>

      <div className="grid-cols-2 grid gap-8 mt-4">
        <div className="col-span-1">
          <Title title={t`postal-code`} isRequired />
          <InputOnlyNumber
            placeholder={t`postal-code`}
            // value={postalCode}
            // onChange={handleChange}
          />
        </div>
        <div className="col-span-1">
          <Title title={t("province") + " / " + t("city")} isRequired />
          <Select
            options={[]}
            placeholder={t("province") + " / " + t("city")}
            // defaultValue={city.id}
            // onChange={handleChangeSelect("city")}
          />
        </div>
      </div>

      <div className="grid-cols-2 grid gap-8 mt-4">
        <div className="col-span-1">
          <Title
            title={t`district`}
            isRequired
            // isRequired={!(listDistrict?.length === 0)}
          />
          <Select
            options={[]}
            placeholder={t`district`}
            // defaultValue={district.id}
            // onChange={handleChangeSelect("district")}
            // disableClick={listDistrict?.length === 0}
          />
        </div>
        <div className="col-span-1">
          <Title
            title={t`sub-district`}
            // isRequired={!(litSubDistrict?.length === 0)}
          />
          <Select
            options={[]}
            // defaultValue={subDistrict.id}
            placeholder={t`sub-district`}
            // onChange={handleChangeSelect("subDistrict")}
            // disableClick={litSubDistrict?.length === 0}
          />
        </div>
      </div>
      <div className="mt-4">
        <Title title={t`address`} isRequired />
        <TextArea placeholder={t`address`} />
        {/* {loadingAddress && (
          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
            <CircularProgress />
          </div>
        )} */}
      </div>
    </div>
  );
}
