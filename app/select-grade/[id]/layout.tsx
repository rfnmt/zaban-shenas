"use client";

import React, { useEffect } from "react";
import { Box, Toolbar } from "@mui/material";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import Content from "./page";
import { commonFramerMotionVariant } from "@/modules/helper";
import SelectGradeHeader from "../components/header";
import { useAllCourseQuery } from "../hook/useAllCourseQuery";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import LottieLoading from "@/components/lottieLoading";
import { ICourses } from "../interfaces";

function Sub_Course_Layout() {
  const pathName = usePathname();

  const cachedCoursesData: ICourses[] | undefined = queryClient.getQueryData([
    "courses-list",
  ]);

  const {
    refetch: refetchAllCourseData,
    isLoading: isLoadingGetAllCourseData,
  } = useAllCourseQuery();

  useEffect(() => {
    if (!cachedCoursesData) refetchAllCourseData();
  }, [cachedCoursesData]);

  const sortSubCourse = cachedCoursesData?.find(
    (course) => course.id === +pathName.split("/")[2]
  )?.data.sub_courses;

  const courseData = sortSubCourse?.map((item) =>
    cachedCoursesData?.find((course) => course.id === item)
  );

  return (
    <Box
      display="flex"
      bgcolor="background.main"
      className="select-grade-wrapper"
    >
      {isLoadingGetAllCourseData || !cachedCoursesData ? (
        <div className="select-grade-retry-request">
          <LottieLoading open_lottie={true} />
        </div>
      ) : (
        <>
          <SelectGradeHeader />
          <Box component="main">
            <motion.div {...commonFramerMotionVariant}>
              <Toolbar />
              <Content data={courseData} />
            </motion.div>
          </Box>
        </>
      )}
    </Box>
  );
}

export default Sub_Course_Layout;
