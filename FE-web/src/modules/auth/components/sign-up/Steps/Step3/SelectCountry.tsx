import useTranslation from "next-translate/useTranslation";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "src/components";
import InputOnlyNumber from "src/components/input/only-number";
import SelectCountry from "src/components/select/country";
import { CountryPhoneCodeType } from "src/constants/country_phone_code";
import { handleChangeField } from "src/feature/signup/slice";
import { RootState } from "src/state/store";

export default function SelectCountryPage() {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { country, postalCode } = useSelector((state: RootState) => state.signup);

  const handleSelect = ({ name }: CountryPhoneCodeType) => {
    dispatch(handleChangeField({ country: name }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(handleChangeField({ postalCode: e.target.value }));
  };

  return (
    <div>
      <Title title={t`country`} isRequired className="mb-1" />
      <SelectCountry country={country} onSelect={handleSelect} />
      <Title title={t`postal-code`} isRequired className="mt-4 mb-1" />
      <InputOnlyNumber placeholder={t`postal-code`} value={postalCode} onChange={handleChange} />
    </div>
  );
}
