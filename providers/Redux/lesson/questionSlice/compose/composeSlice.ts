"use client";

import { DamagedItems } from "@/app/session/[id]/components/questions/types";
import { createSlice } from "@reduxjs/toolkit";

export interface IComposeQuestionsState {
  selected: Object;
  answerfillDamagedSentenceWithChoices: [];
  composeView: string;
  textareaAnswer: string;
  makeSentenceWithChoiceAnswer: [];
  textareaWithChoiceAnswer: { selectable: string; freeText: string };
  fillDamagedSentenceWithWriting: DamagedItems[];
  fillDamagedWordsWithWriting: DamagedItems[];
  answerUserWithMicrophone: string;
  listeningToMicrophone: boolean;
}

const initialState: IComposeQuestionsState = {
  selected: {},
  answerfillDamagedSentenceWithChoices: [],
  composeView: "",
  textareaAnswer: "",
  makeSentenceWithChoiceAnswer: [],
  textareaWithChoiceAnswer: {
    selectable: "",
    freeText: "",
  },
  fillDamagedSentenceWithWriting: [],
  fillDamagedWordsWithWriting: [],
  answerUserWithMicrophone: "",
  listeningToMicrophone: false,
};

export const composeSliceQuestion = createSlice({
  name: "multipleChoice",
  initialState,
  reducers: {
    updateTextAreaWithChoiceAnswer: (state, action) => {
      if (action.payload) {
        state.textareaWithChoiceAnswer = {
          selectable: action.payload.selectable,
          freeText: action.payload.freeText,
        };
      }
    },
    updateMakeSentenceWithChoiceAnswer: (state, action) => {
      if (action.payload) {
        state.makeSentenceWithChoiceAnswer = action.payload;
      }
    },
    updateTextareaAnswer: (state, action) => {
      if (action.payload) {
        state.textareaAnswer = action.payload;
      }
    },
    updateComposeView: (state, action) => {
      if (action.payload) {
        state.composeView = action.payload;
      }
    },
    updateSelected: (state, action) => {
      if (action.payload) {
        state.selected = action.payload;
      }
    },
    updateDamageSentenceWithChoiceAnswer: (state, action) => {
      state.answerfillDamagedSentenceWithChoices = action.payload;
    },
    updateAnswerFillDamagedSentenceWithChoices: (state, action) => {
      state.answerfillDamagedSentenceWithChoices = action.payload;
    },
    updateFillDamagedSentenceWithWriting: (state, action) => {
      state.fillDamagedSentenceWithWriting = action.payload;
    },
    updateFillDamagedWordsWithWriting: (state, action) => {
      state.fillDamagedWordsWithWriting = action.payload;
    },
    updateAnswerUserWithMicrophone: (state, action) => {
      state.answerUserWithMicrophone = action.payload;
    },
    toggleListenMicrophone: (state, action) => {
      state.listeningToMicrophone = action.payload;
    },
    resetComposeQuestion: () => initialState,
  },
});

export const {
  updateSelected,
  updateDamageSentenceWithChoiceAnswer,
  updateAnswerFillDamagedSentenceWithChoices,
  updateComposeView,
  updateTextareaAnswer,
  updateMakeSentenceWithChoiceAnswer,
  updateTextAreaWithChoiceAnswer,
  updateFillDamagedSentenceWithWriting,
  updateFillDamagedWordsWithWriting,
  updateAnswerUserWithMicrophone,
  toggleListenMicrophone,
  resetComposeQuestion,
} = composeSliceQuestion.actions;

export default composeSliceQuestion.reducer;
