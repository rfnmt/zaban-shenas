"use client";

import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./user/userSlice";
import generalSlice from "./general/generalSlice";
import shopSlice from "./setting/shop/shopSlice";
import sessionsNavigatorSlice from "./sessionNavigator/sessionNavigatorSlice";
import questionSlice from "./lesson/questionSlice/questionSlice";
import matchQuestionsSlice from "./lesson/questionSlice/matchQuestions/matchQuestionsSlice";
import multipleChoiceSlice from "./lesson/questionSlice/multipleChoices/multipleChoicesSlice";
import hintTableSlice from "./hintTable/hintTableSlice";
import composeSliceQuestion from "./lesson/questionSlice/compose/composeSlice";
import storySlice from "./lesson/storySlice/storySlice";
import storyMatchingQuestionsSlice from "./lesson/storySlice/storyMatchQuestions/storyMatchQuestionsSlice";
import sessionSlice from "./lesson/session/sessionSlice";
import LessonSlice from "./lesson/lesson";
import homeSlice from "./home/homeSlice";
import freemuimBoardHomeSlice from "./home/freemuim/freemuimBoardHomeSlice";
import useEnergyBottomSheetSlice from "./home/freemuim/useEnergyBottomSheetSlice";
import onboardingSlice from "./onboarding/onboardingSlice";
import VocabExamination from "./onboarding/vocabExamination/vocabExaminationSlice";
import loadingSlice from "./loading/loadingSlice";
import StreakSlice from "./streak/streakSlice";
import ClaimRewardsSlice from "./claimRewards/claimRewardsSlice";

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    home: homeSlice,
    freemuimBoardHome: freemuimBoardHomeSlice,
    useEnergyBottomSheet: useEnergyBottomSheetSlice,
    user: userSlice,
    general: generalSlice,
    shop: shopSlice,
    sessionNavigator: sessionsNavigatorSlice,
    lesson: LessonSlice,
    question: questionSlice,
    matchQuestions: matchQuestionsSlice,
    multipleChoise: multipleChoiceSlice,
    hintTable: hintTableSlice,
    composeQuestions: composeSliceQuestion,
    story: storySlice,
    storyMatching: storyMatchingQuestionsSlice,
    session: sessionSlice,
    onboarding: onboardingSlice,
    vocabExamination: VocabExamination,
    loading: loadingSlice,
    streak: StreakSlice,
    claimRewards: ClaimRewardsSlice,
  },
});

export type RootReduxState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
