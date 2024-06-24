import axios from "axios";

import {
  SIGNIN_GOOGLE_API,
  SIGNUP_OTP_API,
  VERIFY_OTP_API,
} from "@/modules/constant";
import { ISignupOTP, IUseGoogleSignup } from "../signup.interfaces";

export function signinByGoogle({ data, headers }: IUseGoogleSignup) {
  const url = SIGNIN_GOOGLE_API;
  return axios.post(url, data, { headers });
}

export function signupByOTP(data: ISignupOTP) {
  const url = SIGNUP_OTP_API;
  return axios.post(url, data);
}

export function verifyOTP(data: any) {
  const url = VERIFY_OTP_API;
  return axios.post(url, data);
}
