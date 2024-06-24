"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface ISession {
  accuracy: number;
  gainedXp: number;
  sessionCompleted: boolean;
  userCanSeeSession: boolean;
  sessionBelongVocabExamination: boolean;
  latestSessionIDUserStudy: number | null;
  sessionType: "question_bundle" | "story" | "tip" | "";
}

const initialState: ISession = {
  accuracy:
    typeof window !== "undefined"
      ? Number(localStorage.getItem("accuracy"))
      : 0,
  gainedXp:
    typeof window !== "undefined"
      ? Number(localStorage.getItem("gainedXp"))
      : 0,
  sessionCompleted: false,
  userCanSeeSession: false,
  sessionBelongVocabExamination: false,
  latestSessionIDUserStudy:
    typeof window !== "undefined"
      ? Number(localStorage.getItem("latestSessionIDUserStudy"))
      : null,
  sessionType: "",
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    updateAccuracy: (state, action) => {
      state.accuracy = action.payload;
    },
    updateGaindXp: (state, action) => {
      state.gainedXp = action.payload;
    },
    updateSessionCompleted: (state, action) => {
      state.sessionCompleted = action.payload;
    },
    updateUserCanSeeSession: (state, action) => {
      state.userCanSeeSession = action.payload;
    },
    updateSessionBelongVocabExamination: (state, action) => {
      state.sessionBelongVocabExamination = action.payload;
    },
    updateLatestSessionIDUserStudy: (state, action) => {
      localStorage.setItem("latestSessionIDUserStudy", action.payload);
      state.latestSessionIDUserStudy = action.payload;
    },
    updateSessionType: (state, action) => {
      state.sessionType = action.payload;
    },
    resetSessionStates: () => initialState,
  },
});

export const {
  updateAccuracy,
  updateSessionCompleted,
  updateGaindXp,
  updateUserCanSeeSession,
  updateSessionBelongVocabExamination,
  updateLatestSessionIDUserStudy,
  resetSessionStates,
  updateSessionType,
} = sessionSlice.actions;

export default sessionSlice.reducer;
