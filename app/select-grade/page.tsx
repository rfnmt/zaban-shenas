"use client";

import React, { Key, memo, useEffect, useState } from "react";
import { Typography, useTheme } from "@mui/material";

import { ICourses } from "./interfaces";
import Course from "./components/course";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";

function SelectGrade() {
  const theme = useTheme() as any;
  const [courselist, setcourselist] = useState<ICourses[] | []>([]);
  const [userCurrentCourseData, setUserCurrentCourseData] =
    useState<ICourses | null>(null);
  const [
    userCurrentCourseDataWithNullMainCourse,
    setUserCurrentCourseDataWithNullMainCourse,
  ] = useState<ICourses[] | []>([]);

  const cachedUserCurrentCourseId: number | undefined =
    queryClient.getQueryData(["user-current-course-id"]);

  const cachedCoursesData: ICourses[] | undefined = queryClient.getQueryData([
    "courses-list",
  ]);

  useEffect(() => {
    if (cachedCoursesData !== undefined) {
      const mainCourseId = cachedCoursesData.find(
        (item) => item.id === cachedUserCurrentCourseId
      )?.data?.main_course;

      if (mainCourseId) {
        const userSelecteCourse = cachedCoursesData.find(
          (item) => item.id === mainCourseId
        );

        if (userSelecteCourse) setUserCurrentCourseData(userSelecteCourse);
      }

      const filterAllCourseExceptSelectedCourse = cachedCoursesData.filter(
        (item) => item.id !== mainCourseId
      );

      setcourselist(filterAllCourseExceptSelectedCourse);

      setUserCurrentCourseDataWithNullMainCourse(
        cachedCoursesData.filter(
          (item) =>
            item.data.main_course === null &&
            item.id === cachedUserCurrentCourseId
        )
      );
    }
  }, [cachedCoursesData, cachedUserCurrentCourseId]);

  return (
    <div className="select-grade-content">
      {userCurrentCourseData && (
        <section className="course-list">
          <Typography className="title" sx={{ color: theme.palette.gray[1] }}>
            مقطع انتخاب شده
          </Typography>
          <div className="items">
            <Course data={userCurrentCourseData.data} />
          </div>
        </section>
      )}

      {userCurrentCourseDataWithNullMainCourse.length > 0 ? (
        <section className="course-list">
          <Typography className="title" sx={{ color: theme.palette.gray[1] }}>
            مقطع انتخاب شده
          </Typography>
          <div className="items">
            <Course data={userCurrentCourseDataWithNullMainCourse[0].data} />
          </div>
        </section>
      ) : (
        ""
      )}

      {courselist.length ? (
        <section className="course-list">
          <Typography className="title" sx={{ color: theme.palette.gray[1] }}>
            تمام مقاطع
          </Typography>
          <div className="items">
            {courselist?.map(
              (item: ICourses, key: Key) =>
                item?.data.main_course === null &&
                item?.id !== cachedUserCurrentCourseId && (
                  <Course data={item.data} key={key} />
                )
            )}
          </div>
        </section>
      ) : (
        ""
      )}
    </div>
  );
}

export default memo(SelectGrade);
