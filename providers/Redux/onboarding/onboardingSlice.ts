"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface OnboardingState {
  userOnboardingCurrentPage: string | number;
  onboardingButtonActivation: null;
  onboardingMainAndChoiceSlug: { choiceSlug: string; mainSlug: string };
  placementSessionOfCourseId: number | null;
  goVocabExaminationId: number | null;
  onboardingInitUsername: string;
  hideBackButtonInNameAndSuggestion: boolean;
}

const initialState: OnboardingState = {
  userOnboardingCurrentPage:
    typeof window !== "undefined"
      ? localStorage.getItem("userOnboardingCurrentPage") || 0
      : 0,
  onboardingButtonActivation: null,
  onboardingMainAndChoiceSlug: {
    choiceSlug: "",
    mainSlug: "",
  },
  placementSessionOfCourseId: null,
  goVocabExaminationId: null,
  onboardingInitUsername: "",
  hideBackButtonInNameAndSuggestion: false,
};

export const OnboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    updateUserOnboardingCurrentPage: (state, action) => {
      state.userOnboardingCurrentPage = action.payload;
    },
    updateOnboardingButtonActivation: (state, action) => {
      state.onboardingButtonActivation = action.payload;
    },
    updateOnboardingMainAndChoiceSlug: (state, action) => {
      state.onboardingMainAndChoiceSlug = {
        choiceSlug: action.payload.choiceSlug,
        mainSlug: action.payload.mainSlug,
      };
    },
    updatePlacementSessionOfCourseId: (state, action) => {
      state.placementSessionOfCourseId = action.payload;
    },
    updateGoVocabExaminationId: (state, action) => {
      state.goVocabExaminationId = action.payload;
    },
    updateOnboardingInitUsername: (state, action) => {
      state.onboardingInitUsername = action.payload;
    },
    updateHideBackButtonInNameAndSuggestion: (state, action) => {
      state.hideBackButtonInNameAndSuggestion = action.payload;
    },
  },
});

export const {
  updateUserOnboardingCurrentPage,
  updateOnboardingButtonActivation,
  updateOnboardingMainAndChoiceSlug,
  updatePlacementSessionOfCourseId,
  updateGoVocabExaminationId,
  updateOnboardingInitUsername,
  updateHideBackButtonInNameAndSuggestion,
} = OnboardingSlice.actions;

export default OnboardingSlice.reducer;
