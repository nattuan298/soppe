import { put } from "redux-saga/effects";
import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";
import { setDetailAddress, setListAddress, setLoading } from "./address-book.slice";
import { getListAddressScreenAddressFulfilled } from "../checkout/slice";
import { AddressModel, GET_DETAIL_ADDRESS_BOOK, GET_LIST_ADDRESS_BOOK } from "./type";
import { AddressBook } from "../checkout/type";
// get address book
const getListAddress = async () => {
  const response = await axios.get(`${apiRoute.addressBook.listAddress}`);
  return response;
};
export function* watcherListAddress() {
  try {
    yield put(setLoading({ loading: true }));
    const response: { data: Array<AddressBook> } = yield getListAddress();
    yield put(setListAddress(response));
    // yield put(getListAddressScreenAddressFulfilled(response));
  } catch (error) {
    yield put(setLoading({ loading: false }));
  }
}
export const getAddressBookAction = () => ({
  type: GET_LIST_ADDRESS_BOOK,
});

// get detail address book
export type FetchDetailAddressBook = {
  type: string;
  payload: string | string[];
};
const getDetailAddress = async (id: string | string[]) => {
  const response = await axios.get(`${apiRoute.addressBook.listAddress}/${id}`);
  return response.data;
};
export function* watcherDetailAddress(action: FetchDetailAddressBook) {
  try {
    yield put(setLoading({ loading: true }));
    const id = action.payload;
    const response: Promise<AddressModel> = yield getDetailAddress(id);
    yield put(setDetailAddress(response));
  } catch (error) {
    yield put(setLoading({ loading: false }));
  }
}

export const getDetailAddressBook = (payload: string | string[]) => ({
  type: GET_DETAIL_ADDRESS_BOOK,
  payload,
});
