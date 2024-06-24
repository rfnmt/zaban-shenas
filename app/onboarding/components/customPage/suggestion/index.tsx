import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";

import { Data } from "@/app/onboarding/onboarding.interfaces";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import {
  Course,
  CurrentCourseInterface,
} from "@/models/currentCourse.interfaces";

function Suggestion({ data }: { data: Data | undefined }) {
  const theme = useTheme() as any;

  const cachedUserCurrentCourseId = queryClient.getQueryData([
    "user-current-course-id",
  ]);

  const cachedUserCurrentCourseAllData =
    queryClient.getQueryData<CurrentCourseInterface>([
      "user-current-course-all-data",
      cachedUserCurrentCourseId,
    ]);

  const findCourse: Course = cachedUserCurrentCourseAllData?.courses.find(
    (item) => item.id === cachedUserCurrentCourseId
  );

  const getMainCourseTitle = cachedUserCurrentCourseAllData?.courses.find(
    (item) => item?.id === findCourse?.data?.main_course
  )?.data?.title;

  const suggestedCourseToUser = {
    title: findCourse.data?.title,
    mainCourseTitle: getMainCourseTitle,
    description: findCourse.data?.description,
    thumbnail: findCourse.data?.thumbnail,
  };

  return (
    <Box className="suggestion-wrapper">
      <Box className="image-wrapper">
        {suggestedCourseToUser.thumbnail && (
          <Image
            fill
            alt=""
            src={suggestedCourseToUser?.thumbnail}
            className="suggestion-image"
          />
        )}
      </Box>
      <Box className="explaination">
        <Typography sx={{ color: theme.palette.gray["1"] }} className="title">
          {data?.title}
        </Typography>
        <Typography
          sx={{ color: theme.palette.gray["1"] }}
          className="description"
        >
          {`${suggestedCourseToUser.mainCourseTitle} : ${suggestedCourseToUser?.title}`}
        </Typography>
        <Typography
          sx={{ color: theme.palette.gray["2"] }}
          className="sub-description"
        >
          {suggestedCourseToUser.description}
        </Typography>
      </Box>
    </Box>
  );
}

export default Suggestion;
