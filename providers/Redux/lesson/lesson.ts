"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface LessonState {
  userRecentLesson: number | null;
  sessionIdsBelongLesson: number[] | [];
}

const initialState: LessonState = {
  userRecentLesson: null,
  sessionIdsBelongLesson: [],
};

export const LessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    updateUserRecentLesson: (state, action) => {
      state.userRecentLesson = action.payload;
    },
    updateSessionIdsBelongLesson: (state, action) => {
      state.sessionIdsBelongLesson = action.payload;
    },
  },
});

export const { updateUserRecentLesson, updateSessionIdsBelongLesson } =
  LessonSlice.actions;

export default LessonSlice.reducer;
