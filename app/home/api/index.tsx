import axios from "axios";

import { PROFILE_API } from "@/modules/constant";
import { GET_COURSE_ALL_DATA_API } from "@/modules/constant";

export async function getProfileData() {
  const url = PROFILE_API;
  return axios.post(url);
}

export async function getCourseLessons(id: number) {
  const url = GET_COURSE_ALL_DATA_API(id);
  return axios.get(url);
}
