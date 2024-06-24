"use client";

import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { commonFramerMotionVariant } from "@/modules/helper";
import { useCurrentCourseData } from "@/components/spalashScreen/hook/useCurrentCourseData";
import { CurrentCourseInterface } from "./index.interfaces";
import { useCurrentCourseId } from "./hook/useCurrentCourseIdQuery";

import Header from "./components/header";
import LottieLoading from "@/components/lottieLoading";
import HomePage from "./page";
import PageNavigator from "@/components/pageNavigator";
import UseEnergyBottomSheet from "./components/useEnergyBottomSheet";

import "./index.scss";

function HomeLayout() {
  const { mutate: getUserCurrentCourseId } = useCurrentCourseId();
  const cachedUserCurrentCourseId = queryClient.getQueryData<number>([
    "user-current-course-id",
  ]);

  const cachedUserCurrentCourseAllData =
    queryClient.getQueryData<CurrentCourseInterface>([
      "user-current-course-all-data",
      cachedUserCurrentCourseId,
    ]);

  const {
    refetch: requestToGetCurrentCourseAllData,
    fetchStatus: statusGetCurrentCourseData,
  } = useCurrentCourseData();

  useEffect(() => {
    if (!cachedUserCurrentCourseId) {
      getUserCurrentCourseId();
    } else if (cachedUserCurrentCourseAllData === undefined) {
      requestToGetCurrentCourseAllData();
    }

    return () => {};
  }, [cachedUserCurrentCourseAllData, cachedUserCurrentCourseId]);

  return (
    <Box bgcolor="background.main" className="academy-home">
      {statusGetCurrentCourseData === "fetching" ? (
        <LottieLoading open_lottie={true} />
      ) : (
        <>
          <Header />
          <Box component="main" bgcolor="background.main">
            <motion.div
              className="academy-home-content"
              {...commonFramerMotionVariant}
            >
              <HomePage />
            </motion.div>
          </Box>
          <PageNavigator />
          <UseEnergyBottomSheet />
        </>
      )}
    </Box>
  );
}

export default HomeLayout;
