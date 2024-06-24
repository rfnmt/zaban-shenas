import axios from "axios";

import { GET_ONBOARDING, SEND_ANSWER_ONBOARDING } from "@/modules/constant";

export function getOnboardingData() {
  const url = GET_ONBOARDING;
  return axios.get(url);
}

export function onboardingSendAnswer(data: any) {
  const url = SEND_ANSWER_ONBOARDING;
  return axios.post(url, data);
}
