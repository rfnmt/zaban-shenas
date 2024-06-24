"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface IMatchQuestionsState {
  storySelectedLearningWord: any;
  storySelectedTranslateWord: any;
  storyCurrectItems: number | null;
  storyWrongItems: number[];
  storyDisableItems: number[];
}

const initialState: IMatchQuestionsState = {
  storySelectedLearningWord: null,
  storySelectedTranslateWord: null,
  storyCurrectItems: null,
  storyWrongItems: [],
  storyDisableItems: [],
};

export const storyMatchingQuestionsSlice = createSlice({
  name: "storyMatchingQuestions",
  initialState,
  reducers: {
    updateStorySelectedLearningWord: (state, action) => {
      state.storySelectedLearningWord = action.payload;
    },
    updateStorySelectedTranslate: (state, action) => {
      state.storySelectedTranslateWord = action.payload;
    },
    updateStoryCurrectItems: (state, action) => {
      state.storyCurrectItems = action.payload;
    },
    updateStoryWrongItems: (state, action) => {
      state.storyWrongItems = action.payload;
    },
    updateStoryDisableItems: (state, action) => {
      state.storyDisableItems = [...state.storyDisableItems, action.payload];
    },
    resetStoryDisableItems: (state) => {
      state.storyDisableItems = [];
    },
  },
});

export const {
  updateStorySelectedLearningWord,
  updateStorySelectedTranslate,
  updateStoryCurrectItems,
  updateStoryWrongItems,
  updateStoryDisableItems,
  resetStoryDisableItems,
} = storyMatchingQuestionsSlice.actions;

export default storyMatchingQuestionsSlice.reducer;
