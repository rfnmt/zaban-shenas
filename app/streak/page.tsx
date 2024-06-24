"use client";

import React from "react";
import Lottie from "react-lottie-player";
import { Box } from "@mui/material";

import * as streakFireAnimation from "@/public/lottie-files/streakFire.json";
import ContinueButton from "./components/continueButton";
import UserCurrentStreak from "./components/userCurrentStreak";
import DaysOfCurrentWeek from "./components/daysOfCurrentWeek";
import MotivationalMessage from "./components/motivationalMessage";

function StreakPage() {
  return (
    <Box className="streak-data">
      <UserCurrentStreak />

      <Lottie
        loop={true}
        play={true}
        className="flame"
        animationData={streakFireAnimation}
      />

      <DaysOfCurrentWeek />

      <MotivationalMessage />
      <ContinueButton />
    </Box>
  );
}

export default StreakPage;
