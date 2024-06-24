import axios from "axios";
import {
  GET_FRIEND_SUGGESTIONS,
  PROFILE_API,
  PROFILE_UPLOAD_AVATAR_API,
  PUT_RELATIONSHIPS,
  REMOVE_FRIEND_FROM_FRIEND_SUGGESTION_LIST,
  SEARCH_FRIENDS,
  USER_FOLLOWINGS_FOLLOWERS,
  BADGES,
  SHOP,
  CLAIM_REWARD,
} from "../../../modules/constant";

export function friendSuggestionsApi(page: number, page_size: number) {
  const url = GET_FRIEND_SUGGESTIONS(page, page_size);
  return axios.get(url);
}

export async function putMethodRelationShip(data: any) {
  const url = PUT_RELATIONSHIPS();
  return await axios.put(url, data);
}

export function removeFriendFromFriendSuggestionList(data: any) {
  const url = REMOVE_FRIEND_FROM_FRIEND_SUGGESTION_LIST();
  return axios.put(url, data);
}

export function getMyProfileDataApi(data: any) {
  const url = PROFILE_API;
  return axios.post(url, data);
}

export function profileUploadAvatar(data) {
  const url = PROFILE_UPLOAD_AVATAR_API;
  return axios({
    url,
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data;",
    },
  });
}
export function profileDeleteAvatar() {
  const url = PROFILE_UPLOAD_AVATAR_API;
  return axios({
    url,
    method: "delete",
    headers: {
      "Content-Type": "multipart/form-data;",
    },
  });
}

export function searchFriends(
  userName: string,
  page: number,
  page_size: number
) {
  const url = SEARCH_FRIENDS(userName, page, page_size);
  return axios.get(url);
}

export function userFollowingAndFollowers(
  uid: number,
  type: string,
  userName: string,
  page: number,
  page_size: number
) {
  const url = USER_FOLLOWINGS_FOLLOWERS(uid, type, userName, page, page_size);
  return axios.get(url);
}

export function userBadge(data: any) {
  const url = BADGES();
  return axios.post(url, data);
}

export function giftShop(data: any) {
  const url = SHOP;
  return axios.post(url, data);
}

export function claimReward(data: any) {
  const url = CLAIM_REWARD;
  return axios.post(url, data);
}
