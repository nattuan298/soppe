import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, CollapsibleBlock, EditorDescription, GoBack, Label, Modal } from "src/components";
import { routeCouponList } from "src/constants/routes";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook";
import { CouponInfomation } from "./coupon-infomation";
import { DiscountInfomation } from "./discount-infomation";
import { RedeemLimitConditions } from "./redeem-limit-conditions";
import { ApplicableCateProduct } from "./applicable-product-category";
import { InputDatePicker2 } from "src/components/date-range-2";
import dayjs from "dayjs";
import { Coupon, CouponChildProps, CouponErorType } from "src/types/coupon.model";
import { DEFAULT_COUPON, DEFAULT_COUPON_ERR, getCouponFormErr, getDateError } from "../constants";
import { CategoryModel } from "src/types/category.model";
import { DeleteIcon } from "src/components/icons";
import clsx from "clsx";
import { notifyToast } from "src/constants/toast";
import {
  addCouponAction,
  deleteCouponAction,
  getDetailAction,
  updateCouponAction,
} from "src/store/coupons.action";
const queryString = require("query-string");

export type CouponFormCProps = {
  type: "Edit" | "Create";
};

export function CouponForm({ type }: CouponFormCProps) {
  const location = useLocation();
  const { couponId } = queryString.parse(location.search);
  const [description, setDescription] = useState("");
  const [modalType, setModalType] = useState<"action" | "delete">("action");
  const [visibleModal, setVisibleModal] = useState(false);
  const history = useHistory();
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const { isAddingCoupon, isUpdatingCoupon, couponDetail } = useAppSelector(
    (state) => state.coupons,
  );

  const [coupon, setCoupon] = useState<Coupon>(DEFAULT_COUPON);

  const [errors, setErrors] = useState<CouponErorType>(DEFAULT_COUPON_ERR);

  const startDateDf = coupon?.redeemStartDate ? dayjs(coupon.redeemStartDate).toDate() : undefined;
  const endDateDf = coupon?.redeemEndDate ? dayjs(coupon.redeemEndDate).toDate() : undefined;

  useEffect(() => {
    if (type === "Edit") dispatch(getDetailAction(couponId));
  }, []);

  useEffect(() => {
    if (type === "Edit") setCoupon(couponDetail);
  }, [JSON.stringify(couponDetail)]);

  function handleRangeDateChange(startDate?: Date, endDate?: Date) {
    setErrors({ ...errors, date: getDateError(t, startDate, endDate) });
    setCoupon({
      ...coupon,
      redeemStartDate: startDate?.toISOString(),
      redeemEndDate: endDate?.toISOString(),
    });
  }

  async function handleSubmit() {
    const productCate = coupon.productCategories as CategoryModel[];
    const payload = {
      ...coupon,
      name: coupon.name.trim(),
      code: coupon.code.trim(),
      description: description || coupon.description,
      productCategories: productCate.map((c) => c._id),
    };

    if (!validateCouponForm()) {
      type === "Create" &&
        dispatch(
          addCouponAction({
            payload,
            onSuccess,
            onError: (err) => onError(err?.message),
          }),
        );

      type === "Edit" &&
        dispatch(
          updateCouponAction({
            payload,
            onSuccess,
            onError: (err) => onError(err?.message),
          }),
        );
    }
    return;
  }

  function handleDeleteCoupon() {
    dispatch(
      deleteCouponAction({
        id: couponId,
        onSuccess,
        onError: (err) => onError(err?.message),
      }),
    );
  }

  function onSuccess() {
    history.push(routeCouponList);
  }

  function onError(messErr?: string) {
    notifyToast("error", messErr || "", t);
  }

  function validateCouponForm() {
    const updatedErr = getCouponFormErr(t, coupon);
    setErrors(updatedErr);
    return Object.keys(updatedErr).some((k) => {
      /* @ts-ignore */
      return updatedErr[k];
    });
  }

  function handleUpdateCouponInfo(couponInfo: Coupon) {
    setCoupon(couponInfo);
  }

  const props: CouponChildProps = {
    coupon,
    onChangeCoupon: handleUpdateCouponInfo,
    couponErr: errors,
    onChangeError: setErrors,
  };
  return (
    <div key={coupon._id} className="p-5">
      <GoBack url={routeCouponList} key={coupon._id} />
      <CouponInfomation type={type} {...props} />
      <CollapsibleBlock className="mb-10 shadow-box" heading={t("coupon-redeem-period")}>
        <div id="date" className="flex flex-col space-y-1 mb-10 w-[20%] ">
          <Label required>{t`coupon-redeem-period`}</Label>
          <InputDatePicker2
            handleSelect={(startDate, endDate) => handleRangeDateChange(startDate, endDate)}
            className="h-12 w-full focus:outline-none focus:ring-orange-light focus:ring-1 rounded pl-4 placeholder-italic"
            placeholder={t("coupon-redeem-period")}
            defaultFrom={startDateDf}
            defaultTo={endDateDf}
            error={t(errors.date as "to_ship")}
            notAllowedUnexpired={true}
          />
        </div>
      </CollapsibleBlock>
      <DiscountInfomation {...props} />
      <RedeemLimitConditions {...props} />
      <ApplicableCateProduct {...props} />

      <CollapsibleBlock
        className="mb-10 shadow-box"
        heading={t("coupon_terms_and_conditions_description")}
      >
        <div className="w-[50%]" id="article-editor">
          <EditorDescription
            description={coupon.description || ""}
            onBlurEditor={(text) => setDescription(text)}
          />
        </div>
      </CollapsibleBlock>
      <div className="space-x-7.5 flex items-center">
        <Button
          className="w-[300px] h-50px bg-orange-light text-white hover:bg-orange-hover"
          variant="text"
          onClick={handleSubmit}
          loading={isAddingCoupon || isUpdatingCoupon}
          loadingSize={15}
          type="submit"
        >
          {t("submit")}
        </Button>
        <Button
          variant="text"
          className="w-[300px] h-50px border border-solid border-orange-light text-orange-light hover:border-orange-hover hover:text-orange-hover"
          onClick={() => {
            setModalType("action");
            setVisibleModal(true);
          }}
        >
          {t("cancel")}
        </Button>
        {type === "Edit" && (
          <Button
            variant="text"
            className={clsx(
              "w-[300px] h-50px border border-solid  hover:opacity-80",
              coupon.isAbleToDelete
                ? "border-red-light text-red-light"
                : "border-gray-primary text-gray-primary",
            )}
            onClick={() => {
              setModalType("delete");
              setVisibleModal(true);
            }}
            disabled={!coupon.isAbleToDelete}
          >
            <div className="flex items-center justify-center">
              <DeleteIcon
                className={clsx(
                  "mr-1 inline fill-current ",
                  coupon.isAbleToDelete ? "text-red-light" : "text-gray-primary",
                )}
              />
              {t("delete")}
            </div>
          </Button>
        )}
      </div>
      <Modal
        open={visibleModal}
        confirmType={modalType}
        onConfirm={() => {
          modalType === "action" && history.push(routeCouponList);
          modalType === "delete" && handleDeleteCoupon();
        }}
        onClose={() => setVisibleModal(false)}
      />
    </div>
  );
}
