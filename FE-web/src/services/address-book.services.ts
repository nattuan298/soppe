import { AddressModel } from "src/feature/address-book/type";
import axios from "src/lib/client/request";

export function getProvinceAPI(country: string | undefined): Promise<void> {
  return axios.get(`/provinces/find-by-country/?country=${country}`);
}
export function getDistrictAPI(id: string | undefined): Promise<void> {
  return axios.get(`/districts/get-by-province/${id}`);
}
export function getSubDistrictAPI(id: string | undefined): Promise<void> {
  return axios.get(`/sub-districts/get-by-district/${id}`);
}
export function createAddress(body: AddressModel) {
  return axios.post("/address-books", { ...body });
}
export function updateAddress(id: string | undefined | string[], body: AddressModel) {
  return axios.patch(`/address-books/${id}`, { ...body });
}
export function deleteAddress(id: string | undefined | string[]) {
  return axios.delete(`/address-books/${id}`);
}
