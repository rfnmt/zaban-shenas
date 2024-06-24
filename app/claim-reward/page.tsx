"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootReduxState } from "@/providers/Redux/store";

import Achievement from "./components/achievement";
import DailyQuest from "./components/dailyQuest";

import "./style.scss";

function ClaimRewardPage() {
  const { activityType } = useSelector(
    (state: RootReduxState) => state.claimRewards
  );

  function renderSpecifictType() {
    switch (activityType) {
      case "achievement":
        return <Achievement />;

      case "daily-quest":
        return <DailyQuest />;

      default:
        return <></>;
    }
  }

  return renderSpecifictType();
}

export default ClaimRewardPage;
