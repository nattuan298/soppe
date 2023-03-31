import axios from "src/lib/client/request";

export function changeStatus(status: boolean) {
  return axios.put("/members/notify-status", { notifyStatus: status });
}
