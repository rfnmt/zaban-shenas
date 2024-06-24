import axios from "axios";
import { CHECKOUT, PURCHASE } from "@/modules/constant";

export function commonApiCheckout(data: any) {
  const url = CHECKOUT;
  return axios.post(url, data);
}
export function commonApiPurchase(data: any) {
  const url = PURCHASE;
  return axios.post(url, data);
}
