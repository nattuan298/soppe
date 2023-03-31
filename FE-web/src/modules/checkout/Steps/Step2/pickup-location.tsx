import { CircularProgress } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "src/components";
import { Select } from "src/components/select/select1";
import SelectCountry from "src/components/select/country";
import { CountryPhoneCodeType } from "src/constants/country_phone_code";
import { handleChangeField } from "src/feature/checkout/thunkAction";
import { fetchCheckoutGetListBranch, fetchCheckoutGetListCity } from "src/feature/checkout/action";
import { CheckoutState, ItemBranch } from "src/feature/checkout/type";
import { convertDataBuCountry } from "src/modules/auth/components/sign-up/Steps/Step3/Provine";
import { RootState } from "src/state/store";
import { phoneNumberFormatter } from "src/lib/format";

export const convertDataByBranch = ({
  data,
  lang,
  country,
}: {
  data: Array<ItemBranch>;
  lang: string;
  country: string;
}) => {
  if (lang === "th" && country === "Thailand") {
    return data.map((item) => ({
      title: `${item.name}, ${item.address}, โทร : ${item.phoneNumbers.join(", ")} ${
        item.businessHours
      }`,
      value: item._id,
    }));
  }

  return data.map((item) => ({
    title: `${item.nameEng}, ${item.addressEng}, Tel :${phoneNumberFormatter(
      item.phoneCode,
      item.phoneNumbers,
    )}, ${item.businessHoursEng}  `,
    value: item._id,
  }));
};

export default function PickupLocation() {
  const { t, lang } = useTranslation("common");
  const dispatch = useDispatch();

  const { country, branch, city, listCity, listBranch, loadingAddressPickup } = useSelector(
    (state: RootState) => state.checkout,
  );

  const newListCity = useMemo(() => {
    return convertDataBuCountry({ data: listCity, lang, country });
  }, [listCity, lang, country]);

  const newListBranch = useMemo(() => {
    return convertDataByBranch({ data: listBranch, lang, country });
  }, [listBranch, lang, country]);

  const handleChangeSelect =
    (name: keyof CheckoutState) => (e: { value: string; title: string }) => {
      if (name === "city") {
        dispatch(fetchCheckoutGetListBranch(e.value));
      }
      dispatch(handleChangeField({ [name]: { id: e.value, title: e.title } }));
    };

  const handleChangeSelectCountry = ({ name }: CountryPhoneCodeType) => {
    dispatch(handleChangeField({ country: name }));
    dispatch(fetchCheckoutGetListCity({ name }));
  };

  return (
    <div className="relative">
      <p className="font-medium">{t`pickup_location`}</p>

      <div className="grid-cols-2 grid gap-4 sm:gap-8 mt-4">
        <div className="col-span-2 sm:col-span-1">
          <Title title={t`country`} isRequired />
          <SelectCountry country={country} onSelect={handleChangeSelectCountry} disabled={true} />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <Title title={t("province")} isRequired />
          <Select
            key={lang}
            options={newListCity}
            placeholder={t("province")}
            defaultValue={city.id}
            onChange={handleChangeSelect("city")}
          />
        </div>
      </div>

      <div className="grid-cols-2 grid gap-8 mt-4">
        <div className="col-span-2">
          <Title title={t`branch`} isRequired />
          <Select
            key={lang}
            options={newListBranch}
            placeholder={t("select_branch")}
            defaultValue={branch.id}
            onChange={handleChangeSelect("branch")}
            showFullHeight
          />
        </div>
      </div>

      {loadingAddressPickup && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
