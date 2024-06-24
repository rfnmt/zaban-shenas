import axios from "axios";

import { STUDENT_FEED } from "@/modules/constant";

export async function getStudentFeed({ signal }) {
  const url = STUDENT_FEED;
  return axios.get(url, { signal });
}
