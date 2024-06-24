import { NEXT_PUBLIC_API_URL } from "@/env";

export const SIGNUP_OTP_API = `${NEXT_PUBLIC_API_URL}/auth/otp`;

export const SIGNIN_GOOGLE_API = `${NEXT_PUBLIC_API_URL}/auth/signinGoogle`;

export const VERIFY_OTP_API = `${NEXT_PUBLIC_API_URL}/auth/registration`;
// auth
export const SYNC_API = `${NEXT_PUBLIC_API_URL}/sync`;
// setting
export const SETTING = `${NEXT_PUBLIC_API_URL}/student/setting`;

//
export const INITIAL_DATA = `${NEXT_PUBLIC_API_URL}/initial-data`;

// index page
// export const INDEX_HEADER_API = `${NEXT_PUBLIC_API_URL}`

//profile
export const PROFILE_API = `${NEXT_PUBLIC_API_URL}/profile`;

//profile upload avatar
export const PROFILE_UPLOAD_AVATAR_API = `${NEXT_PUBLIC_API_URL}/profile/uploadAvatar`;
export const PROFILE_DELETE_AVATAR_API = `${NEXT_PUBLIC_API_URL}/profile/uploadAvatar`;

export const GET_COURSE_ALL_DATA_API = (id: number) =>
  `${NEXT_PUBLIC_API_URL}/data?lesson=*&session=*&course=${id}`;

export const GET_ALL_COURSES_API = `${NEXT_PUBLIC_API_URL}/data?course=*`;
// store
export const SHOP = `${NEXT_PUBLIC_API_URL}/shop`;

// purchase
export const PURCHASE = `${NEXT_PUBLIC_API_URL}/purchase`;

// checkout
export const CHECKOUT = `${NEXT_PUBLIC_API_URL}/checkout`;

// student API
export const STUDENT = (userID: number) =>
  `${NEXT_PUBLIC_API_URL}/student?uid=${userID}`;

export const TRANSIENT_CONSUMPTION_API = (id: number) =>
  `${NEXT_PUBLIC_API_URL}/transientConsumption?purchasable=${id}`;

// setting introduce to friends
export const INTRODUCE_TO_FRIENDS = (page = 1, page_size = 25) =>
  `${NEXT_PUBLIC_API_URL}/affiliate/list?page=${page}&page_size=${page_size}`;

// export const GET_SESSION_DATA = (id) =>
//   NEXT_PUBLIC_API_URL + "/data?session=" + id;

// Tip Api's
export const GET_TIP_DATA = (id: number) =>
  NEXT_PUBLIC_API_URL + "/data?tip=" + id;

// Question Api's
export const GET_QUESTION_DATA = (id: number) =>
  NEXT_PUBLIC_API_URL + "/data?question=" + id;

export const REPORT_PART = `${NEXT_PUBLIC_API_URL}/report`;

export const GET_SESSION_DATA = (id: number) =>
  NEXT_PUBLIC_API_URL + "/data?content=*&session=" + id;

export const GET_FRIEND_SUGGESTIONS = (page: number, page_size: number) =>
  NEXT_PUBLIC_API_URL +
  `/student/friendSuggestions?page=${page}&page_size=${page_size}`;

export const PUT_RELATIONSHIPS = () =>
  `${NEXT_PUBLIC_API_URL}/student/relationships`;
export const REMOVE_FRIEND_FROM_FRIEND_SUGGESTION_LIST = () =>
  `${NEXT_PUBLIC_API_URL}/student/friendSuggestions/dismiss`;

export const SEARCH_FRIENDS = (
  userName: string,
  page: number,
  page_size: number
) =>
  `${NEXT_PUBLIC_API_URL}/student/search?query=${userName}&page=${page}&page_size=${page_size}`;

export const USER_FOLLOWINGS_FOLLOWERS = (
  uid: number,
  type: string,
  userName: string,
  page: number,
  page_size: number
) =>
  `${NEXT_PUBLIC_API_URL}/student/relationships?uid=${uid}&type=${type}&query=${userName}&page=${page}&page_size=${page_size}`;

export const BADGES = () => `${NEXT_PUBLIC_API_URL}/student/badges`;

export const PUST_ENERGY_CONSUMPTION = `${NEXT_PUBLIC_API_URL}/energyConsumption`;

export const CLAIM_REWARD = `${NEXT_PUBLIC_API_URL}/student/claimReward`;

export const STUDENT_FEED = `${NEXT_PUBLIC_API_URL}/studentFeed?type=conversations`;

export const GET_ONBOARDING = `${NEXT_PUBLIC_API_URL}/onboarding`;

export const POST_VOCAB_EXAMINATION = `${NEXT_PUBLIC_API_URL}/vocabExamination`;

export const SEND_ANSWER_ONBOARDING = `${NEXT_PUBLIC_API_URL}/onboarding/sendAnswer`;

export const DAILY_CHALLENGE = `${NEXT_PUBLIC_API_URL}/student/challenges`;
