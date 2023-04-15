import { call, put } from "redux-saga/effects";
import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { ApiListModel } from "src/types/api-list.model";
import { ProductModel } from "src/types/inventory-management.model";
import { ParamInventoryProductModel } from "src/types/params-list-request.model";
import { setLoadingProduct, setProductDetail, setProductList } from "./inventory-management.slice";
import { FETCH_GET_PRODUCT, FETCH_GET_PRODUCT_DETAIL } from "./inventory-management.type";
// get product
export type FetchProduct = {
  type: string;
  payload: ParamInventoryProductModel;
};
const getProduct = async (params: ParamInventoryProductModel) => {
  const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/products`, {
    params,
  })) as ApiListModel<ProductModel>;
  return Promise.resolve(response);
};

export function* watcherProductList(action: FetchProduct) {
  try {
    yield put(setLoadingProduct({ loading: true }));
    const params = action.payload;
    const response: Promise<any> = yield call(() => getProduct(params));
    yield put(setProductList(response));
  } catch (error) {
    yield put(setLoadingProduct({ loading: true }));
  }
}
export const getProductAction = (payload: ParamInventoryProductModel) => ({
  type: FETCH_GET_PRODUCT,
  payload,
});

// get detail product
export type FetchDetailProduct = {
  type: string;
  payload: { id: string; countryCode: string };
};
const getProductDetail = async ({ id, countryCode }: { id: string; countryCode: string }) => {
  const response = await authorizedRequest.get(
    `${config.apiBaseUrl}/admin/products/productCode?countryCode=${countryCode}&productCode=${id}`,
  );

  return Promise.resolve(response);
};
export function* watcherProductDetail(action: FetchDetailProduct) {
  try {
    yield put(setLoadingProduct({ loading: true }));
    const { id, countryCode } = action.payload;
    const response: Promise<any> = yield call(() => getProductDetail({ id, countryCode }));
    yield put(setProductDetail(response));
  } catch (error) {
    yield put(setLoadingProduct({ loading: true }));
  }
}
export const getProductDetailAction = (payload: { id: string; countryCode: string }) => ({
  type: FETCH_GET_PRODUCT_DETAIL,
  payload,
});
