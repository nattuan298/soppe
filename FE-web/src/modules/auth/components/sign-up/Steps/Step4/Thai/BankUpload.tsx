import useTranslation from "next-translate/useTranslation";
import { useDispatch, useSelector } from "react-redux";
import { Title, UploadZone } from "src/components";
import Link from "next/link";
import { actionSetErrors, handleChangeField } from "src/feature/signup/slice";
import { RootState } from "src/state/store";

export default function BankUpload() {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { citizenship, errors, bank_photo, relationship_certificate } = useSelector(
    (state: RootState) => state.signup,
  );

  const handleChangeImage = (name: string) => (data: { key: string; url: string }) => {
    dispatch(handleChangeField({ [name]: data }));
  };

  const handleErrors = (name: string) => (message: string) => {
    dispatch(actionSetErrors({ [name]: message }));
  };

  const isThailand = citizenship === "Thai";
  return (
    <div>
      <Title title={isThailand ? t`book_bank_photo` : t`cash_card_photo`} className="mb-1" />
      <UploadZone
        onChange={handleChangeImage("bank_photo")}
        onError={handleErrors("bank_photo")}
        errorMessage={errors["bank_photo"]}
        url={bank_photo.url}
      />

      {isThailand && (
        <>
          <Title
            title={t`marriage_certificate_or_relationship_certificate`}
            className="mt-4 mb-1"
          />
          <UploadZone
            onChange={handleChangeImage("relationship_certificate")}
            onError={handleErrors("relationship_certificate")}
            errorMessage={errors["relationship_certificate"]}
            url={relationship_certificate.url}
          />
          <div className="mt-2 text-xs">
            {t`relationship_certificate_can_be_downloaded`}

            <Link href="https://prod-scm-ecommerce-pub.s3.ap-southeast-1.amazonaws.com/Relationship+Certificate+/SCMEP+Relationship+Certificate+TH.pdf">
              <a target="_blank" className="ml-1 text-orange">{t`here`}</a>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
