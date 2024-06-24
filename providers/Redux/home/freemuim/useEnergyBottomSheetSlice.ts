"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface IUseEnergyBottomSheetState {
  visiblity: boolean;
  cover: string;
  sessionId: number | null;
}

const initialState: IUseEnergyBottomSheetState = {
  visiblity: false,
  cover: "",
  sessionId: null,
};

export const useEnergyBottomSheetSlice = createSlice({
  name: "useEnergyBottomSheet",
  initialState,
  reducers: {
    closeSheet: (state) => {
      state.visiblity = false;
    },
    openSheet: (state) => {
      state.visiblity = true;
    },
    serCover: (state, action) => {
      state.cover = action.payload;
    },
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
    },
    // openBoard: (state, action) => {
    //   state.visiblity = true;
    // },
  },
});

export const { closeSheet, openSheet, serCover, setSessionId } =
  useEnergyBottomSheetSlice.actions;

export default useEnergyBottomSheetSlice.reducer;
