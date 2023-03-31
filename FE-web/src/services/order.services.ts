import axios from "src/lib/client/request";

export function checkProduct(id: string) {
  return axios.post(`/orders/check-active-products-inside-order/${id}`);
}
export function deleteOrder(id: string) {
  return axios.delete(`/orders/delete-order-has-product-not-found/${id}`);
}
export function deleteOrderToPay(id: string) {
  return axios.delete(`/orders/delete-order-to-pay/${id}`);
}

export function getOrderDetail(id: string) {
  return axios.get(`/orders/${id}`);
}
