"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface ISessionNavogatorState {
  buttonEnable: boolean;
  viewType:
    | "loading"
    | "correct"
    | "incorrect"
    | "verifyNow"
    | "continueAsTip"
    | "continueAsStory"
    | "correctAdditionalInfo"
    | "incorrectAdditionalInfo"
    | "incorrectMoreAdditionalInfo"
    | "incorrectMoveOn"
    | "listeningPostponed"
    | "speakingPostponed"
    | "speakingIncorrect"
    | "ihaveunderstood"
    | "skipVocabExaminationQuestion";
  callback: any;
  storyButtonEnable: boolean;
}

const initialState: ISessionNavogatorState = {
  buttonEnable: false,
  viewType: "verifyNow",
  callback: null,
  storyButtonEnable: false,
};

export const sessionNavigatorSlice = createSlice({
  name: "sessionNavigator",
  initialState,
  reducers: {
    triggerButtonEnable: (state, action) => {
      state.buttonEnable = action.payload;
    },
    triggerViewType: (state, action) => {
      state.viewType = action.payload;
    },
    triggerStoryButtonEnable: (state, action) => {
      state.storyButtonEnable = action.payload;
    },
    reset: () => initialState,
  },
});

export const {
  triggerViewType,
  triggerButtonEnable,
  triggerStoryButtonEnable,
} = sessionNavigatorSlice.actions;

export default sessionNavigatorSlice.reducer;
