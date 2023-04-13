import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";

import { RootState } from "src/store";
import { useSelector } from "react-redux";
import { FormatNumber } from "src/lib/format-number";
import { CollapsibleBodyRow } from "src/components";
import { ProductModel } from "src/types/inventory-management.model";
import { ImageError } from "src/components/image-error/image-error";
import { Preview, RatingComponent } from "../product-slide-product-list/product-row";
import { CategoryModel } from "src/types/category.model";

interface RowProductType {
  item: ProductModel;
  checked: boolean;
  handleChangeSectionAction: (data: ProductModel) => void;
}

export function ProductRow({ item, checked, handleChangeSectionAction }: RowProductType) {
  const {
    categoryId,
    description,
    productCode,
    media = [],
    productName,
    personalPrice,
    memberPrice,
    pv,
    countApprovedReviews,
    rating,
  } = item;

  const [imageUrl] = media.filter(({ fileType }) => fileType !== "VIDEO");
  const handleSectionAction = () => {
    handleChangeSectionAction(item);
  };
  const { categoryData } = useSelector((state: RootState) => state.categories);
  const { categoryName } =
    categoryData.find((item: CategoryModel) => item.categoryId === categoryId) || {};

  return (
    <CollapsibleBodyRow
      colSpan={11}
      key={productCode}
      preview={<Preview categoryName={categoryName} description={description} />}
    >
      <TableCell>
        <div className="flex">
          <div className="w-16 flex items-center justify-center min-w-16 mr-4">
            <Checkbox
              className="checkbox-product"
              checked={checked}
              onChange={handleSectionAction}
            />
          </div>
          <div className="flex product-name">
            <div className="float-left product">
              {imageUrl ? (
                <img alt="err" className="image" src={imageUrl.urlPreSign} />
              ) : (
                <ImageError />
              )}
            </div>
            <div className="float-left flex justify-between items-center">
              <label>
                <p className="txt-name">{productName}</p>
              </label>
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>{productCode}</TableCell>
      <TableCell>{<FormatNumber value={personalPrice} />}</TableCell>
      <TableCell>{<FormatNumber value={memberPrice} />}</TableCell>
      <TableCell>{<FormatNumber value={pv} />}</TableCell>
      <TableCell>
        <RatingComponent countApprovedReviews={countApprovedReviews} rating={rating} />
      </TableCell>
    </CollapsibleBodyRow>
  );
}
