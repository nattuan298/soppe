import { call, put } from "redux-saga/effects";
import {
  deleteFavoriteFulfilled,
  deleteFavoriteProductReject,
  getFavoriteProductFulfilled,
  getFavoriteProductPending,
  getFavoriteProductReject,
} from "./favorite-product.slice";
import axiosCutome from "src/lib/client/request";
import { apiRoute } from "src/constants/apiRoutes";
import {
  DELETE_FAVORITE_PRODUCT,
  FAVORITE_PRODUCT_GET_DATA,
  deleteFavoriteProductActionProps,
  getFavoriteProductActionProps,
} from "./favorite-product.type";
import { ProductsType } from "types/api-response-type";

export const getFavoriteProduct = async (countryCode: string) => {
  const res = await axiosCutome.get(
    `${apiRoute.favoriteProduct.getFavorites}?countryCode=${countryCode}`,
  );
  return res.data.data;
};

const deleteFavoriteProduct = async (id: string) => {
  const res = await axiosCutome.delete(`${apiRoute.favoriteProduct.getFavorites}/${id}`);
  if (res) {
    return id;
  }
};

export function* favoriteProductAction(action: getFavoriteProductActionProps) {
  try {
    yield put(getFavoriteProductPending());
    const response: ProductsType = yield call(() => getFavoriteProduct(action.payload.countryCode));
    yield put(getFavoriteProductFulfilled(response));
  } catch (error) {
    yield put(getFavoriteProductReject());
  }
}

export function* deletetFavoriteProductAction(action: deleteFavoriteProductActionProps) {
  try {
    const { id } = action.payload;
    if (id) {
      const deleteRes: { id: string } = yield call(() => deleteFavoriteProduct(id));
      yield put(deleteFavoriteFulfilled(deleteRes));
    }
    console.log("delete,", action.payload.id);
  } catch (error) {
    yield put(deleteFavoriteProductReject());
  }
}

export const getFavoriteProductDispacth = (payload: { countryCode: string }) => ({
  type: FAVORITE_PRODUCT_GET_DATA,
  payload,
});

export const deleteFavoriteProductDispatch = (payload: { id?: string }) => ({
  type: DELETE_FAVORITE_PRODUCT,
  payload,
});
