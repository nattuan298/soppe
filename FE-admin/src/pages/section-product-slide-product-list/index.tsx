import { Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { ProductSlideProducts } from "src/modules/product-slide";
import { Button, GoBack } from "src/components";
import { clearSelectBanner } from "src/store/internal-banners.slice";
import { resetProductList } from "src/store/inventory-management.slice";
import { routeSectionProductSlideList } from "src/constants/routes";

interface ParamsType {
  id: string;
}

export default function SectionProductSlideList() {
  const { t } = useTranslation("common");
  const { id } = useParams<ParamsType>();

  const dispatch = useDispatch();
  const history = useHistory();

  const page = sessionStorage.getItem("product-slide-list");
  const url = useMemo(() => {
    if (!page) {
      return routeSectionProductSlideList;
    }
    return `${routeSectionProductSlideList}?page=${page}`;
  }, [page]);

  const handleCreateNewProduct = () => {
    dispatch(resetProductList());
    dispatch(clearSelectBanner());
    history.push(
      `/admin-dashboard/appearance-management/section-product-slide-management/slide-list/product-list/add-new-product/${id}`,
    );
  };

  return (
    <Fragment>
      <div className="w-97/100 m-auto">
        <GoBack className="flex justify-between" url={url}>
          <Button
            variant="text"
            className="bg-orange-light text-white w-72 h-12 hover:bg-orange-hover"
            onClick={handleCreateNewProduct}
          >
            {t`add-new-product`}
          </Button>
        </GoBack>
      </div>
      <ProductSlideProducts />
    </Fragment>
  );
}
