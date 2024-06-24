import axios from "axios";

import { SHOP, STUDENT } from "@/modules/constant";

export function settingStore() {
  const url = SHOP;
  return axios.post(url);
}

export function studentAPI(id: number) {
  const url = STUDENT(id);
  return axios.post(url);
}
