import axios from "axios";
import { REPORT_PART } from "@/modules/constant";

export function reportSpecialData({ data }: any) {
  const url = REPORT_PART;
  return axios({
    url,
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data;",
    },
  });
}
