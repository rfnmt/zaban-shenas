"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface IHintTableState {
  data: any;
  anchorEl: any;
  open: boolean;
}

const initialState: IHintTableState = {
  data: null,
  anchorEl: null,
  open: false,
};

export const hintTableSlice = createSlice({
  name: "hintTable",
  initialState,
  reducers: {
    setTableData: (state, action) => {
      state.data = action.payload;
    },
    setAnchorEl: (state, action) => {
      state.anchorEl = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setAnchorEl, setOpen, setTableData } = hintTableSlice.actions;

export default hintTableSlice.reducer;
