import { call, put } from "redux-saga/effects";
import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { ApiListModel } from "src/types/api-list.model";
import { MaxPriceLocation, ParamsMaxPrice } from "src/types/max-price.model";
import { setMaxPrice } from "./max-price.slice";
export const FETCH_MAC_PRICE = "FETCH_MAC_PRICE";
// get max price
export type FetchMaxPrice = {
  type: string;
  payload: ParamsMaxPrice;
};
const getMaxPrice = async (params: ParamsMaxPrice) => {
  const response = (await authorizedRequest.get(
    `${config.apiBaseUrl}/products/max-price-location/country`,
    {
      params,
    },
  )) as ApiListModel<MaxPriceLocation>;
  return response;
};
export function* watcherMaxPriceAction(action: FetchMaxPrice) {
  try {
    const params = action.payload;
    const response: Promise<any> = yield getMaxPrice(params);
    yield put(setMaxPrice(response));
  } catch (error) {}
}
export const getMaxPriceAction = (payload: ParamsMaxPrice) => ({
  type: FETCH_MAC_PRICE,
  payload,
});
