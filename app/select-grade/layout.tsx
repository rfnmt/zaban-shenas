"use client";

import React, { useEffect } from "react";
import { Box, Toolbar } from "@mui/material";
import SelectGradeHeader from "./components/header";
import { motion } from "framer-motion";

import { commonFramerMotionVariant } from "@/modules/helper";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { useAllCourseQuery } from "./hook/useAllCourseQuery";

import Content from "./page";
import LottieLoading from "@/components/lottieLoading";
import ReTryRequest from "@/components/retryRequest";
import { useCurrentCourseId } from "../home/hook/useCurrentCourseIdQuery";

import "./styles.scss";

function SelectGradeLayout() {
  const cachedUserCurrentCourseId = queryClient.getQueryData([
    "user-current-course-id",
  ]);

  const cachedCoursesData = queryClient.getQueryData(["courses-list"]);

  const {
    refetch: refetchAllCourseData,
    isError: isErrorGetAllCourseData,
    isLoading: isLoadingGetAllCourseData,
  } = useAllCourseQuery();

  const { mutate: getUserCurrentCourseId } = useCurrentCourseId();

  useEffect(() => {
    if (!cachedUserCurrentCourseId) getUserCurrentCourseId();
    if (!cachedCoursesData) refetchAllCourseData();

    // return () => {
    //   if (!cachedCoursesData)
    //     queryClient.cancelQueries({
    //       queryKey: ["courses-list"],
    //     });
    // };
  }, [cachedUserCurrentCourseId, cachedCoursesData]);

  return (
    <Box
      display="flex"
      bgcolor="background.main"
      className="select-grade-wrapper"
    >
      {isLoadingGetAllCourseData ? (
        <div className="select-grade-loading">
          <LottieLoading open_lottie={true} />
        </div>
      ) : isErrorGetAllCourseData ? (
        <div className="select-grade-retry-request">
          <ReTryRequest callback={refetchAllCourseData} />
        </div>
      ) : (
        <>
          <SelectGradeHeader />
          <Box component="main" className="container">
            <motion.div {...commonFramerMotionVariant}>
              <Toolbar />
              <Content />
            </motion.div>
          </Box>
        </>
      )}
    </Box>
  );
}

export default SelectGradeLayout;
