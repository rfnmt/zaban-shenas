"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ILoadingState {
  config: {
    visible: boolean;
    classes?: string;
    lottieType?: string;
    titleBeforeLottie?: string;
    title?: string;
    subtitle?: string;
    backgroundColor?: string;
    lottieWidth?: number;
    lottieHeight?: number;
  };
}

const initialState: ILoadingState = {
  config: {
    visible: false,
    classes: "",
    titleBeforeLottie: "",
    lottieType: "",
    lottieWidth: 300,
    lottieHeight: 300,
    title: "",
    subtitle: "",
    backgroundColor: "",
  },
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    updateLoadingStates: (state, action: PayloadAction<ILoadingState>) => {
      state.config = { ...state.config, ...action.payload.config };
    },
    resetLoading: () => initialState,
  },
});

export const { updateLoadingStates, resetLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
