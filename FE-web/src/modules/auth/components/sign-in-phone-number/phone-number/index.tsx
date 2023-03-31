import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Title } from "src/components";
import SelectPhoneCode from "src/components/select/phone_code";
import { handleChangeField } from "src/feature/signin/sign-in-phone-number-slice";
import { fetchPostPhoneNumber } from "src/feature/signin/sign-in.actions";
import { RootState } from "src/state/store";
import useLoggedIn from "src/hooks/useLoggedIn";
import { useRouter } from "next/router";

export function SignInPhoneNumber() {
  const { isLoggedIn } = useLoggedIn();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { phoneNumber, phoneCode, errors } = useSelector(
    (state: RootState) => state.signinPhoneNumber,
  );
  const { t } = useTranslation("common");
  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;

    if (newVal.length <= 15 && phoneNumber !== newVal) {
      dispatch(handleChangeField({ phoneNumber: e.target.value }));
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);
  const handleChangePhoneCode = (phoneCode: string) => {
    dispatch(handleChangeField({ phoneCode }));
  };
  useEffect(() => {
    if (errors) {
      setLoading(false);
    }
  }, [errors]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phoneNumber) {
      setLoading(true);
      dispatch(fetchPostPhoneNumber());
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Title title={t`phone-number`} className="mb-1" />
          <SelectPhoneCode
            phoneCode={phoneCode}
            phoneNumber={phoneNumber}
            handleChangePhoneCode={handleChangePhoneCode}
            handleChangePhoneNumber={handleChangePhoneNumber}
            placeholderInput={t`phone-number`}
            phoneNumberError={errors.phoneNumber}
          />
        </div>
        <div>
          <Button
            type="submit"
            loadingSize={30}
            colorClass="text-white"
            className="bg-orange hover:bg-lighterOrange focus:ring-0 h-12 w-full sm:w-21.5 rounded-md mb-6 text-white font-bold text-base"
            loading={loading}
            disabled={!phoneNumber}
          >
            {t`submit`}
          </Button>
        </div>
      </form>
    </div>
  );
}
