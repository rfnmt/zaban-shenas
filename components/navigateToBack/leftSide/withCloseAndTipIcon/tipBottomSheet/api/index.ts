import axios from "axios";

import { GET_TIP_DATA } from "@/modules/constant";

export async function getTipData({ id, signal }: any) {
  const url = GET_TIP_DATA(id);
  return axios.get(url, { signal });
}
