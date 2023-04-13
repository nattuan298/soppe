import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook";
import { getCategoryAction } from "src/store/category.ation";
import { CategoryModel } from "src/types/category.model";

export type CouponPreviewProps = {
  categories: CategoryModel[];
  description: string;
};

export function CouponPreview({ categories, description }: CouponPreviewProps) {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const { categoryData } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategoryAction());
  }, []);
  return (
    <div className="text-base">
      <div className="font-semibold">{`${t("applicable_products_categories")} (${
        categories.length
      }/${categoryData.length})`}</div>
      <div className="space-y-2 flex py-4 flex-wrap">
        {categories.map((cate) => (
          <div
            key={cate._id}
            className="w-max px-10 py-2 bg-black text-white text-base rounded-full mt-2 mr-5"
          >
            {cate.categoryName}
          </div>
        ))}
      </div>

      <div className="font-semibold">{t("coupon-term-conditions")}</div>
      <div
        className="py-3 break-words font-medium"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
