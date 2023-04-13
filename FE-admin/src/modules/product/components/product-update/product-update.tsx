import { FormEvent, Fragment, MouseEvent, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SelectLanguage2 } from "src/components/select-language2/index";
import { Button, CollapsibleBlock, EditorDescription, Modal } from "src/components";
import { NavbarProductUpdate } from "../navbar-product-update/navbar-product-update";
import { Media, MediaObject } from "../product-update/types";
import { Radio } from "src/components/radio";
import { RootState } from "src/store";
import { getParams } from "src/store/router-params.slice";
import { UploadPreviewMedia } from "./upload-preview-media";
import { uploadImageFull } from "src/services/upload-image.services";
import { updateProductService } from "src/services/inventory-management.service";
import { notifyToast } from "src/constants/toast";
import { routeInventoryManagementProductListBase } from "src/constants/routes";
import { ImageError } from "src/components/image-error/image-error";
import { get, orderBy } from "lodash";
import "./styles.css";
import { DescriptionType, ProductModel } from "src/types/inventory-management.model";
import { IconPlay } from "src/components/icons";
import { getProductDetailAction } from "src/store/inventory-management.action";

interface ProductUpdateProps {}

type ParamsType = {
  id: string;
  locationBase: string;
};

interface PreviewProductInformationProps {
  productDetail: ProductModel;
}

function PreviewProductInformation({ productDetail, ...props }: PreviewProductInformationProps) {
  const { t } = useTranslation("common");
  const { media } = productDetail;

  const hasOnlyVideo = (product: ProductModel) => {
    return !media.find(({ fileType }) => fileType !== "VIDEO") && media.length >= 1;
  };
  const hasImage = (product: ProductModel) => {
    const count = media.find(({ fileType }) => fileType === "IMAGE");
    if (count?.fileType) {
      return true;
    }
    return false;
  };
  const onlyVideo = hasOnlyVideo(productDetail);
  const countImage = hasImage(productDetail);
  const image = media.filter(({ fileType }) => fileType !== "VIDEO");
  const imageData = orderBy(image, ["position"], ["asc"]);

  return (
    <div className="relative flex product-name">
      {countImage && !onlyVideo ? (
        <img alt="err" className="image" src={imageData[0].urlPreSign} />
      ) : null}
      {onlyVideo && !countImage ? (
        <Fragment>
          <video
            src={get(productDetail, "media[0].urlPreSign")}
            controls={false}
            className=""
            style={{
              width: "85px",
              height: "85px",
              objectFit: "fill",
            }}
            playsInline
          />
          <IconPlay className="absolute iconPlay" width={"30px"} height={"30px"} />
        </Fragment>
      ) : null}
      {!countImage && !onlyVideo ? <ImageError /> : null}
      <div className="float-left flex">
        <label>
          <p className="txt-sku">
            <span>
              {t`sku`}
              {":"}&nbsp;
            </span>
            {productDetail.productCode}
          </p>
          <p className="txt-name">{productDetail.productName}</p>
        </label>
      </div>
    </div>
  );
}

