import useTranslation from "next-translate/useTranslation";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Title, UploadZone } from "src/components";
import InputBasic from "src/components/input/input-basic";
import OnlyNumber from "src/components/input/only-number";
import { FieldUrlType } from "src/constants/app";
import { actionSetErrors, handleChangeField } from "src/feature/signup/slice";
import { RootState } from "src/state/store";
const reg = /^$|^[0-9a-z]+$/;

export default function UploadCard() {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { idCardNumber, citizenship, errors, idCartPhoto, beneficiaryPhoto } = useSelector(
    (state: RootState) => state.signup,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length > 20) {
      return;
    }

    if (isThailand) {
      return dispatch(handleChangeField({ idCardNumber: value }));
    }

    if (reg.test(value.toLowerCase())) {
      return dispatch(handleChangeField({ idCardNumber: value }));
    }
  };

  const handleChangeImage = (name: string) => (data: FieldUrlType) => {
    dispatch(handleChangeField({ [name]: data }));
  };

  const handleErrors = (name: string) => (message: string) => {
    dispatch(actionSetErrors({ [name]: message }));
  };

  const isThailand = citizenship === "Thai";

  return (
    <div>
      <Title
        title={isThailand ? t`id-card-number` : t`passport_number`}
        isRequired
        className="mb-1"
      />
      {isThailand && (
        <OnlyNumber
          placeholder={t`id-card-number`}
          value={idCardNumber}
          onChange={handleChange}
          helperText={errors.idCardNumber}
        />
      )}
      {!isThailand && (
        <InputBasic
          placeholder={t`passport_number`}
          value={idCardNumber}
          onChange={handleChange}
          helperText={errors.idCardNumber}
        />
      )}

      <Title title={isThailand ? t`id-card-photo` : t`passport_photo`} className="mt-4" />
      <UploadZone
        onChange={handleChangeImage("idCartPhoto")}
        onError={handleErrors("idCartPhoto")}
        errorMessage={errors["idCartPhoto"]}
        url={idCartPhoto.url}
      />
      <Title
        title={isThailand ? t`beneficiary-person-id-card-photo` : t`beneficiary_passport_photo`}
        className="mt-4"
      />
      <UploadZone
        onChange={handleChangeImage("beneficiaryPhoto")}
        onError={handleErrors("beneficiaryPhoto")}
        errorMessage={errors["beneficiaryPhoto"]}
        url={beneficiaryPhoto.url}
      />
    </div>
  );
}
