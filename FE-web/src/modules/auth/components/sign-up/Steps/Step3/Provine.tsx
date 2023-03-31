import useTranslation from "next-translate/useTranslation";
import { ChangeEvent, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, Title } from "src/components";
import TextArea from "src/components/input/text-area";
import { handleChangeField } from "src/feature/signup/slice";
import { ItemArraySelect } from "src/feature/signup/type";
import { fetchGetDistrict, fetchGetSubDistrict } from "src/feature/signup/action";
import { RootState } from "src/state/store";
import { CircularProgress } from "@material-ui/core";

export const convertDataBuCountry = ({
  data,
  lang,
  country,
}: {
  data: Array<ItemArraySelect>;
  lang: string;
  country: string;
}) => {
  if (lang === "th" && country === "Thailand") {
    return data.map((item) => ({
      title: item.name,
      value: item._id,
    }));
  }

  return data.map((item) => ({
    title: item.nameEng,
    value: item._id,
  }));
};

export default function ProvinePage() {
  const { t, lang } = useTranslation("common");
  const dispatch = useDispatch();
  const {
    city,
    district,
    subDistrict,
    address,
    listCity,
    listDistrict,
    litSubDistrict,
    country,
    loadingAddress,
  } = useSelector((state: RootState) => state.signup);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(handleChangeField({ address: e.target.value }));
  };

  const newListCity = useMemo(() => {
    return convertDataBuCountry({ data: listCity, lang, country });
  }, [listCity, lang, country]);

  const newListDistrict = useMemo(() => {
    if (listDistrict) {
      return convertDataBuCountry({ data: listDistrict, lang, country });
    }
    return [];
  }, [listDistrict, lang, country]);

  const newListSubDistrict = useMemo(() => {
    if (litSubDistrict) {
      return convertDataBuCountry({ data: litSubDistrict, lang, country });
    }
    return [];
  }, [litSubDistrict, lang, country]);

  const handleChangeSelect =
    (name: "city" | "district" | "subDistrict") => (e: { value: string | null; title: string }) => {
      const { value, title } = e;
      if (value) {
        const selectedItem = { id: value, title, titleEng: "" };
        if (name === "city") {
          const { name, nameEng } = listCity.find(({ _id }) => _id === value) || {
            name: "",
            nameEng: "",
          };
          selectedItem.title = name;
          selectedItem.titleEng = nameEng;
          dispatch(fetchGetDistrict(value));
        }
        if (name === "district") {
          const { name, nameEng } = listDistrict?.find(({ _id }) => _id === value) || {
            name: "",
            nameEng: "",
          };
          selectedItem.title = name;
          selectedItem.titleEng = nameEng;
          dispatch(fetchGetSubDistrict(value));
        }
        if (name === "subDistrict") {
          const { name, nameEng } = litSubDistrict?.find(({ _id }) => _id === value) || {
            name: "",
            nameEng: "",
          };
          selectedItem.title = name;
          selectedItem.titleEng = nameEng;
        }
        dispatch(handleChangeField({ [name]: selectedItem }));
      }
    };

  return (
    <div>
      <Title title={t("province") + " / " + t("city")} isRequired className="mb-1" />
      <Select
        options={newListCity}
        placeholder={t("province") + " / " + t("city")}
        defaultValue={city.id}
        onChange={handleChangeSelect("city")}
      />
      <Title title={t`district`} className="mt-4 mb-1" isRequired={!(listDistrict?.length === 0)} />
      <Select
        options={newListDistrict}
        placeholder={t`district`}
        defaultValue={district.id}
        onChange={handleChangeSelect("district")}
        disableClick={listDistrict?.length === 0}
      />
      <Title
        title={t`sub-district`}
        className="mt-4 mb-1"
        isRequired={!(litSubDistrict?.length === 0)}
      />
      <Select
        options={newListSubDistrict}
        defaultValue={subDistrict.id}
        placeholder={t`sub-district`}
        onChange={handleChangeSelect("subDistrict")}
        disableClick={litSubDistrict?.length === 0}
      />
      <Title title={t`address`} className="mt-4 mb-1" isRequired />
      <TextArea placeholder={t`address`} value={address} onChange={handleChange} />
      {loadingAddress && (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
