import useTranslation from "next-translate/useTranslation";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { ButtonMui, ButtonMuiLight, LeftNavination } from "src/components";
import InputCustome from "src/components/input/text-area";
import { RatingStar } from "src/components/rating-star";
import { Medias } from "./types";
import styles from "./review-product.module.css";
import { UploadPreviewMedia } from "./upload-preview-media";
import { notifyToast } from "src/constants/toast";
import { uploadImageFull } from "src/services/upload";
import { resetStatusCode } from "src/feature/review-product/review-product.slice";
import { fetchPostProductReview } from "src/feature/review-product/review-product.action";
import { useDispatch, useSelector } from "react-redux";
import { ReviewProductType } from "src/feature/review-product/types";
import { useRouter } from "next/router";
import { ModalUserSummaryInfo } from "src/components/user-summary";
import DialogCustome from "src/components/dialog";
import { routeMyOrderBase } from "src/constants/routes";
import Image from "src/components/image";
import { RootState } from "src/state/store";

export function ReviewProduct() {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const router = useRouter();
  const [starQuality, setStarQuality] = useState<number>(0);
  const [starShipping, setStarShipping] = useState<number>(0);
  const [newMedias, setNewMedias] = useState<Medias[]>([]);
  const [valueDetails, setValueDetails] = useState<string>("");
  const [emptyDetails, setEmptyDetails] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModalCancle, setOpenModalCancle] = useState<boolean>(false);
  const { id, image, name } = router.query;
  const { statusCode } = useSelector((state: RootState) => state.productReviews);
  console.log(id);
  const handleRatingQuality = (rating: number) => {
    setStarQuality(rating);
  };
  const handleRatingShipping = (rating: number) => {
    setStarShipping(rating);
  };

  useEffect(() => {
    if (valueDetails) {
      setEmptyDetails("");
    }
    if (!starQuality) {
      setEmptyDetails("");
    }
  }, [valueDetails, starQuality]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValueDetails(event.target.value);
  };

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [isLoading]);

  useEffect(() => {
    if (statusCode === 201) {
      dispatch(resetStatusCode());
      router.push("/");
    }
  }, [statusCode, router, dispatch]);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!starQuality) {
      notifyToast("error", "the-review-must-be-rated", t);
      setIsLoading(false);
      return;
    }
    if (starQuality && !valueDetails.trim()) {
      setEmptyDetails(t`required_fields`);
      setIsLoading(false);
      return;
    }


    const upload = newMedias.map(({ file }) => uploadImageFull({ file, moduleName: "review" }));
    const keys = await Promise.all(upload);

    const photos: string[] = [];
    newMedias.map((item, index) => {
      photos.push(keys[index].key);
    });

    const bodyPayload: ReviewProductType = {
      productId: typeof id === "string" ? id : "",
      rating: starQuality,
      describe: valueDetails,
      mediaUrl: photos[0],
    };

    try {
      if (starQuality && valueDetails) {
        dispatch(fetchPostProductReview(bodyPayload));
        setIsLoading(false);
      }
    } catch (error) {}
  };

  const handleCloseModal = () => {
    setOpenModalCancle(false);
  };

  const handleConfirmModal = () => {
    handleCloseModal();
    router.push(routeMyOrderBase);
  };

  return (
    <div className="mx-4 sm:mx-auto w-auto sm:w-1216 mt-6 relative">
      <div className="float-left sm:w-1/4 mb-8">
        <LeftNavination />
      </div>
      <div className="hidden sm:block">
        <ModalUserSummaryInfo />
      </div>
      <div className="float-left w-full sm:w-3/4 relative mb-8">
        <div className={styles.product_detail}>
          <Image
            src={image as string | undefined}
            style={{ width: 120, height: 120 }}
            className={`${styles.img}`}
            fileType={"IMAGE"}
          />
          <label>
            <span className={`${styles.txtProduct}`}>{name}</span>
          </label>
        </div>

        <div>
          <label>
            <p className="text-base font-medium">{t`product-quality`}</p>
            <p className="text-sm sm:text-base pt-[10px] sm:pt-4 pb-[7.67px] sm:pb-2">{t`star`}</p>
          </label>
          <RatingStar name={"star-quality"} handleRatingQuality={handleRatingQuality} />
        </div>

        <div className="-mt-4">
          <label>
            <p className="text-sm sm:text-base pb-1.5">{t`product-photo`}</p>
          </label>
          <UploadPreviewMedia newMedias={newMedias} setNewMedias={setNewMedias} />

        </div>

        <div className={`${styles.reviewDetail}`}>
          <label>
            <p className="text-sm sm:text-base mb-1.5">{t`description`}</p>
            <InputCustome
              maxLen={1000}
              placeholder={t`details`}
              value={valueDetails}
              onChange={handleChange}
            />
            {emptyDetails ? <p className={`${styles.errorDetails}`}>{emptyDetails}</p> : null}
          </label>
        </div>

        <div className={`${styles.btnOption} flex flex-col sm:flex-row`}>
          <div className={`${styles.d} flex-1`}>
            <ButtonMui
              className={`${styles.btnSubmit}`}
              onClick={handleSubmit}
              disabled={isLoading}
              showCircle={isLoading}
            >
              {!isLoading ? <p>{t`submit`}</p> : null}
              {/* <p>{t`submit`}</p> */}
            </ButtonMui>
          </div>
          <div className={`${styles.btnCancel} flex-1`}>
            <ButtonMuiLight
              variant="outlined"
              textClassName="font-normal"
              onClick={() => {
                setOpenModalCancle(true);
              }}
            >
              <p>{t`cancel`}</p>
            </ButtonMuiLight>
          </div>
        </div>
        <DialogCustome
          open={openModalCancle}
          handleClose={handleCloseModal}
          handleConfirm={handleConfirmModal}
        >
          <div className="text-center mb-8 mt-6 text-sm">{t`confirm_message_popup`}</div>
        </DialogCustome>
      </div>
    </div>
  );
}
