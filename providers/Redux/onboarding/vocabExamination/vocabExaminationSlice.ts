"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface VocabExaminationState {
  isVocabExamination: boolean;
}

const initialState: VocabExaminationState = {
  isVocabExamination: false,
};

export const VocabExamination = createSlice({
  name: "vocabExamination",
  initialState,
  reducers: {
    updateIsVocabExamination: (state, action) => {
      state.isVocabExamination = action.payload;
    },
  },
});

export const { updateIsVocabExamination } = VocabExamination.actions;

export default VocabExamination.reducer;
