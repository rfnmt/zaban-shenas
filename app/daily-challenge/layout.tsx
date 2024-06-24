"use client";
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

import Content from "./page";
import ReTryRequest from "@/components/retryRequest";
import { commonFramerMotionVariant } from "@/modules/helper";
import { useDailyChallenges } from "@/components/spalashScreen/hook/useDailyChallenges";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { DailyChallengeTypes } from "../../models/dailyChallenge.interface";

import "./style.scss";

function DailyChallengeLayout() {
  const cachedDailyChallengeData =
    queryClient.getQueryData<DailyChallengeTypes>(["user-challenge"]);

  useEffect(() => {
    if (!cachedDailyChallengeData) getDailyChallenges();
    return () => {};
  }, []);

  const { mutate: getDailyChallenges, status: dailyChallengesStuts } =
    useDailyChallenges();

  return (
    <Box bgcolor="background.main" className="daily-challenge-layout container">
      {dailyChallengesStuts === "error" ? (
        <ReTryRequest callback={getDailyChallenges} />
      ) : (
        <motion.div {...commonFramerMotionVariant}>
          <Content />
        </motion.div>
      )}
    </Box>
  );
}

export default DailyChallengeLayout;
