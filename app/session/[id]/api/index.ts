import axios from "axios";

import { GET_SESSION_DATA } from "@/modules/constant";

export async function getSessionData({ id, signal }: any) {
  const url = GET_SESSION_DATA(id);
  return axios.get(url, { signal });
}
