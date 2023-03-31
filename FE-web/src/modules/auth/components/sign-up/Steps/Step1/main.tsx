import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/state/store";
import { Select, Title } from "src/components";
import InputBasic from "src/components/input/input-basic";
import SelectPhoneCode from "src/components/select/phone_code";
import { Sponsor } from "./Sponsor";
import { handleChangeField } from "src/feature/signup/slice";
import { SignupState } from "src/feature/signup/type";
import { OptionsMemberType } from "src/constants/signup";
import { useRouter } from "next/router";
import DialogCustome from "src/components/dialog";

export default function Main() {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const router = useRouter();
  const { sponsorId } = router.query;
  const [showModal, setShowModal] = useState(false);

  const { email, phoneCode, phoneNumber, memberType, errors } = useSelector(
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
    if (phoneCode !== "66") {
      setShowModal(true);
    } else {
      dispatch(handleChangeField({ phoneCode }));
    }
  };

  const handleChangeMemberType = ({ value }: { value: string | null }) => {
    if (value) {
      dispatch(handleChangeField({ memberType: value }));
      dispatch(handleChangeField({ coupon: "" }));
      dispatch(handleChangeField({ couponDraft: "" }));
      dispatch(handleChangeField({ couponRedeemAmount: 0 }));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {sponsorId && (
        <>
          <Title title={t`sponsor-referral-code`} />
          <Sponsor />
        </>
      )}

      <Title title={t`member-type`} className="mb-1" />
      <Select
        options={OptionsMemberType}
        defaultValue={memberType}
        onChange={handleChangeMemberType}
        className="mb-4 w-full"
        trans={t}
      />
      <div className="mb-4">
        <Title title={t`phone-number`} className="mb-1" isRequired />
        <SelectPhoneCode
          phoneCode={phoneCode}
          phoneNumber={phoneNumber}
          handleChangePhoneCode={handleChangePhoneCode}
          handleChangePhoneNumber={handleChangePhoneNumber}
          placeholderInput={t`phone-number`}
          phoneNumberError={errors.phoneNumber}
          noChangePhoneCode
        />
      </div>
      <Title title={t`email`} className="mb-1" />
      <InputBasic
        placeholder={t`email`}
        value={email}
        onChange={handleChange("email")}
        helperText={errors.email}
        t={t}
      />

      {showModal && (
        <DialogCustome open={showModal} handleConfirm={handleCloseModal} buttonConfirmTite={t`ok`}>
          <div className="text-center mb-8 mt-6 text-sm">{t`only_in_thailand`}</div>
        </DialogCustome>
      )}
    </div>
  );
}
