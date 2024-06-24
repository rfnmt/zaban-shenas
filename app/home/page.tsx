"use client";
import { VariableSizeList as List } from "react-window";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Skeleton, Snackbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { RootReduxState } from "@/providers/Redux/store";
import { useUserSessionsStudyState } from "./hook/useUserSessionsStudyState";
import { calculateWhichSessionIsNext } from "./helpers/calculateWhichSessionIsNext";
import { CurrentCourseInterface } from "./index.interfaces";
import LottieLoading from "@/components/lottieLoading";
import MainCourse from "./components/mainCourse";
import LessonCover from "./components/lessons/lessonCover";
import Sessions from "./components/lessons/sessions";
import { updateLockedSessionSnackbar } from "@/providers/Redux/home/homeSlice";
import Icon from "@/components/icon";

import "./index.scss";

function HomePage() {
  const dispatch = useDispatch();
  const {
    proccessSessionStates,
    targetUnlockedSession,
    lockedSessionSnackbar,
  } = useSelector((state: RootReduxState) => state.home);

  const cachedUserCurrentCourseId: number | undefined =
    queryClient.getQueryData(["user-current-course-id"]);

  const cachedUserCurrentCourseAllData =
    queryClient.getQueryData<CurrentCourseInterface>([
      "user-current-course-all-data",
      cachedUserCurrentCourseId,
    ]);

  const mainCourseData = useMemo(() => {
    return cachedUserCurrentCourseAllData?.courses?.find(
      (item) => item?.id === cachedUserCurrentCourseId
    )?.data;
  }, [cachedUserCurrentCourseId]);

  // /**
  //  * start get user study data in sessions
  //  */

  const { mutate: getSessionStudyStatus } = useUserSessionsStudyState();

  const data: {
    session: number;
    lesson: number;
    course: number;
    hasCover: boolean;
  }[] = useMemo(() => {
    const result = [];
    if (cachedUserCurrentCourseAllData?.courses) {
      for (const course of cachedUserCurrentCourseAllData?.courses) {
        if (course.data.lesson_ids.length > 0) {
          // result.push({ course: course.id });

          for (const lesson of course.data.lesson_ids) {
            // console.log({ lesson }, course.data.lesson_ids);

            // console.log({ lesson });
            result.push({ lesson: lesson, course: course.id, hasCover: true });

            const findLessons = cachedUserCurrentCourseAllData.lessons.find(
              (item) => item.id === lesson
            );

            // console.log({ findLessons });

            if (findLessons?.data?.session_ids)
              for (const session of findLessons?.data?.session_ids) {
                // console.log({ session });

                result.push({
                  hasCover: false,
                  session: session,
                  lesson: lesson,
                  course: course.data.id,
                });
              }
          }
        }
        // continue;
      }
    }

    return result;
  }, [cachedUserCurrentCourseAllData]);

  useEffect(() => {
    if (proccessSessionStates === "waiting") {
      getSessionStudyStatus();
    } else if (proccessSessionStates === "done" && data.length) {
      calculateWhichSessionIsNext();
    }
  }, [proccessSessionStates, data, cachedUserCurrentCourseId]);
  // end get user study data in sessions

  const initialTopMostItemIndex = useMemo(() => {
    return data.findIndex((item) => item.session === targetUnlockedSession);
  }, [targetUnlockedSession, data]);

  const refWindow = React.createRef();

  const userHeight = useMemo(() => {
    return (
      window.innerHeight - 64 - 64 - (mainCourseData?.main_course ? 56 : 0)
    );
  }, [mainCourseData]);

  const opentReportSpecialContentBottomSheet = useSelector(
    (state: RootReduxState) =>
      state.general.opentReportSpecialContentBottomSheet
  );

  useEffect(() => {
    if (refWindow && refWindow.current && !opentReportSpecialContentBottomSheet)
      refWindow.current.scrollToItem(initialTopMostItemIndex, "center");
  }, [opentReportSpecialContentBottomSheet, initialTopMostItemIndex]);

  const getItemSize = (index) => {
    return !data[index]?.hasCover ? 100 : 160;
  };

  const Row = ({ index, style, isScrolling }) => {
    return (
      <div key={index} style={style}>
        {false && isScrolling ? (
          <div className="wrap-session-skeleton">
            {data[index].hasCover ? (
              <Skeleton variant="rectangular" className="cover-skeleton" />
            ) : (
              <div className="session-skeleton">
                <Skeleton variant="circular" />
                <Skeleton variant="rounded" />
              </div>
            )}
          </div>
        ) : !data[index].hasCover ? (
          <Sessions
            key={data[index].session}
            id={data[index].session}
            lessonId={data[index].lesson}
          />
        ) : (
          <Box sx={{ height: "auto" }} className="lesson-item">
            <LessonCover id={data[index].lesson} />
          </Box>
        )}
      </div>
    );
  };

  return (
    <Box display="flex" bgcolor="background.main" className="home-content">
      {proccessSessionStates !== "done" ? (
        <LottieLoading open_lottie={true} />
      ) : (
        <>
          {cachedUserCurrentCourseAllData && data && (
            <div className="container-without-padding">
              {mainCourseData?.main_course && (
                <MainCourse
                  title={mainCourseData?.title}
                  mainCourseId={mainCourseData?.main_course}
                />
              )}

              <List
                useIsScrolling
                ref={refWindow}
                direction="rtl"
                height={userHeight}
                itemCount={data.length}
                itemSize={getItemSize}
                width={"100%"}
              >
                {Row}
              </List>

              <Snackbar
                sx={{
                  "& .MuiPaper-root": {
                    backgroundColor: (theme) =>
                      `${theme.palette.gray[3]} !important`,
                  },
                  "& svg path": {
                    fill: "#FFF !important",
                  },
                }}
                className="locked-session-snackbar"
                open={lockedSessionSnackbar}
                autoHideDuration={2000}
                onClose={() => dispatch(updateLockedSessionSnackbar(false))}
                message={
                  <div className="body-snackbar">
                    <Icon icon="lock" width={24} height={24} />
                    <Typography>اول درس های قبلی رو تموم کن</Typography>
                  </div>
                }
              />
            </div>
          )}
        </>
      )}
    </Box>
  );
}

export default HomePage;
