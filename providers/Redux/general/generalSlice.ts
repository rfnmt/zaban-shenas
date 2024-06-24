"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface IGeneralState {
  mode: string;
  fetchSyncRequestStatus: "waiting" | "doing" | "done";
  openProductBottomSheet: boolean;
  openCheckoutBottomsheet: boolean;
  openActivationBottomSheet: boolean;
  boosterSuccessBottomSheet: boolean;
  sendProductDataToSuccessBottomSheet: {};
  openBuyingGemBottomSheet: boolean;
  activationProductCheckoutData: {};
  common_successful_bottomsheet: boolean;
  checkoutSuccessfulBottomSheet: boolean;
  checkoutSuccessfulBottomSheetData: {};
  openReportBottomSheet: boolean;
  getReportCategoryTitle: string;
  getReportCategoryType: string;
  opentReportSpecialContentBottomSheet: boolean;
  visibleTipBottomSheet: boolean;
  getElementIdForReportScreenShot: string;
  flagIconWhichOpensReportBottomSheet: boolean;
  getSpecialIdForReport: number | null;
  followersOrFollowing: string;
  openGiftBottomSheet: boolean;
  openSuccessfulGiftBottomSheet: boolean;
  giftName: string;
  giftVariationTitle: string;
  suggestedFriendID: number | null;
  giftSwiperValue: number;
}

const initialState: IGeneralState = {
  mode:
    typeof window !== "undefined"
      ? localStorage.getItem("mode") || "prefers-color-scheme"
      : "prefers-color-scheme",
  fetchSyncRequestStatus: "waiting",
  openProductBottomSheet: false,
  openCheckoutBottomsheet: false,
  openActivationBottomSheet: false,
  boosterSuccessBottomSheet: false,
  sendProductDataToSuccessBottomSheet: {},
  openBuyingGemBottomSheet: false,
  activationProductCheckoutData: {},
  common_successful_bottomsheet: false,
  checkoutSuccessfulBottomSheet: false,
  checkoutSuccessfulBottomSheetData: { title: "", pic: "", purchaseTag: "" },
  openReportBottomSheet: false,
  getReportCategoryTitle: "",
  getReportCategoryType: "",
  opentReportSpecialContentBottomSheet: false,
  visibleTipBottomSheet: false,
  getElementIdForReportScreenShot: "",
  flagIconWhichOpensReportBottomSheet: false,
  getSpecialIdForReport: null,
  followersOrFollowing: "followers",
  openGiftBottomSheet: false,
  openSuccessfulGiftBottomSheet: false,
  giftName: "",
  giftVariationTitle: "",
  suggestedFriendID: null,
  giftSwiperValue: 0,
};

export const userSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setFetchSyncRequestStatus: (state, action) => {
      state.fetchSyncRequestStatus = action.payload;
    },
    changeThemeMode: (state, action) => {
      state.mode = action.payload;
    },
    setOpenProductBottomSheet: (state, action) => {
      state.openProductBottomSheet = action.payload;
    },
    setOpenCheckoutBottomSheet: (state, action) => {
      state.openCheckoutBottomsheet = action.payload;
    },
    setOpenActivationBottomSheet: (state, action) => {
      state.openActivationBottomSheet = action.payload;
    },

    setBoosterSuccessBottomSheet: (state, action) => {
      state.boosterSuccessBottomSheet = action.payload;
    },
    set_SendProductDataToSuccessBottomSheet: (state, action) => {
      state.sendProductDataToSuccessBottomSheet = action.payload;
    },

    setOpenBuyingGemBottomSheet: (state, action) => {
      state.openBuyingGemBottomSheet = action.payload;
    },
    setActivationProductCheckoutData: (state, action) => {
      state.activationProductCheckoutData = action.payload;
    },
    set_common_successful_bottomsheet: (state, action) => {
      state.common_successful_bottomsheet = action.payload;
    },
    setCheckoutSuccessfulBottomSheet: (state, action) => {
      state.checkoutSuccessfulBottomSheet = action.payload;
    },
    setCheckoutSuccessfulBottomSheetData: (state, action) => {
      state.checkoutSuccessfulBottomSheetData = action.payload;
    },
    setOpenReportBottomSheet: (state, action) => {
      state.openReportBottomSheet = action.payload;
    },

    handleGetReportCategoryTitle: (state, action) => {
      state.getReportCategoryTitle = action.payload;
    },

    handleGetReportCategoryType: (state, action) => {
      state.getReportCategoryType = action.payload;
    },

    handleOpentReportSpecialContentBottomSheet: (state, action) => {
      state.opentReportSpecialContentBottomSheet = action.payload;
    },
    updateVisibleTipBottomSheet: (state, action) => {
      state.visibleTipBottomSheet = action.payload;
    },
    updateGetElementIdForReportScreenShot: (state, action) => {
      state.getElementIdForReportScreenShot = action.payload;
    },
    updateFlagIconWhichOpensReportBottomSheet: (state, action) => {
      state.flagIconWhichOpensReportBottomSheet = action.payload;
    },

    updateGetSpecialIdForReport: (state, action) => {
      state.getSpecialIdForReport = action.payload;
    },

    setDataForFollowersOrFollowing: (state, action) => {
      state.followersOrFollowing = action.payload;
    },

    handleOpenGiftBottomSheet: (state, action) => {
      state.openGiftBottomSheet = action.payload;
    },
    handleOpenSuccessfulGiftBottomSheet: (state, action) => {
      state.openSuccessfulGiftBottomSheet = action.payload;
    },
    setGiftName: (state, action) => {
      state.giftName = action.payload;
    },
    setGiftVariationTitle: (state, action) => {
      state.giftVariationTitle = action.payload;
    },
    setSuggestedFriendID: (state, action) => {
      state.suggestedFriendID = action.payload;
    },
    handleGiftSwiperValue: (state, action) => {
      state.giftSwiperValue = action.payload;
    },
  },
});

export const {
  setFetchSyncRequestStatus,
  changeThemeMode,
  setOpenProductBottomSheet,
  setOpenCheckoutBottomSheet,
  setOpenActivationBottomSheet,
  setBoosterSuccessBottomSheet,
  set_SendProductDataToSuccessBottomSheet,
  setOpenBuyingGemBottomSheet,
  setActivationProductCheckoutData,
  set_common_successful_bottomsheet,
  setCheckoutSuccessfulBottomSheet,
  setCheckoutSuccessfulBottomSheetData,
  setOpenReportBottomSheet,
  handleGetReportCategoryTitle,
  handleGetReportCategoryType,
  handleOpentReportSpecialContentBottomSheet,
  updateVisibleTipBottomSheet,
  updateGetElementIdForReportScreenShot,
  updateFlagIconWhichOpensReportBottomSheet,
  updateGetSpecialIdForReport,
  setDataForFollowersOrFollowing,
  handleOpenGiftBottomSheet,
  handleOpenSuccessfulGiftBottomSheet,
  setGiftName,
  setGiftVariationTitle,
  setSuggestedFriendID,
  handleGiftSwiperValue,
} = userSlice.actions;

export default userSlice.reducer;
