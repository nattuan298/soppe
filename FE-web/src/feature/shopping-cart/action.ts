import { Cookies } from "react-cookie";
import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";
import { FETCH_LIST_PRODUCT_IN_CART, ProductTypeWithQty } from "./type";
import {
  getListProductInCartFulfilled,
  getListProductInCartPending,
  getListProductInCartRejected,
} from "./slice";
import { put } from "redux-saga/effects";

const getListProductInCart = async () => {
  try {
    const cookies = new Cookies();
    const memberCookies = cookies.get("member");
    const locationBaseDefault = cookies.get("LocationBase");

    if (!memberCookies) {
      return Promise.reject();
    }
    const memberId = memberCookies.memberId;
    const locationBase = memberCookies.locationBase || locationBaseDefault;
    const listProduct = JSON.parse(
      localStorage.getItem(`listProducts_${memberId}`) || "[]",
    ) as ProductTypeWithQty[];
    const listProductCode = listProduct.map((item) => item.productCode);
    if (listProductCode.length === 0) {
      return Promise.reject();
    }
    const query = listProductCode.reduce((total, curr) => total + `&productCode=${curr}`, "");
    const response = await axios.get(
      `${apiRoute.products.getListProduct}?countryCode=${locationBase}${query}`,
    );
    return Promise.resolve(response.data);
  } catch (e) {
    return Promise.reject();
  }
};

export function* watcherFetchPostProductInCart() {
  try {
    yield put(getListProductInCartPending());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: Promise<any> = yield getListProductInCart();
    yield put(getListProductInCartFulfilled(res));
  } catch (error) {
    yield put(getListProductInCartRejected());
  }
}

export const fetchPostProductInCart = () => ({
  type: FETCH_LIST_PRODUCT_IN_CART,
});
