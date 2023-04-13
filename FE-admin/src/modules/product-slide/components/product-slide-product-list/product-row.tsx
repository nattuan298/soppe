import { SortableHandle } from "react-sortable-hoc";
import { useTranslation } from "react-i18next";
import MenuIcon from "@material-ui/icons/Menu";
import TableCell from "@material-ui/core/TableCell";

import { RootState } from "src/store";
import { useSelector } from "react-redux";
import { FormatNumber } from "src/lib/format-number";
import { ActionButton, CollapsibleBodyRow, StatusDropdown } from "src/components";
import { ProductSectionModel } from "src/types/internal-product-section-loop.model";
import { ImageError } from "src/components/image-error/image-error";
import StarIcon from "src/components/icons/StarIcon";
import { CategoryModel } from "src/types/category.model";
import { DescriptionType } from "src/types/inventory-management.model";

export interface PreviewProduct {
  categoryCode?: string;
  categoryName?: string;
  description: DescriptionType;
}

interface RowProductType {
  item: ProductSectionModel;
  handleChangeStatus: (data: any, value: string) => void;
  handlecDeleteAction: (data: ProductSectionModel) => void;
}

interface RatingComponentProps {
  countApprovedReviews?: number;
  rating?: number;
}

export const RatingComponent = ({ countApprovedReviews, rating }: RatingComponentProps) => {
  return (
    <div className="">
      <label>
        <StarIcon className="star" />
        <span>{rating || 0}</span>
        <span className="font-light txt-rating">
          {" "}
          (
          <FormatNumber value={countApprovedReviews || 0} />)
        </span>
      </label>
    </div>
  );
};

export const Preview = ({ categoryName, description }: PreviewProduct) => {
  const { t } = useTranslation("common");
  return (
    <div className="preview jodit my-7.5">
      <div>
        <label>
          <p className="text-base font-medium">{t`category`}</p>
        </label>
        <label>
          <p className="text-base mt-2.5 category-name">{categoryName}</p>
        </label>
      </div>
      <div className="mt-5">
        <label>
          <p className="text-base font-medium">{t`description`}</p>
        </label>
        <label>
          <div
            dangerouslySetInnerHTML={
              localStorage.getItem("i18nextLng") === "en"
                ? { __html: description.en }
                : { __html: description.th }
            }
          />
        </label>
      </div>
    </div>
  );
};

const DragHandle = SortableHandle(() => <MenuIcon />);

export function ProductRow({ item, handleChangeStatus, handlecDeleteAction }: RowProductType) {
  const {
    categoryId,
    description,
    productCode,
    statusProSec,
    media = [],
    productName,
    personalPrice,
    memberPrice,
    pv,
  } = item;
  const { categoryData } = useSelector((state: RootState) => state.categories);
  const [firstChar, ...restChar] = statusProSec;
  const defaultStatus = firstChar + restChar.join("").toLocaleLowerCase();
  const [imageUrl] = media.filter(({ fileType }) => fileType !== "VIDEO");
  const { categoryName } =
    categoryData.find((item: CategoryModel) => item.categoryId === categoryId) || {};
  const { t } = useTranslation("common");

  return (
    <CollapsibleBodyRow
      colSpan={11}
      key={productCode}
      preview={<Preview categoryName={categoryName} description={description} />}
    >
      <TableCell>
        <div className="flex">
          <div className="w-16 flex items-center justify-center min-w-16 mr-4 -ml-6 pl-0.5">
            <DragHandle />
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
        <RatingComponent />
      </TableCell>
      <TableCell align="center">
        <StatusDropdown
          data={item}
          statusOptions={["active", "inactive"]}
          defaultValue={defaultStatus.toLowerCase()}
          onChange={handleChangeStatus}
          trans={t}
        />
      </TableCell>
      <TableCell align="center">
        <div className="flex action-buttons-wrapper justify-evenly">
          <ActionButton action="delete" onClick={() => handlecDeleteAction(item)} />
        </div>
      </TableCell>
    </CollapsibleBodyRow>
  );
}
