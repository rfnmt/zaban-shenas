"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootQuestionData } from "@/app/session/[id]/components/questions/questions.interfaces";

export interface IQuestionState {
  goToSlide: number | boolean;
  questionIsPassed: boolean;
  questionPassedCount: number;
  allQuestion: RootQuestionData[] | [];
  currentQuestionIndex: number;
  questionView: string;
}

const initialState: IQuestionState = {
  goToSlide: false,
  questionIsPassed: false,
  questionPassedCount: 0,
  allQuestion: [],
  currentQuestionIndex: 0,
  questionView: "",
};

export const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    updateGoToSlide: (state, action) => {
      state.goToSlide = action.payload;
    },
    updateAllQuestion: (state, action) => {
      state.allQuestion = action.payload;
    },
    updateCurrentQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },
    updateQuestionView: (state, action) => {
      state.questionView = action.payload;
    },
    resetQuestionStates: () => initialState,
  },
});

export const {
  updateGoToSlide,
  updateAllQuestion,
  updateCurrentQuestionIndex,
  updateQuestionView,
  resetQuestionStates,
} = questionSlice.actions;

export default questionSlice.reducer;
