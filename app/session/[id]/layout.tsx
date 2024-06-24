"use client";

import { motion } from "framer-motion";
import { Box } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { commonFramerMotionVariant } from "@/modules/helper";
import { useSessionQuery } from "./hook/useSessionQuery";
import { RootReduxState } from "@/providers/Redux/store";
import { CurrentCourseInterface } from "@/models/currentCourse.interfaces";
import { RootVocabExamination } from "@/models/vocabExamination";
import { IStudentData } from "@/models/studentData.interfaces";
import {
  updateSessionIdsBelongLesson,
  updateUserRecentLesson,
} from "@/providers/Redux/lesson/lesson";
import {
  resetSessionStates,
  updateSessionBelongVocabExamination,
  updateSessionType,
} from "@/providers/Redux/lesson/session/sessionSlice";
import { resetQuestionStates } from "@/providers/Redux/lesson/questionSlice/questionSlice";
import { APP_NODE_ENV } from "@/env";
import Content from "./page";
import SessionNavigator from "@/app/session/[id]/components/sessionNavigator";
import NavigateToBack from "@/components/navigateToBack/navigateToBack";
import Progress from "./components/progress";
import ReTryRequest from "@/components/retryRequest";
import LottieLoading from "@/components/lottieLoading";
import HintTable from "@/components/textProcessing/hintTable";
import Limitations from "./components/questions/components/limitations";
import { useSyncOnlyHasUpdateRecordsMutation } from "@/components/spalashScreen/hook/useSyncOnlyHasUpdateRecordsMutation";
import { useSyncMutation } from "@/components/spalashScreen/hook/useSyncMutation";
import { useStudentAPI } from "@/app/setting/store/hook";
import { useDailyChallenges } from "@/components/spalashScreen/hook/useDailyChallenges";
import { resetLoading } from "@/providers/Redux/loading/loadingSlice";

import "./styles.scss";

