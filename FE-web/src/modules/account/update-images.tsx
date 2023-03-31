import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { ButtonMui, Title, UploadZone } from "src/components";
import DialogCustome from "src/components/dialog";
import Link from "next/link";
import { apiRoute } from "src/constants/apiRoutes";
import { FieldUrlType, initValueFieldUrl } from "src/constants/app";
import axios from "src/lib/client/request";
import { InterfaceImage } from ".";

type StateType = {
  idCartPhoto: FieldUrlType;
  beneficiaryPhoto: FieldUrlType;
  bankPhoto: FieldUrlType;
  relationshipPhoto: FieldUrlType;
};

type StateErrorType = {
  idCartPhoto: string;
  beneficiaryPhoto: string;
  bankPhoto: string;
  relationshipPhoto: string;
};

const convertName: { [key: string]: string } = {
  ID_CARD_PHOTO: "idCartPhoto",
  PASSPORT_PHOTO: "idCartPhoto",
  BENEFICIARY_ID_CARD_PHOTO: "beneficiaryPhoto",
  BENEFICIARY_PASSPORT_PHOTO: "beneficiaryPhoto",
  BOOK_BANK_PHOTO: "bankPhoto",
  CASH_CARD_PHOTO: "bankPhoto",
  CERTIFICATE_PHOTO: "relationshipPhoto",
};

export default function UpdateImages({
  onCancel,
  images,
  citizenship,
  onSave,
}: {
  onCancel: () => void;
  images: InterfaceImage[];
  citizenship: string;
  onSave: () => void;
}) {
  const { t } = useTranslation("common");
  const [state, setState] = useState<StateType>({
    idCartPhoto: initValueFieldUrl,
    beneficiaryPhoto: initValueFieldUrl,
    bankPhoto: initValueFieldUrl,
    relationshipPhoto: initValueFieldUrl,
  });
  const [errors, setErrors] = useState<StateErrorType>({
    idCartPhoto: "",
    beneficiaryPhoto: "",
    bankPhoto: "",
    relationshipPhoto: "",
  });
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    if (images) {
      setState((preState) => {
        const imagesObject = { ...preState };
        images.forEach((item) => {
          imagesObject[convertName[item.type] as keyof StateType] = {
            key: item.key,
            url: item.url,
          };
        });

        return imagesObject;
      });
    }
  }, [images]);

  const handleSubmit = async () => {
    setLoading(true);

    const body: {
      images: Array<Omit<InterfaceImage, "url">>;
    } = {
      images: [],
    };

    if (state.idCartPhoto.key) {
      body.images.push({
        type: isThai ? "ID_CARD_PHOTO" : "PASSPORT_PHOTO",
        key: state.idCartPhoto.key,
      });
    }
    if (state.beneficiaryPhoto.key) {
      body.images.push({
        type: isThai ? "BENEFICIARY_ID_CARD_PHOTO" : "BENEFICIARY_PASSPORT_PHOTO",
        key: state.beneficiaryPhoto.key,
      });
    }
    if (state.bankPhoto.key) {
      body.images.push({
        type: isThai ? "BOOK_BANK_PHOTO" : "CASH_CARD_PHOTO",
        key: state.bankPhoto.key,
      });
    }
    if (state.relationshipPhoto.key) {
      body.images.push({ type: "CERTIFICATE_PHOTO", key: state.relationshipPhoto.key });
    }

    await axios.put(apiRoute.members.documents, body);
    setLoading(false);
    onSave();
    onCancel();
  };

  const handleChangeImage = (name: string) => (data: { key: string; url: string }) => {
    setState({ ...state, [name]: data });
  };

  const handleErrors = (name: string) => (message: string) => {
    setErrors({ ...errors, [name]: message });
  };

  const handleCancel = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleConfirmModal = () => {
    handleCloseModal();
    onCancel();
  };

  const isThai = citizenship === "Thai";

  return (
    <div className="grid md:grid-cols-5">
      <div className="md:col-span-4">
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-0">
          <div className="col-span-1 row-span-1">
            <Title title={isThai ? t`id-card-photo` : t`passport_photo`} className="capitalize" />
            <UploadZone
              onChange={handleChangeImage("idCartPhoto")}
              onError={handleErrors("idCartPhoto")}
              errorMessage={errors["idCartPhoto"]}
              url={state.idCartPhoto.url}
            />
          </div>

          <div className="col-span-1 row-span-1">
            <Title
              title={isThai ? t`beneficiary-person-id-card-photo` : t`beneficiary_passport_photo`}
            />
            <UploadZone
              onChange={handleChangeImage("beneficiaryPhoto")}
              onError={handleErrors("beneficiaryPhoto")}
              errorMessage={errors["beneficiaryPhoto"]}
              url={state.beneficiaryPhoto.url}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-0 mt-4">
          <div className="col-span-1 row-span-1">
            <Title title={isThai ? t`book_bank_photo` : t`cash_card_photo`} />
            <UploadZone
              onChange={handleChangeImage("bankPhoto")}
              onError={handleErrors("bankPhoto")}
              errorMessage={errors["bankPhoto"]}
              url={state.bankPhoto.url}
            />
          </div>

          {isThai && (
            <div className="col-span-1 row-span-1">
              <Title title={t`marriage_certificate_or_relationship_certificate`} />
              <UploadZone
                onChange={handleChangeImage("relationshipPhoto")}
                onError={handleErrors("relationshipPhoto")}
                errorMessage={errors["relationshipPhoto"]}
                url={state.relationshipPhoto.url}
              />
              <div className="pt-2 text-xs">
                {t`relationship_certificate_can_be_downloaded`}
                <Link href="https://prod-scm-ecommerce-pub.s3.ap-southeast-1.amazonaws.com/Relationship+Certificate+/SCMEP+Relationship+Certificate+TH.pdf">
                  <a target="_blank" className="ml-1 text-orange">{t`here`}</a>
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-0 mt-6">
          <div className="col-span-1 row-span-1" onClick={handleSubmit}>
            <ButtonMui
              textClassName="font-normal"
              showCircle={loading}
              disabled={loading}
            >{t`submit`}</ButtonMui>
          </div>

          <div className="col-span-1 row-span-1">
            <ButtonMui variant="outlined" textClassName="font-normal" onClick={handleCancel}>
              {t`cancel`}
            </ButtonMui>
          </div>
        </div>
      </div>

      <DialogCustome
        open={isOpenModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmModal}
      >
        <div
          className="text-center mb-8 mt-6 text-sm"
          style={{ maxWidth: 211 }}
        >{t`confirm_message_popup`}</div>
      </DialogCustome>
    </div>
  );
}
