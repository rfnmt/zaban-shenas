import axios from "axios";

import { GET_ALL_COURSES_API } from "@/modules/constant";

export async function getAllCoursesData({ signal }) {
  const url = GET_ALL_COURSES_API;
  return axios.get(url, { signal });
}
