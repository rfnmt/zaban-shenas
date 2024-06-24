import axios from "axios";
import { INTRODUCE_TO_FRIENDS } from "@/modules/constant";

export async function getIntroduceingToFriends() {
  const url = INTRODUCE_TO_FRIENDS();
  return axios.get(url);
}
