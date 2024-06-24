"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface IFreemuimBoardHomeState {
  boardVisiblity: boolean;
  needingOneGem: number | null;
  remainedEnergy: number;
}

const initialState: IFreemuimBoardHomeState = {
  boardVisiblity: false,
  needingOneGem: null,
  remainedEnergy: 0,
};

export const freemuimBoardHomeSlice = createSlice({
  name: "freemuimBoardHome",
  initialState,
  reducers: {
    closeBoard: (state) => {
      state.boardVisiblity = false;
    },
    openBoard: (state) => {
      state.boardVisiblity = true;
    },
    setNeedingOneGem: (state, action) => {
      state.needingOneGem = action.payload;
    },
    setRemainedEnergy: (state, action) => {
      state.remainedEnergy = action.payload;
    },
    // openBoard: (state, action) => {
    //   state.boardVisiblity = true;
    // },
  },
});

export const { closeBoard, openBoard, setNeedingOneGem, setRemainedEnergy } =
  freemuimBoardHomeSlice.actions;

export default freemuimBoardHomeSlice.reducer;
