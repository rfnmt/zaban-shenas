"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface IStreakStates {
  mostShowStreakPage: boolean;
}

const initialState: IStreakStates = {
  mostShowStreakPage:
    typeof window !== "undefined"
      ? localStorage.getItem("mostShowStreakPage") === "true"
        ? true
        : false
      : false,
};

export const StreakInHomeSlice = createSlice({
  name: "freemuimBoardHome",
  initialState,
  reducers: {
    updateMostShowStreakPage: (state, action) => {
      localStorage.setItem("mostShowStreakPage", String(action.payload));
      state.mostShowStreakPage = action.payload;
    },
    resetStreak: () => initialState,
  },
});

export const { updateMostShowStreakPage } = StreakInHomeSlice.actions;

export default StreakInHomeSlice.reducer;
