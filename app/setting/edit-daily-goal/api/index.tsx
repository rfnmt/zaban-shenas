import axios from "axios";

import { INITIAL_DATA, SETTING } from "@/modules/constant";

export function settingDailyGoal(data: any) {
  const url = SETTING;
  return axios.post(url, data);
}

export function getInitialData(data: any) {
  const url = INITIAL_DATA;
  return axios.post(url, data);
}
