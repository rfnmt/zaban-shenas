"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface IShopState {
  boosterExpiryDate: number;
  wholeStudentRemaindGems: number;
  placebo2ExpiryDate: number;
}

const initialState: IShopState = {
  boosterExpiryDate: 0,
  wholeStudentRemaindGems: 0,
  placebo2ExpiryDate: 0,
};

export const userSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    updateBoosterExpiryDate: (state, action) => {
      state.boosterExpiryDate = action.payload;
    },
    updatePlacebo2ExpiryDate: (state, action) => {
      state.placebo2ExpiryDate = action.payload;
    },
    setwholeStudentRemaindGems: (state, action) => {
      state.wholeStudentRemaindGems = action.payload;
    },
  },
});

export const {
  updateBoosterExpiryDate,
  setwholeStudentRemaindGems,
  updatePlacebo2ExpiryDate,
} = userSlice.actions;

export default userSlice.reducer;
