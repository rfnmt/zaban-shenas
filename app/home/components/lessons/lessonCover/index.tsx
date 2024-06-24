import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";
import Dotdotdot from "react-dotdotdot";

import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { CurrentCourseInterface } from "@/models/currentCourse.interfaces";

import "./styles.scss";
import { numberToPersianWord } from "@/modules/helper";
import { ISessions } from "@/providers/Dexie/sync.interface";

function LessonCover({ id }: { id: number }) {
  const cachedUserCurrentCourseId = queryClient.getQueryData<Number>([
    "user-current-course-id",
  ]);

  const userCurrentCourse = queryClient.getQueryData<CurrentCourseInterface>([
    `user-current-course-all-data`,
    cachedUserCurrentCourseId,
  ]);

  const lessonData = userCurrentCourse?.lessons?.find((lesson) => {
    return lesson.id === id;
  })?.data;

  const coverPath = lessonData?.thumbnail?.startsWith("https://academy")
    ? lessonData?.thumbnail
    : "https://academy-strapi.staging.zabanshenas.com" + lessonData?.thumbnail;

  const lessonCount = useMemo(() => {
    const findCourse = userCurrentCourse?.courses.find((item) =>
      item?.data.lesson_ids.find((lesson) => lesson === id)
    );

    if (findCourse)
      return findCourse.data.lesson_ids.findIndex((item) => item === id) + 1;

    return 1;
  }, [userCurrentCourse, cachedUserCurrentCourseId]);

  const getSessionPassedCount = useMemo(() => {
    let count = 0;

    if (lessonData)
      for (const session of lessonData?.session_ids) {
        const sessionState = queryClient.getQueryData<ISessions | null>([
          "session-state",
          session,
        ]);

        if (sessionState?.state === "passed") {
          count += 1;
        }
      }

    return count;
  }, [lessonData]);

  return lessonData?.session_ids.length ? (
    <Box
      className="lesson-cover"
      sx={{
        backgroundImage: `url(${coverPath || "/icon/logo/512.png"})`,
      }}
    >
      <div className="lesson-count-with-session-passed">
        <Typography sx={{ color: "white.fix" }} className="lesson-count">
          فصل {numberToPersianWord(lessonCount)}
        </Typography>

        <Typography sx={{ color: "white.fix" }} className="dot">
          .
        </Typography>

        <Typography
          sx={{ color: "white.fix" }}
          className="passed-session-count"
        >
          {getSessionPassedCount} از {lessonData.session_ids.length}
        </Typography>
      </div>

      <Dotdotdot
        clamp={4}
        className="wrap-description"
        style={{ zIndex: "1 !important" }}
      >
        <Typography className="description" sx={{ color: "white.fix" }}>
          {lessonData?.description}
        </Typography>
      </Dotdotdot>
      <Box className="bottom-shadow" />
    </Box>
  ) : (
    <></>
  );
}

export default React.memo(LessonCover);