function SessionLayout() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootReduxState) => state.user);

  const pathname = usePathname().split("/")[2];
  const userIsStaff = queryClient.getQueryData<IStudentData>(["student-data"])
    ?.profile_data?.data?.is_staff;

  const {
    userCanSeeSession,
    sessionBelongVocabExamination,
    sessionCompleted,
    sessionType,
  } = useSelector((state: RootReduxState) => state.session);

  const cachedUserCurrentCourseId = queryClient.getQueryData<number>([
    "user-current-course-id",
  ]);

  const cachedVocabExamination = queryClient.getQueryData<RootVocabExamination>(
    ["vocab-examination"]
  );

  const userCurrentCourseAllData =
    queryClient.getQueryData<CurrentCourseInterface>([
      "user-current-course-all-data",
      cachedUserCurrentCourseId,
    ]);

  const sessionID = Number(pathname);

  const {
    data: sessionData,
    refetch: refechCurrentSession,
    isLoading: isLoadingGetCurrentSession,
    isError: hasErrorGetCurrentSession,
  } = useSessionQuery(sessionID);

  const updateLessonSliceData = useCallback(() => {
    if (userCurrentCourseAllData?.lessons) {
      const findLessonBelongCurrentSession =
        userCurrentCourseAllData.lessons.find((lesson) =>
          lesson.data.session_ids.find((id) => sessionID === id)
        )?.id;
      dispatch(updateUserRecentLesson(findLessonBelongCurrentSession));
      const sessionIdsBelongLesson = userCurrentCourseAllData?.lessons.find(
        (item) => item.id === findLessonBelongCurrentSession
      )?.data.session_ids;
      dispatch(updateSessionIdsBelongLesson(sessionIdsBelongLesson));
    }
  }, [pathname]);

  /**
   * This piece of code has been added to manage user navigation in various scenarios:
   * 1 - If the user is participating in a placement test, they should be directed to the onboarding page first.
   * 2 - If the user accesses the session directly through a link, they should be redirected to the main page. However, there is an exception: if the user is an employee of the company, they can remain in the session without being redirected to the main page.
   */

  useEffect(() => {
    if (APP_NODE_ENV === "production") {
      if (sessionBelongVocabExamination || userIsStaff) {
        if (!cachedVocabExamination && sessionBelongVocabExamination) {
          router.push("/onboarding");
        } else if (!sessionData) {
          refechCurrentSession();
        } else {
          updateLessonSliceData();
        }
      } else {
        if (userCanSeeSession) {
          if (!sessionData) refechCurrentSession();
          updateLessonSliceData();
        } else router.push("/");
      }
    } else {
      if (!sessionBelongVocabExamination && !sessionData) {
        refechCurrentSession();
      } else {
        updateLessonSliceData();
      }
    }
    return () => {
      if (!sessionData && !sessionBelongVocabExamination)
        queryClient.cancelQueries({ queryKey: ["session", sessionID] });
    };
  }, [pathname, sessionBelongVocabExamination]);

  useEffect(() => {
    if (sessionBelongVocabExamination) {
      dispatch(updateSessionType("question_bundle"));
    } else {
      dispatch(updateSessionType(sessionData?.sessions[0]?.data?.type));
    }

    return () => {};
  }, [sessionBelongVocabExamination, sessionData]);

  // This piece of code has been implemented to prevent React from re-rendering in develop mode.

  const [effectRan, setEffectRan] = useState(true);

  useEffect(() => {
    dispatch(resetLoading());

    if (pathname === "vocab-examination")
      dispatch(updateSessionBelongVocabExamination(true));

    if (effectRan) {
      setEffectRan(false);
    } else {
      return () => {
        dispatch(resetSessionStates());
        dispatch(resetQuestionStates());
      };
    }
  }, [effectRan]);

  //This piece of code has been added to enable the program to determine the type of navigation bar it should be.
  const navigateType = useMemo(() => {
    if (sessionBelongVocabExamination) {
      return "withBackButton";
    } else if (sessionType === "question_bundle") {
      return "withCloseAndTipIcon";
    } else if (sessionType === "story") {
      return "withCloseButton";
    } else {
      return "withBackAndMoreIcon";
    }
  }, [sessionData, sessionBelongVocabExamination]);

  const { refetch: getSyncOnlyHasUpdateRecordsFromClient } =
    useSyncOnlyHasUpdateRecordsMutation();

  const {
    mutate: requestToGetFreshSyncDataFromServer,
    status: getServerSyncDataState,
  } = useSyncMutation();

  useEffect(() => {
    if (sessionCompleted) {
      getSyncOnlyHasUpdateRecordsFromClient().then(function (data) {
        requestToGetFreshSyncDataFromServer(data?.data);
      });
    }
    return () => {};
  }, [sessionCompleted]);

  const { mutate: getStudentData, status: statusUserData } = useStudentAPI();

  useEffect(() => {
    const serverState = getServerSyncDataState;

    if (serverState === "success" || serverState === "error") {
      if (id) getStudentData(id);
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getServerSyncDataState]);
  // end 5 step

  const { mutate: getDailyChallenges } = useDailyChallenges();

  useEffect(() => {
    if (statusUserData === "error" || statusUserData === "success") {
      getDailyChallenges();
      router.push("/session-completed");
    }

    return () => {};
  }, [statusUserData]);

  useEffect(() => {
    router.prefetch("/session-completed");
    router.prefetch("/onboarding");

    return () => {};
  }, [router]);

  return (
    <Box bgcolor="background.main" className="session-page-wrapper">
      {!sessionBelongVocabExamination && hasErrorGetCurrentSession ? (
        <ReTryRequest callback={refechCurrentSession} />
      ) : isLoadingGetCurrentSession ? (
        <LottieLoading />
      ) : (
        <>
          <NavigateToBack
            type={navigateType}
            title={
              sessionBelongVocabExamination
                ? "آزمون تعین سطح"
                : sessionData?.sessions[0]?.data?.title
            }
          />
          {sessionData || sessionBelongVocabExamination ? <Progress /> : ""}
          <Box component="main" className="session-main">
            <motion.div {...commonFramerMotionVariant}>
              <Content />
            </motion.div>
            {!sessionBelongVocabExamination && <Limitations />}
          </Box>
          <SessionNavigator />
        </>
      )}
      {!sessionBelongVocabExamination && <HintTable />}
    </Box>
  );
}

export default SessionLayout;
