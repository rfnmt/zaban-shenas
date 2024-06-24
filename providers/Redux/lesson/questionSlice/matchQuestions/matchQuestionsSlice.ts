"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface IMatchQuestionsState {
  selectedLearningWord: any;
  selectedTranslateWord: any;
  currectItems: number | null;
  wrongItems: number[];
  disableItems: number[];
  wrongAnswersCount: number;
  correctAnswerCount: number;
}

const initialState: IMatchQuestionsState = {
  selectedLearningWord: null,
  selectedTranslateWord: null,
  currectItems: null,
  wrongItems: [],
  disableItems: [],
  wrongAnswersCount: 0,
  correctAnswerCount: 0,
};

export const matchQuestionsSlice = createSlice({
  name: "matchQuestions",
  initialState,
  reducers: {
    updateSelectedLearningWord: (state, action) => {
      state.selectedLearningWord = action.payload;
    },
    updateSelectedTranslate: (state, action) => {
      state.selectedTranslateWord = action.payload;
    },
    updateCurrectItems: (state, action) => {
      state.currectItems = action.payload;
    },
    updateWrongItems: (state, action) => {
      state.wrongItems = action.payload;
    },
    updateDisableItems: (state, action) => {
      state.disableItems = [...state.disableItems, action.payload];
    },
    resetDisableItems: (state) => {
      state.disableItems = [];
    },
    updateCorrectAnswerCounter: (state, action) => {
      state.correctAnswerCount = action.payload;
    },
    updateWrongAnswerCounter: (state, action) => {
      state.wrongAnswersCount = action.payload;
    },
    resetMatchQuestions: () => initialState,
  },
});

export const {
  updateSelectedLearningWord,
  updateSelectedTranslate,
  updateCurrectItems,
  updateWrongItems,
  updateDisableItems,
  resetDisableItems,
  resetMatchQuestions,
  updateCorrectAnswerCounter,
  updateWrongAnswerCounter,
} = matchQuestionsSlice.actions;

export default matchQuestionsSlice.reducer;
