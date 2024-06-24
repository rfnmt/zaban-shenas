"use client";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

import { useOnboardingData } from "./hook";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { RootOnboarding } from "./onboarding.interfaces";
import { commonFramerMotionVariant } from "@/modules/helper";
import Content from "./page";
import ReTryRequest from "@/components/retryRequest";
import LottieLoading from "@/components/lottieLoading";

import "./styles.scss";

function OnboardingLayout() {
  const cachedOnboardingData = queryClient.getQueryData<RootOnboarding>([
    "onboarding",
  ]);

  const { refetch: refetchOnboarding, status, isPending } = useOnboardingData();

  useEffect(() => {
    if (!cachedOnboardingData) refetchOnboarding();
    return () => {};
  }, []);

  return (
    <Box className="onboarding-wrapper">
      {isPending ? (
        <LottieLoading />
      ) : status === "error" ? (
        <ReTryRequest callback={refetchOnboarding} />
      ) : (
        <motion.div
          className="onboarding-layout-animation"
          {...commonFramerMotionVariant}
        >
          <Content />
        </motion.div>
      )}
    </Box>
  );
}

export default OnboardingLayout;
