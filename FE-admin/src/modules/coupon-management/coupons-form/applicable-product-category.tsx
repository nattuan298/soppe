import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Autocomplete, CollapsibleBlock, Label, Radio, RoleChip } from "src/components";
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook";
import { CouponChildProps } from "src/types/coupon.model";
import { AutoCompleteOptionType } from "src/components/autocomplete";
import { CategoryModel } from "src/types/category.model";
import { getCateError } from "../constants";
import { getCategoryAction } from "src/store/category.ation";

export function ApplicableCateProduct({
  coupon,
  onChangeCoupon,
  couponErr,
  onChangeError,
}: CouponChildProps) {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const { categoryData } = useAppSelector((state) => state.categories);
  const { isAllProductCategories, productCategories, discountCategory } = coupon;
  const [categoryOptions, setCategoryOptions] = useState<AutoCompleteOptionType[]>([]);
  const [selectedCategoried, setSelectedCategoried] = useState<AutoCompleteOptionType[]>([]);

  useEffect(() => {
    dispatch(getCategoryAction());
  }, []);

  useEffect(() => {
    setCategoryOptions(transferToOptions(categoryData));
  }, [categoryData]);

  useEffect(() => {
    setSelectedCategoried(transferToOptions(productCategories as CategoryModel[]));
  }, [productCategories]);

  function transferToOptions(data: CategoryModel[]) {
    return data.map((cate) => ({
      _id: cate._id,
      name: cate.categoryName,
      categoryName: cate.categoryName,
    }));
  }

  function handleUpdateCate(productCategories: AutoCompleteOptionType[]) {
    setSelectedCategoried(productCategories);
    onChangeCoupon({ ...coupon, productCategories });
  }

  const finalSelectedCate = isAllProductCategories ? categoryOptions : selectedCategoried;
  return (
    <div>
      {discountCategory !== "Subscription Fee" && (
        <CollapsibleBlock className="mb-10 shadow-box" heading={t("applicable_product_category")}>
          <div className="grid grid-cols-1 gap-x-10 gap-y-5 w-[42%]">
            <div className="mt-4">
              <Label required>{t`applicable_product_category`}</Label>
              <div className="radio-group">
                <div className="float-left flex justify-between items-center ">
                  <Radio
                    checked={isAllProductCategories}
                    onChange={() => {
                      onChangeError({ ...couponErr, category: "" });
                      onChangeCoupon({
                        ...coupon,
                        isAllProductCategories: true,
                        productCategories: categoryOptions,
                      });
                    }}
                    name="radio-button-demo"
                  />
                  <label>
                    <span className="text-sm">{t("all-categories")}</span>
                  </label>
                </div>
                <div className="float-left flex justify-between items-center pl-12">
                  <Radio
                    checked={!isAllProductCategories}
                    onChange={() => {
                      onChangeCoupon({
                        ...coupon,
                        isAllProductCategories: false,
                        productCategories: [],
                      });
                    }}
                    value={"0"}
                    name="radio-button-demo"
                  />
                  <label>
                    <span className="text-sm">{t("select-category")}</span>
                  </label>
                </div>
              </div>
            </div>
            <>
              {!isAllProductCategories && (
                <>
                  <Label>{t("search-to-add-category")}</Label>
                  <Autocomplete
                    hiddenSearch={isAllProductCategories}
                    options={categoryOptions}
                    selectedOptions={selectedCategoried}
                    onSelect={(cate) => {
                      onChangeError({ ...couponErr, category: "" });
                      handleUpdateCate([...selectedCategoried, cate]);
                    }}
                    errorMessage={t(couponErr.category as "to_ship")}
                  />
                </>
              )}
            </>
          </div>

          <div className="mt-7 w-[60%] flex flex-wrap">
            {finalSelectedCate.length > 0 &&
              finalSelectedCate.map((cate) => (
                <RoleChip
                  closeable={!isAllProductCategories}
                  className="mr-5"
                  id={cate._id}
                  name={cate.name}
                  onClose={(cateId) => {
                    const cates = selectedCategoried.filter((c) => c._id !== cateId);
                    onChangeError({
                      ...couponErr,
                      category: getCateError(t, cates, discountCategory),
                    });
                    handleUpdateCate(cates);
                  }}
                />
              ))}
          </div>
        </CollapsibleBlock>
      )}
    </div>
  );
}
