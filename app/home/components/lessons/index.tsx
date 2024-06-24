import React, { Key } from "react";
import { Box } from "@mui/material";

import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { CurrentCourseInterface } from "@/models/currentCourse.interfaces";

import Sessions from "./sessions";
import LessonCover from "./lessonCover";

import "./styles.scss";

function Lessons({ id }: { id: number }) {
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

  return (
    <Box className="lesson-item">
      <LessonCover id={id} />
      {lessonData?.session_ids.map((sessionId: number, key: Key) => (
        <Sessions key={key} lessonId={id} id={sessionId} />
      ))}
    </Box>
  );
}

export default Lessons;
