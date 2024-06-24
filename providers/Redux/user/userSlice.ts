"use client";

import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

export interface IUserState {
  username: string | null;
  phone: string | null;
  token: string | null;
  email: string | null;
  name: string | null;
  id: number | null;
  profile_pic: string | null;
  discourse_id: number | null;
  is_taken_profile_data: boolean;
  sendUserProfileDataToServer: boolean;
  needOnboarding: boolean;
}

const initialState: IUserState = {
  id:
    typeof window !== "undefined"
      ? Number(localStorage.getItem("id")) || null
      : null,
  username:
    typeof window !== "undefined"
      ? localStorage.getItem("username") || null
      : null,
  phone:
    typeof window !== "undefined"
      ? localStorage.getItem("phone") || null
      : null,
  token: Cookie.get("token") || null,
  email:
    typeof window !== "undefined"
      ? localStorage.getItem("email") || null
      : null,
  name:
    typeof window !== "undefined" ? localStorage.getItem("name") || null : null,
  profile_pic:
    typeof window !== "undefined"
      ? localStorage.getItem("profile_pic") || null
      : null,
  discourse_id:
    typeof window !== "undefined"
      ? Number(localStorage.getItem("discourse_id")) || null
      : null,
  is_taken_profile_data:
    typeof window !== "undefined"
      ? Boolean(localStorage.getItem("is_taken_profile_data")) || false
      : false,
  needOnboarding:
    typeof window !== "undefined"
      ? localStorage.getItem("needOnboarding") === "true"
        ? true
        : false
      : false,
  sendUserProfileDataToServer: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      if (action.payload.id) state.id = action.payload.id;
      if (action.payload.username) state.username = action.payload.username;
      if (action.payload.phone) state.phone = action.payload.phone;
      if (action.payload.token) state.token = action.payload.token;
      if (action.payload.email) state.email = action.payload.email;
      if (action.payload.name) state.name = action.payload.name;
      if (action.payload.discourse_id)
        state.discourse_id = action.payload.discourse_id;
      if (action.payload.profile_pic)
        state.profile_pic = action.payload.profile_pic;
      if (action.payload.needOnboarding)
        state.needOnboarding = action.payload.needOnboarding;
    },
    changeStatueTakenProfileData: (state, action) => {
      state.is_taken_profile_data = action.payload;
    },
    updateNeedOnboarding: (state, action) => {
      state.needOnboarding = action.payload;
    },
    signOut: (state) => {
      state.username = "";
      state.phone = "";
      state.token = "";
      state.email = "";
      state.name = "";
      state.id = null;
      state.profile_pic = "";
      state.discourse_id = null;
      state.needOnboarding = false;
      state.is_taken_profile_data = false;
    },
    updateSendUserProfileDataToServer: (state, action) => {
      state.sendUserProfileDataToServer = action.payload;
    },
  },
});

export const {
  updateUserData,
  changeStatueTakenProfileData,
  signOut,
  updateNeedOnboarding,
  updateSendUserProfileDataToServer,
} = userSlice.actions;

export default userSlice.reducer;
