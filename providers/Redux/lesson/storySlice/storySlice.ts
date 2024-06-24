"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface StoryQuestionsState {
  storyCurrentQuestionIndex: number;
  storyNumberOfMatchQuestionsCorrectAnswers: number;
  storyPushCorrectQuestionAnswerIntoArray: Array<number>;
  storyEnableAddingScoreFromMatchQuestions: boolean;
  storyShowAllArrangeQuestionChoices: boolean;
  storyShowAllSelectPhraseQuestionChoices: boolean;
  answerStoryfillDamagedSentenceWithChoices: [];
  wordsCorrectOrderStoryArrangQuestion: number;
  storyCatchExistedLine_elementFromArrangeQuestion: any;
  storyCatchExistedLine_elementFromSelectPhrase: any;
}

const initialState: StoryQuestionsState = {
  storyCurrentQuestionIndex: 0,
  storyNumberOfMatchQuestionsCorrectAnswers: 0,
  storyPushCorrectQuestionAnswerIntoArray: [],
  storyEnableAddingScoreFromMatchQuestions: true,
  storyShowAllArrangeQuestionChoices: false,
  storyShowAllSelectPhraseQuestionChoices: false,
  answerStoryfillDamagedSentenceWithChoices: [],
  wordsCorrectOrderStoryArrangQuestion: 0,
  storyCatchExistedLine_elementFromArrangeQuestion: {
    whatIsParent: "",
    type: "",
    line_element: {},
  },
  storyCatchExistedLine_elementFromSelectPhrase: {
    whatIsParent: "",
    type: "",
    line_element: {},
  },
};

export const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    updateStoryCurrentQuestionIndex: (state, action) => {
      state.storyCurrentQuestionIndex = action.payload;
    },
    updateStoryNumberOfMatchQuestionsCorrectAnswers: (state, action) => {
      state.storyNumberOfMatchQuestionsCorrectAnswers = action.payload;
    },
    updateStoryPushCorrectAnswerIntoArray: (state, action) => {
      state.storyPushCorrectQuestionAnswerIntoArray.push(action.payload);
    },
    resetStoryPushingCorrectAnswer: (state) => {
      state.storyPushCorrectQuestionAnswerIntoArray = [];
    },
    updateStoryEnableAddingScoreFromMatchQuestions: (state, action) => {
      state.storyEnableAddingScoreFromMatchQuestions = action.payload;
    },
    updateStoryShowAllArrangeQuestionChoices: (state, action) => {
      state.storyShowAllArrangeQuestionChoices = action.payload;
    },
    updateStoryShowAllSelectPhraseQuestionChoices: (state, action) => {
      state.storyShowAllSelectPhraseQuestionChoices = action.payload;
    },

    updateAnswerStoryfillDamagedSentenceWithChoices: (state, action) => {
      state.answerStoryfillDamagedSentenceWithChoices = action.payload;
    },
    updateWordsCorrectOrderStoryArrangQuestion: (state, action) => {
      state.wordsCorrectOrderStoryArrangQuestion = action.payload;
    },
    updateStoryCatchExistedLine_elementFromArrangeQuestion: (state, action) => {
      state.storyCatchExistedLine_elementFromArrangeQuestion = {
        whatIsParent: "arrangeQuestion",
        type: "line_item",
        line_element: action.payload,
      };
    },
    updateStoryCatchExistedLine_elementFromSelectPhrase: (state, action) => {
      state.storyCatchExistedLine_elementFromSelectPhrase = {
        whatIsParent: "selectPhraseQuestion",
        type: "line_item",
        line_element: action.payload,
      };
    },
  },
});

export const {
  updateStoryCurrentQuestionIndex,
  updateStoryNumberOfMatchQuestionsCorrectAnswers,
  updateStoryPushCorrectAnswerIntoArray,
  resetStoryPushingCorrectAnswer,
  updateStoryEnableAddingScoreFromMatchQuestions,
  updateStoryShowAllArrangeQuestionChoices,
  updateStoryShowAllSelectPhraseQuestionChoices,
  updateAnswerStoryfillDamagedSentenceWithChoices,
  updateWordsCorrectOrderStoryArrangQuestion,
  updateStoryCatchExistedLine_elementFromArrangeQuestion,
  updateStoryCatchExistedLine_elementFromSelectPhrase,
} = storySlice.actions;

export default storySlice.reducer;
