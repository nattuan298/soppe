import useTranslation from "next-translate/useTranslation";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, Select, Title } from "src/components";
import { CheckBoxWithText } from "src/components/checkbox/with-text";
import InputBasic from "src/components/input/input-basic";
import { ListPreFix } from "src/constants/signup";
import { handleChangeField } from "src/feature/signup/slice";
import { SignupState } from "src/feature/signup/type";
import { RootState } from "src/state/store";
import SelectCountry from "src/components/select/country";
import { CountryPhoneCodeType } from "src/constants/country_phone_code";

export default function Step2() {
  const { t } = useTranslation("common");
  const { prefixName, firstName, lastName, birth, gender, citizenship } = useSelector(
    (state: RootState) => state.signup,
  );
  const dispatch = useDispatch();

  const handleChange = (name: keyof SignupState) => (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(handleChangeField({ [name]: e.target.value }));
  };

  const handleChangeSelect = (name: keyof SignupState) => (e: { value: string | null }) => {
    if (e.value) {
      dispatch(handleChangeField({ [name]: e.value }));
    }
  };

  const handleChangeDate = (value: Date) => {
    dispatch(handleChangeField({ birth: value.toString() }));
  };

  const handleClickCheckbox =
    (key: keyof SignupState) => (params: { checked: boolean; name?: string }) => {
      const { name, checked } = params;
      if (gender !== name && checked) {
        dispatch(handleChangeField({ [key]: name }));
      }
    };

  const handleSelect = ({ citizenship }: CountryPhoneCodeType) => {
    dispatch(handleChangeField({ citizenship }));
  };

  return (
    <div>
      <Title title={t`first-name`} isRequired />
      <div className="flex">
        <Select
          options={ListPreFix}
          defaultValue={prefixName}
          selectClassName="bg-lighterGray p-3"
          onChange={handleChangeSelect("prefixName")}
          className="mr-4"
          trans={t}
        />
        <InputBasic
          placeholder={t`first-name`}
          value={firstName}
          onChange={handleChange("firstName")}
        />
      </div>
      <Title title={t`last-name`} isRequired className="mt-4 mb-1" />
      <InputBasic placeholder={t`last-name`} value={lastName} onChange={handleChange("lastName")} />
      <Title title={t`date_of_birth`} className="mt-4 mb-1" isRequired />
      <DatePicker defaultDate={new Date(birth)} onChange={handleChangeDate} maxDate={new Date()} />
      <Title title={t`citizenship`} className="mt-4 mb-1" isRequired />
      <SelectCountry selectCitizenship country={citizenship} onSelect={handleSelect} />
      <Title title={t`gender`} className="mt-4 mb-1" isRequired />
      <div className="flex items-center">
        <CheckBoxWithText
          text={t`male`}
          checked={gender === "Male"}
          className="mr-8"
          name="Male"
          onChange={handleClickCheckbox("gender")}
        />
        <CheckBoxWithText
          text={t`female`}
          checked={gender === "Female"}
          name="Female"
          onChange={handleClickCheckbox("gender")}
        />
      </div>
    </div>
  );
}
