"use client";

import { ChallengeRewardsItem } from "@/models/dailyChallenge.interface";
import { createSlice } from "@reduxjs/toolkit";

export interface DailQuestInterface {
  booster: ChallengeRewardsItem[];
  gem: ChallengeRewardsItem[];
  streak_freeze: ChallengeRewardsItem[];
}
export interface IClaimRewardsStates {
  slug: string;
  id: number | null;
  activityType: string;
  dailyQuestData: DailQuestInterface | [];
}

const initialState: IClaimRewardsStates = {
  slug: "",
  id: null,
  activityType: "daily-quest",
  dailyQuestData: [],
};

export const ClaimRewardsSlice = createSlice({
  name: "claim-rewards",
  initialState,
  reducers: {
    updateClaimRewardSlug: (state, action) => {
      state.slug = action.payload;
    },
    updateClaimRewardID: (state, action) => {
      state.id = action.payload;
    },
    updateActivityType: (state, action) => {
      state.activityType = action.payload;
    },
    updateDailyQuestData: (state, action) => {
      state.dailyQuestData = action.payload;
    },
    resetClaimRewards: () => initialState,
  },
});

export const {
  updateClaimRewardID,
  updateClaimRewardSlug,
  updateActivityType,
  updateDailyQuestData,
  resetClaimRewards,
} = ClaimRewardsSlice.actions;

export default ClaimRewardsSlice.reducer;
