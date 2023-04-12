import useTranslation from "next-translate/useTranslation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LeftNavination, Products } from "src/components";
import NoDataIcon from "src/components/svgs/no-data";

import { RootState } from "src/state/store";
import { CircularProgress } from "@material-ui/core";
import { Cookies } from "react-cookie";
import {
  deleteFavoriteProductDispatch,
  getFavoriteProductDispacth,
} from "src/feature/favorite-product/favorite-product.action";

export function FavoriteProduct() {
  const cookie = new Cookies();
  const member = cookie.get("member");
  const [countryCode] = useState<string>(member?.locationBase);
  const [checkLoad, setCheckLoad] = useState<boolean>(false);
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { loading, favoriteProductDetail } = useSelector(
    (state: RootState) => state.favoriteProduct,
  );
  console.log(favoriteProductDetail);
  const getListFavorite = useCallback(() => {
    // dispatch(getFavoriteProduct(countryCode));
    dispatch(getFavoriteProductDispacth({ countryCode }));
  }, [dispatch, countryCode]);

  useEffect(() => {
    getListFavorite();
  }, [getListFavorite]);

  useEffect(() => {
    if (checkLoad) {
      setCheckLoad(false);
    }
  }, [checkLoad]);

  const deleteProduct = (_id: string | undefined) => {
    dispatch(deleteFavoriteProductDispatch({ id: _id }));
    setCheckLoad(true);
  };

  return (
    <div className="mx-auto w-auto sm:w-1216 mb-4 sm:mb-8 ">
      <div className="hidden sm:block float-left w-1/4 mb-8">
        <LeftNavination />
      </div>
      <div className="float-left w-full sm:w-3/4 relative">
        <div className="w-full">
          <label>
            <p className="text-lg font-medium ml-4 sm:ml-0">{t`favorite-product-list`}</p>
          </label>
          <div className="mt-7 px-4 sm:px-0">
            {loading ? (
              <div className="w-full mb-4">
                <div className="w-12 m-auto">
                  <CircularProgress />
                </div>
              </div>
            ) : null}
            <Products
              type="listing"
              products={favoriteProductDetail}
              favorite="favorite"
              deleteProduct={deleteProduct}
            />
            {!loading && favoriteProductDetail.length === 0 ? (
              <div className="w-full">
                <div className="w-48 m-auto text-center mt-4">
                  <NoDataIcon />
                  <p>{t`no_data`}</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