function PreviewNewProduct({ ...props }) {
  const { t } = useTranslation("common");
  const { status, setStatus } = props;

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setStatus(event.currentTarget.value);
  };
  return (
    <div {...props}>
      <div className="pl-1 pb-8">
        <label>
          <span className="text-base txt-style-medium">{t`display-new-product-status`}</span>
          <span className="text-orange-light ml-0.5">*</span>
        </label>
        <div className="radio-group">
          <div className="float-left flex justify-between items-center ">
            <Radio
              checked={status === "1"}
              onChange={handleChange}
              value={"1"}
              name="radio-button-demo"
            />
            <label>
              <span>{t`yes`}</span>
            </label>
          </div>
          <div className="float-left flex justify-between items-center pl-12">
            <Radio
              checked={status === "0"}
              onChange={handleChange}
              value={"0"}
              name="radio-button-demo"
            />
            <label>
              <span>{t`no`}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductUpdate({ ...props }: ProductUpdateProps) {
  const { t } = useTranslation("common");

  const [status, setStatus] = useState<string>("0");
  const [description, setDescription] = useState<DescriptionType>({
    en: "",
    th: "",
  });
  const [oldMedias, setOldMedias] = useState<Array<Media>>([]);
  const [newMedias, setNewMedias] = useState<Array<MediaObject>>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [country, setCountry] = useState<string>("English");

  const { id, locationBase } = useParams<ParamsType>();
  const history = useHistory();
  const dispatch = useDispatch();

  const { productDetail } = useSelector((state: RootState) => state.inventoryManagements);

  useEffect(() => {
    dispatch(getParams(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (id && locationBase) {
      dispatch(getProductDetailAction({ countryCode: locationBase, id }));
    }
  }, [dispatch, id, locationBase]);

  useEffect(() => {
    if (productDetail?.media) {
      const oldMedias = productDetail?.media.map((item) => ({ _id: uuidv4(), ...item }));
      setOldMedias(oldMedias);
    }
    if (productDetail.description.en || productDetail.description.th) {
      setDescription({ en: productDetail.description.en, th: productDetail.description.th });
    }
    setStatus(productDetail.isNewProduct ? "1" : "0");
  }, [productDetail]);

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const oMedias = oldMedias.map(({ url, fileType, position }) => ({
      url,
      fileType,
      position,
    }));
    const banners = newMedias.map(({ file }) => uploadImageFull({ file, moduleName: "product" }));
    const keys = await Promise.all(banners);
    const nMedias = newMedias.map(({ fileType, position }, index) => ({
      url: keys[index],
      fileType,
      position,
    }));
    const media = [...oMedias, ...nMedias];

    const bodyPayload = {
      isNewProduct: status === "1",
      description,
      media,
    };
    try {
      const response = await updateProductService(productDetail, bodyPayload);
      setIsLoading(false);
      if (!response?.statusCode) {
        history.push(routeInventoryManagementProductListBase);
      }
    } catch (e) {
      setIsLoading(false);
      notifyToast("error", "error", t);
    }
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleConfirm = () => {
    history.push(routeInventoryManagementProductListBase);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const onChangeValue = (value: string) => {
    if (country === "Thai") {
      setDescription({ ...description, th: value });
    }
    if (country === "English") {
      setDescription({ ...description, en: value });
    }
  };

  const editorMemo = useMemo(
    () => (
      <EditorDescription
        configs={{
          limitChars: Infinity,
          askBeforePasteHTML: false,
          askBeforePasteFromWord: false,
        }}
        description={country === "English" ? description.en : description.th}
        onBlurEditor={onChangeValue}
      />
    ),
    [country, description.en, description.th],
  );

  return (
    <div className="w-full" {...props}>
      <div className="p-5 update-product">
        <div className="w-full pt-3">
          <NavbarProductUpdate url="/admin-dashboard/inventory-management/product-list" />
        </div>

        <div className="product-information w-full">
          <CollapsibleBlock heading={t`product-information`}>
            <PreviewProductInformation productDetail={productDetail} />
          </CollapsibleBlock>
        </div>

        <div className="product-image-video w-full">
          <CollapsibleBlock heading={t`product-image-video`}>
            <UploadPreviewMedia
              oldsMedias={oldMedias}
              setOldMedias={setOldMedias}
              newMedias={newMedias}
              setNewMedias={setNewMedias}
            />
          </CollapsibleBlock>
        </div>

        <div className="new-product-status">
          <CollapsibleBlock heading={t`new-product-status`}>
            <PreviewNewProduct status={status} setStatus={setStatus} />
          </CollapsibleBlock>
        </div>

        <div className="product-description">
          <CollapsibleBlock heading={t`product-description`}>
            <div className="select-language">
              <SelectLanguage2 setCountry={setCountry} />
            </div>
            <div className="description">{editorMemo}</div>
          </CollapsibleBlock>
        </div>

        <div className="button-group">
          <Button
            className="button bg-orange-light rounded-md hover:bg-orange-hover"
            loading={isLoading}
            loadingSize={20}
            onClick={handleSubmit}
          >
            <span className="text-white font-semibold text-base">{t`submit`}</span>
          </Button>
          <Button
            className="button bg-white rounded-md hover:bg-orange-hover button-cancel"
            loadingSize={20}
            onClick={openModal}
          >
            <span className="text-orange-light font-semibold text-base">{t`cancel`}</span>
          </Button>
        </div>
      </div>
      <Modal
        open={isOpenModal}
        confirmType={"cancel"}
        onClose={closeModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
