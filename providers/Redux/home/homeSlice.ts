"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface IHomeState {
  proccessSessionStates: "waiting" | "doing" | "done";
  disableSessions: number[];
  unlockedSessionAnimate: boolean;
  passedSessionAnimate: boolean;
  targetPassedSession: number | null;
  targetUnlockedSession: number | null;
  lockedSessionSnackbar: boolean;
}

const initialState: IHomeState = {
  proccessSessionStates: "waiting",
  disableSessions: [],
  unlockedSessionAnimate: false,
  passedSessionAnimate: false,
  targetPassedSession: null,
  targetUnlockedSession: null,
  lockedSessionSnackbar: false,
};

export const homeSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProccessingSessionStates: (state, action) => {
      state.proccessSessionStates = action.payload;
    },
    updateDisableSessions: (state, action) => {
      state.disableSessions = action.payload;
    },
    updateUnlockedSessionAnimate: (state, action) => {
      state.unlockedSessionAnimate = action.payload;
    },
    updatePassedSessionAnimate: (state, action) => {
      state.passedSessionAnimate = action.payload;
    },
    updateTargetPassedSession: (state, action) => {
      state.targetPassedSession = action.payload;
    },
    updateTargetUnlockedSession: (state, action) => {
      state.targetUnlockedSession = action.payload;
    },
    updateLockedSessionSnackbar: (state, action) => {
      state.lockedSessionSnackbar = action.payload;
    },
  },
});

export const {
  updateProccessingSessionStates,
  updateDisableSessions,
  updateUnlockedSessionAnimate,
  updatePassedSessionAnimate,
  updateTargetUnlockedSession,
  updateTargetPassedSession,
  updateLockedSessionSnackbar,
} = homeSlice.actions;

export default homeSlice.reducer;
