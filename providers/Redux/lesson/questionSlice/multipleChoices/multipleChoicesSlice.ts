"use client";

import { Choices } from "@/app/session/[id]/components/questions/questions.interfaces";
import { createSlice } from "@reduxjs/toolkit";

export interface IMultipleChoiceState {
  multipleChoiceSelectedAnswer: number[] | [];
  multipleChoiceCorrectAnswer: Choices[] | [];
  multipleChoiceWrongItem: number[];
  stopMainAudio: boolean;
  stopSlowAudio: boolean;

  multipleCheckBoxAnswers: Array<any>[];
}

const initialState: IMultipleChoiceState = {
  multipleChoiceSelectedAnswer: [],
  multipleChoiceCorrectAnswer: [],
  multipleChoiceWrongItem: [],
  stopMainAudio: false,
  stopSlowAudio: false,
  multipleCheckBoxAnswers: [],
};

export const multipleChoiceSlice = createSlice({
  name: "multipleChoice",
  initialState,
  reducers: {
    updateMultipleChoiceSelectedAnswer: (state, action) => {
      state.multipleChoiceSelectedAnswer = action.payload;
    },
    updateMultipleChoiceCorrectItems: (state, action) => {
      state.multipleChoiceCorrectAnswer = action.payload;
    },
    updateMultipleChoiceWrongItems: (state, action) => {
      state.multipleChoiceWrongItem = action.payload;
    },
    updateStopMainAudio: (state, action) => {
      state.stopMainAudio = action.payload;
    },
    updateStopSlowAudio: (state, action) => {
      state.stopSlowAudio = action.payload;
    },
    resetMultipleChoice: () => initialState,

    updateMultipleCheckBoxAnswers: (state, action) => {
      state.multipleCheckBoxAnswers = [
        ...state.multipleCheckBoxAnswers,
        ...action.payload,
      ];
    },

    updateRemoveMultipleCheckBoxAnswers: (state, action) => {
      state.multipleCheckBoxAnswers = [...action.payload];
    },
  },
});

export const {
  updateMultipleChoiceSelectedAnswer,
  updateMultipleChoiceCorrectItems,
  updateMultipleChoiceWrongItems,
  updateStopMainAudio,
  updateStopSlowAudio,
  resetMultipleChoice,
  updateMultipleCheckBoxAnswers,
  updateRemoveMultipleCheckBoxAnswers,
} = multipleChoiceSlice.actions;

export default multipleChoiceSlice.reducer;
