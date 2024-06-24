"use client";

import Lottie from "react-lottie-player";
import React, { memo, useEffect } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import * as WelcomeAnimation from "@/public/lottie-files/welcome.json";
import RequestToTryRequset from "./retryRequest";

import { useSyncMutation } from "./hook/useSyncMutation";
import { useShopMutation } from "./hook/useShopMutation";
import { setFetchSyncRequestStatus } from "@/providers/Redux/general/generalSlice";
import { useSyncOnlyHasUpdateRecordsMutation } from "./hook/useSyncOnlyHasUpdateRecordsMutation";
import { useCurrentCourseData } from "./hook/useCurrentCourseData";
import {
  useGetInitilaData,
  useSettingDailyGoal,
} from "@/app/setting/edit-daily-goal/hook";
import { useCurrentCourseId } from "@/app/home/hook/useCurrentCourseIdQuery";
import { useStudentAPI } from "@/app/setting/store/hook";
import { RootReduxState } from "@/providers/Redux/store";
import { useStudentFeed } from "@/app/notifications/hook/useStudentFeed";
import { useDailyChallenges } from "./hook/useDailyChallenges";

import "./styles.scss";

function SplashScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id, needOnboarding } = useSelector(
    (state: RootReduxState) => state.user
  );

  /** Before the development of the splash screen,
   You need to know that all steps are done for this because their data are
   needed several times throughout the entire program */

  /**
   * start 1 and 2 step :
   *    display splash screen view to user (1)
   *    and request to clinet to get all has_update key records (2)
   */
  useEffect(() => {
    dispatch(setFetchSyncRequestStatus("doing")); //(1)
    getSyncOnlyHasUpdateRecordsFromClient(); //(2)
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // request to clinet to get all has_update key records (2)
  const {
    data: syncOnlyHasUpdateRecordsFromClient,
    refetch: getSyncOnlyHasUpdateRecordsFromClient,
    isFetched: isFetchedGetSyncOnlyHasUpdateRecordsFromClient,
  } = useSyncOnlyHasUpdateRecordsMutation();

  // end 1 and 2 step

  /**
   * start 3 step :
   *    send only has_update records to server and get all fresh data from server,
   *    then put them in client sync database (3)
   */
  useEffect(() => {
    if (isFetchedGetSyncOnlyHasUpdateRecordsFromClient)
      requestToGetFreshSyncDataFromServer();
  }, [isFetchedGetSyncOnlyHasUpdateRecordsFromClient]);

  const {
    mutate: requestToGetFreshSyncDataFromServer,
    status: getServerSyncDataState,
  } = useSyncMutation();

  // end 3 step

  // start 4 step : get user current course id (4)
  const {
    mutate: getCurrentCourseId,
    status: statusGetCurrentCourseId,
    data: currentCourseId,
  } = useCurrentCourseId();

  useEffect(() => {
    const serverState = getServerSyncDataState;

    if (serverState === "success" || serverState === "error") {
      getCurrentCourseId();
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getServerSyncDataState]);
  // end 5 step

  // start third step : get user current course all data from server (5)
  const {
    refetch: requestToGetCurrentCourseAllData,
    error: errorGetCurrentCourse,
    status: statusGetCurrentCourse,
  } = useCurrentCourseData();

  useEffect(() => {
    if (
      statusGetCurrentCourseId === "error" ||
      statusGetCurrentCourseId === "success"
    ) {
      if (needOnboarding) {
        router.push("/onboarding");
        requestToGetCurrentCourseAllData();
      } else {
        if (typeof currentCourseId === "number") {
          requestToGetCurrentCourseAllData();
        } else {
          router.push("/select-grade");
          requestToGetShopData();
        }
      }
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusGetCurrentCourseId, currentCourseId, needOnboarding]);
  // end 5 step

  // start fourth step : get shop data from server (6)
  useEffect(() => {
    if (
      statusGetCurrentCourse === "success" ||
      statusGetCurrentCourse === "error"
    ) {
      requestToGetShopData();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusGetCurrentCourse]);

  const { status: statusGetShopData, mutate: requestToGetShopData } =
    useShopMutation();
  // end 6 step

  // start fifth step : hide splash screen and display app (7)
  useEffect(() => {
    if (statusGetShopData === "error" || statusGetShopData === "success") {
      // dispatch(setFetchSyncRequestStatus("done"));
      initialDataDailyGoal({});
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusGetShopData]);
  // end 7 step

  const { mutate: initialDataDailyGoal, status: statusGetDailyGoal } =
    useGetInitilaData();

  useEffect(() => {
    if (statusGetDailyGoal === "success" || statusGetDailyGoal === "error") {
      // dispatch(setFetchSyncRequestStatus("done"));
      settingXpDailyGoal({});
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusGetDailyGoal]);
  // end fifth step

  const { mutate: settingXpDailyGoal, status: statusGetXpGoal } =
    useSettingDailyGoal();

  useEffect(() => {
    if (id && (statusGetXpGoal === "error" || statusGetXpGoal === "success"))
      getStudentData(id);

    return () => {};
  }, [statusGetXpGoal]);

  const { mutate: getStudentData, status: statusUserData } = useStudentAPI();

  useEffect(() => {
    if (statusUserData === "error" || statusUserData === "success")
      getStudentFeed();

    return () => {};
  }, [statusUserData]);

  const { refetch: getStudentFeed, status: studentFeedStuts } =
    useStudentFeed();

  useEffect(() => {
    if (studentFeedStuts === "error" || studentFeedStuts === "success")
      getDailyChallenges();

    return () => {};
  }, [studentFeedStuts]);

  const { mutate: getDailyChallenges, status: dailyChallengesStuts } =
    useDailyChallenges();

  useEffect(() => {
    if (dailyChallengesStuts === "error" || dailyChallengesStuts === "success")
      dispatch(setFetchSyncRequestStatus("done"));

    return () => {};
  }, [dailyChallengesStuts]);

  return (
    <motion.div
      transition={{ duration: 0.1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box className="splash-screen" bgcolor="primary.main">
        <section className="welcome-animation">
          <Lottie play loop={true} animationData={WelcomeAnimation} />
        </section>

        <section className="typography">
          <Typography className="title">Zaban Amooz</Typography>
          <Typography className="sub-title">
            لذت یادگیری زبان انگلیسی
          </Typography>

          <div
            className="dynamic-content"
            style={{
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {syncOnlyHasUpdateRecordsFromClient?.version < 1 &&
            getServerSyncDataState === "error" ? (
              <RequestToTryRequset
                callback={requestToGetFreshSyncDataFromServer}
              />
            ) : statusGetCurrentCourse === "error" &&
              errorGetCurrentCourse?.message ===
                "get current course data fiald" ? (
              <RequestToTryRequset
                callback={requestToGetCurrentCourseAllData}
              />
            ) : (
              <LinearProgress className="splash-progress" color="info" />
            )}
          </div>
        </section>
      </Box>
    </motion.div>
  );
}

export default memo(SplashScreen);
