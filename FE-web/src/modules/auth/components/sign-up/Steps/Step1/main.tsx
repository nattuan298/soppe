import useTranslation from "next-translate/useTranslation";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/state/store";
import { ButtonMui, DatePicker, Select, Title, UploadZone } from "src/components";
import InputBasic from "src/components/input/input-basic";
import SelectPhoneCode from "src/components/select/phone_code";
import { Sponsor } from "./Sponsor";
import { handleChangeField } from "src/feature/signup/slice";
import { SignupState } from "src/feature/signup/type";
import { OptionsMemberType } from "src/constants/signup";
import { useRouter } from "next/router";
import DialogCustome from "src/components/dialog";
import { CheckBoxWithText } from "../../../../../../components/checkbox/with-text";
import { fetchSignup } from "../../../../../../feature/signup/action";


export default function Main() {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const router = useRouter();

  const [avatarURL, setAvatarURL] = useState("");
  const { email, phoneNumber, errors, firstName, lastName, birth, gender, avatar, password, userName } = useSelector(
    (state: RootState) => state.signup,
  );
  const handleChange = (name: keyof SignupState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handleChangeField({ [name]: e.target.value.trim() }));
  };

  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value.trim();

    if (newVal.length <= 15 && phoneNumber !== newVal) {
      dispatch(handleChangeField({ phoneNumber: e.target.value }));
    }
  };

  const handleChangePhoneCode = (phoneCode: string) => {
    dispatch(handleChangeField({ phoneCode: "84" }));
  };
  const handleChangeAvatar = (key: string) => {
    dispatch(handleChangeField({ avatar: key }));
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
  const handleSiginup = () => {
    const payload = {
      avatar,
      gender,
      firstName,
      lastName,
      dateOfBirth: new Date(birth).toISOString(),
      password,
      email,
      phoneNumber: `+84${phoneNumber}`,
      username: userName,
    };
    dispatch(fetchSignup(payload));
  };
  const isDisable = useMemo(() => {
    return !gender || !firstName || !userName || !password || !lastName || !phoneNumber || !email || !birth;
  }, [birth, email, firstName, gender, lastName, password, phoneNumber, userName]);
  return (
    <div>
      <div className="px-3 max-h-[500px] overflow-y-auto ">
        <Title title="avatar" className="capitalize" />
        <UploadZone
          onChange={(data: { key: string; url: string }) => {
            setAvatarURL(data.url);
            handleChangeAvatar(data.key);
          }}
          // errorMessage={errors["idCartPhoto"]}
          url={avatarURL}
        />
        <Title title="User name" className="mb-1" isRequired/>
        <InputBasic
          placeholder="User name"
          value={userName}
          onChange={handleChange("userName")}
          helperText={errors.firstName}
          t={t}
        />
        <Title title="First name" className="mb-1" isRequired/>
        <InputBasic
          placeholder="First name"
          value={firstName}
          onChange={handleChange("firstName")}
          helperText={errors.firstName}
          t={t}
        />
        <Title title="Last name" className="mb-1" isRequired/>
        <InputBasic
          placeholder="Last name"
          value={lastName}
          onChange={handleChange("lastName")}
          helperText={errors.LastName}
          t={t}
        />
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
        <Title title={t`date_of_birth`} className="mt-4 mb-1" isRequired />
        <DatePicker defaultDate={new Date(birth)} onChange={handleChangeDate} maxDate={new Date()} />
        <Title title={t`email`} className="mb-1" isRequired/>
        <InputBasic
          placeholder={t`email`}
          value={email}
          onChange={handleChange("email")}
          helperText={errors.email}
          t={t}
        />
        <Title title={t`phone-number`} className="mb-1" isRequired/>
        <SelectPhoneCode
          phoneCode={"84"}
          phoneNumber={phoneNumber}
          handleChangePhoneCode={handleChangePhoneCode}
          handleChangePhoneNumber={handleChangePhoneNumber}
          placeholderInput={t`phone-number`}
          phoneNumberError={errors.phoneNumber}
          noChangePhoneCode
        />

        <Title title={t`password`} className="mb-1" isRequired/>
        <InputBasic
          placeholder={t`password`}
          value={password}
          onChange={handleChange("password")}
          helperText={errors.email}
          t={t}
        />
        <Title title='Confirm password' className="mb-1" />
        <InputBasic
          placeholder='Confirm password'
          value={password}
          onChange={handleChange("email")}
          helperText={errors.email}
          t={t}
        />
      </div>
      <div className="mt-8">
        <ButtonMui onClick={handleSiginup} disabled={isDisable}>
            Register
        </ButtonMui>
      </div>
      {/* {showModal && (
        <DialogCustome open={showModal} handleConfirm={handleCloseModal} buttonConfirmTite={t`ok`}>
          <div className="text-center mb-8 mt-6 text-sm">{t`only_in_thailand`}</div>
        </DialogCustome>
      )} */}
    </div>
  );
}
