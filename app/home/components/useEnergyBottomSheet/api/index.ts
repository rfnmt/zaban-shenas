import axios from "axios";

import { PUST_ENERGY_CONSUMPTION } from "@/modules/constant";

export function postEnergyConsumption({
  amount,
  purchasable,
}: {
  amount: number;
  purchasable: number;
}) {
  const url = PUST_ENERGY_CONSUMPTION;
  return axios.post(url, { amount, purchasable });
}
