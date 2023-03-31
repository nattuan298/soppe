import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, Select, Title, UploadZone } from "src/components";
import { CheckBoxWithText } from "src/components/checkbox/with-text";
import InputBasic from "src/components/input/input-basic";
import InputOnlyNumber from "src/components/input/only-number";
import TextArea from "src/components/input/text-area";
import SelectCountry from "src/components/select/country";
import SelectPhoneCode from "src/components/select/phone_code";
import Link from "next/link";
import { ListPreFix, OptionsMemberType } from "src/constants/signup";
import { backToStep } from "src/feature/signup/slice";
import { RootState } from "src/state/store";
import { Sponsor } from "../Step1/Sponsor";
import TitleEditRow from "./title-edit-row";

export default function Step5() {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const {
    email,
    phoneCode,
    phoneNumber,
    memberType,
    prefixName,
    firstName,
    lastName,
    birth,
    gender,
    citizenship,
    address,
    city,
    district,
    subDistrict,
    country,
    idCardNumber,
    idCartPhoto,
    beneficiaryPhoto,
    bankCode,
    listBank,
    bankBranch,
    accountName,
    accountNumber,
    bank_photo,
    relationship_certificate,
    postalCode,
  } = useSelector((state: RootState) => state.signup);

  const router = useRouter();
  const { sponsorId } = router.query;

  const onClickEdit = (mainStep: number, childStep?: number) => () => {
    dispatch(backToStep({ mainStep, childStep }));
  };

  const newListBank = useMemo(() => {
    return listBank.map((item) => ({
      title: item.name,
      value: item.code,
    }));
  }, [listBank]);

  const isThailand = citizenship === "Thai";

  return (
    <div style={{ marginRight: "-8px" }}>
      <div
        className="signup-confirm-container overflow-y-auto"
        style={{ maxHeight: 430, paddingRight: 8 }}
      >
        <TitleEditRow title={t`member-type`} onClick={onClickEdit(0)} isRequired />
        <Select options={OptionsMemberType} defaultValue={memberType} disableClick trans={t} />
        <TitleEditRow
          title={t`phone-number`}
          onClick={onClickEdit(0)}
          className="mt-4"
          isRequired
        />
        <SelectPhoneCode phoneCode={phoneCode} phoneNumber={phoneNumber} disabled />
        <TitleEditRow title={t`email`} onClick={onClickEdit(0)} className="mt-4" />
        <InputBasic type="email" value={email} disabled />

        {sponsorId && (
          <>
            <Title title={t`sponsor-referral-code`} className="mt-4" />
            <Sponsor showVerified />
          </>
        )}

        {/* Step 2 */}
        <TitleEditRow onClick={onClickEdit(1)} title={t`first-name`} isRequired />
        <div className="flex">
          <Select
            options={ListPreFix}
            defaultValue={prefixName}
            selectClassName="bg-lighterGray p-3"
            className="mr-4"
            disableClick
          />
          <InputBasic placeholder={t`first-name`} value={firstName} disabled />
        </div>
        <TitleEditRow
          onClick={onClickEdit(1)}
          title={t`last-name`}
          isRequired
          className="mt-4 mb-1"
        />
        <InputBasic placeholder={t`last-name`} value={lastName} disabled />
        <TitleEditRow
          onClick={onClickEdit(1)}
          title={t`date_of_birth`}
          className="mt-4 mb-1"
          isRequired
        />
        <DatePicker defaultDate={new Date(birth)} disabled />
        <TitleEditRow onClick={onClickEdit(1)} title={t`gender`} className="mt-4 mb-1" isRequired />
        <div className="flex items-center">
          <CheckBoxWithText
            text={gender === "Male" ? t`male` : t`female`}
            checked
            className="mr-8"
          />
        </div>
        <TitleEditRow
          onClick={onClickEdit(1)}
          title={t`citizenship`}
          className="mt-4 mb-1"
          isRequired
        />
        <SelectCountry selectCitizenship country={citizenship} disabled />

        {/* Step 3 */}
        <TitleEditRow
          onClick={onClickEdit(2)}
          title={t`address`}
          className="mt-4 mb-1"
          isRequired
        />
        <TextArea
          placeholder={t`address`}
          value={`${address}, ${subDistrict.title}, ${district.title}, ${city.title} ${postalCode}, ${country}`}
          disabled
        />

        {/* Step 4 */}
        <TitleEditRow
          onClick={onClickEdit(3, 0)}
          title={isThailand ? t`id-card-number` : t`passport_number`}
          isRequired
          className="mt-4 mb-1"
        />
        <InputBasic
          placeholder={isThailand ? t`id-card-number` : t`passport_number`}
          value={idCardNumber}
          disabled
        />
        <TitleEditRow
          onClick={onClickEdit(3, 0)}
          title={isThailand ? t`id-card-photo` : t`passport_photo`}
          className="mt-4"
        />
        <UploadZone url={idCartPhoto.url} disabled />
        <TitleEditRow
          onClick={onClickEdit(3, 0)}
          title={isThailand ? t`beneficiary-person-id-card-photo` : t`beneficiary_passport_photo`}
          className="mt-4 mb-1"
        />
        <UploadZone url={beneficiaryPhoto.url} disabled />
        <TitleEditRow onClick={onClickEdit(3, 1)} title={t`bank-code`} className="mt-4 mb-1" />
        <Select
          options={newListBank}
          placeholder={t`select-bank-code`}
          defaultValue={bankCode}
          disableClick
        />
        <TitleEditRow onClick={onClickEdit(3, 1)} title={t`bank-branch`} className="mt-4 mb-1" />
        <InputBasic placeholder={t`bank-branch`} value={bankBranch} disabled />
        <TitleEditRow onClick={onClickEdit(3, 1)} title={t`account-number`} className="mt-4 mb-1" />
        <InputOnlyNumber placeholder={t`account-number`} value={accountNumber} disabled />
        <TitleEditRow onClick={onClickEdit(3, 1)} title={t`account-name`} className="mt-4 mb-1" />
        <InputBasic placeholder={t`account-name`} value={accountName} disabled />
        <TitleEditRow
          onClick={onClickEdit(3, 2)}
          title={isThailand ? t`book_bank_photo` : t`cash_card_photo`}
          className="mt-4 mb-1"
        />
        <UploadZone url={bank_photo.url} disabled />

        {isThailand && (
          <>
            <TitleEditRow
              onClick={onClickEdit(3, 2)}
              title={t`marriage_certificate_or_relationship_certificate`}
              className="mt-4 mb-1"
            />
            <UploadZone url={relationship_certificate.url} disabled />
            <div className="mt-2 text-xs">
              {t`relationship_certificate_can_be_downloaded`}

              <Link href="https://prod-scm-ecommerce-pub.s3.ap-southeast-1.amazonaws.com/Relationship+Certificate+/SCMEP+Relationship+Certificate+TH.pdf">
                <a target="_blank" className="ml-1 text-orange">{t`here`}</a>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
