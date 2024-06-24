import axios from "axios";

import {
  DAILY_CHALLENGE,
  GET_COURSE_ALL_DATA_API,
  SYNC_API,
} from "@/modules/constant";
import { ISyncSchema } from "@/providers/Dexie/sync.interface";
import { SHOP } from "@/modules/constant";

export async function getSyncData(data: ISyncSchema) {
  const url = SYNC_API;
  return axios.post(url, data);
}

export function settingStore() {
  const url = SHOP;
  return axios.post(url);
}

export function getUserCurrentCourseAllData(id: number) {
  const url = GET_COURSE_ALL_DATA_API(id);
  return axios.get(url);
}

export function dailyChallenge() {
  const url = DAILY_CHALLENGE;
  return axios.post(url);
}
