import useTranslation from "next-translate/useTranslation";
import { ChangeEvent, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, Title } from "src/components";
import InputBasic from "src/components/input/input-basic";
import InputOnlyNumber from "src/components/input/only-number";
import { handleChangeField } from "src/feature/signup/slice";
import { SignupState } from "src/feature/signup/type";
import { RootState } from "src/state/store";

export default function UploadCard() {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { bankCode, bankBranch, accountName, accountNumber, listBank } = useSelector(
    (state: RootState) => state.signup,
  );

  const newListBank = useMemo(() => {
    return listBank.map((item) => ({
      title: item.name,
      value: item.code,
    }));
  }, [listBank]);

  const handleChangeSelect = ({ value }: { value: string | null }) => {
    if (value) {
      dispatch(handleChangeField({ bankCode: value }));
    }
  };

  const handleChange = (key: keyof SignupState) => (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(handleChangeField({ [key]: e.target.value }));
  };
  return (
    <div>
      <Title title={t`bank-code`} className="mb-1" />
      <Select
        options={newListBank}
        placeholder={t`select-bank-code`}
        defaultValue={bankCode}
        onChange={handleChangeSelect}
      />
      <Title title={t`bank-branch`} className="mt-4 mb-1" />
      <InputBasic
        placeholder={t`bank-branch`}
        value={bankBranch}
        onChange={handleChange("bankBranch")}
      />
      <Title title={t`account-number`} className="mt-4 mb-1" />
      <InputOnlyNumber
        placeholder={t`account-number`}
        value={accountNumber}
        onChange={handleChange("accountNumber")}
      />
      <Title title={t`account-name`} className="mt-4 mb-1" />
      <InputBasic
        placeholder={t`account-name`}
        value={accountName}
        onChange={handleChange("accountName")}
      />
    </div>
  );
}
