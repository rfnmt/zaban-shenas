"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useTheme, Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "react-lottie-player";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { RootReduxState } from "@/providers/Redux/store";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { CurrentCourseInterface } from "@/models/currentCourse.interfaces";
import { useDailyChallenges } from "@/components/spalashScreen/hook/useDailyChallenges";
import { nextPageAfterCurrentPage } from "@/modules/navigationToNextPageAfterCompleteSession";
import { resetLoading } from "@/providers/Redux/loading/loadingSlice";
import * as completeStorySession from "@/public/lottie-files/completed-session.json";
import * as completeQuestionSession from "@/public/lottie-files/question_result.json";
import Counter from "@/components/counterAnimation";

function SessionCompletedLayout() {
  const theme = useTheme() as any;
  const dispatch = useDispatch();
  const router = useRouter();

  const latestSessionIDUserStudy = useSelector(
    (state: RootReduxState) => state.session.latestSessionIDUserStudy
  );

  const [playingLottie, setplayingLottie] = useState(false);

  const { accuracy, gainedXp } = useSelector(
    (state: RootReduxState) => state.session
  );

  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/streak");
    router.prefetch("/daily-challenge");
  }, [router]);

  const cachedUserCurrentCourseId: number | undefined =
    queryClient.getQueryData(["user-current-course-id"]);

  const cachedUserCurrentCourseAllData =
    queryClient.getQueryData<CurrentCourseInterface>([
      "user-current-course-all-data",
      cachedUserCurrentCourseId,
    ]);

  const sessionCompleteType = useMemo(() => {
    if (cachedUserCurrentCourseAllData?.sessions) {
      return cachedUserCurrentCourseAllData?.sessions.find(
        (item) => item.id === latestSessionIDUserStudy
      )?.data.type === "story"
        ? "داستان"
        : "درس";
    } else return "درس";
  }, [cachedUserCurrentCourseAllData, latestSessionIDUserStudy]);

  const cachedDailyChallengeData = queryClient.getQueryData(["user-challenge"]);

  useEffect(() => {
    if (!cachedDailyChallengeData) getDailyChallenges();
    return () => {};
  }, []);

  const { mutate: getDailyChallenges } = useDailyChallenges();

  function navigationToNextPage() {
    nextPageAfterCurrentPage("session-complete").then(function (nextPage) {
      router.push(nextPage);
    });
  }

  useEffect(() => {
    dispatch(resetLoading());
    return () => {};
  }, []);

  return (
    <>
      <audio src="/audios/level-completed.wav" autoPlay />
      <motion.div className="wrap-animate" key="complete">
        <motion.p
          key="title"
          transition={{ duration: 0.4 }}
          initial={{ y: "200px" }}
          animate={{ y: "0px" }}
          style={{ color: theme.palette.gray[1] }}
          className="title"
        >
          احسنت! این {sessionCompleteType} رو تموم کردی
        </motion.p>

        <div className="wrap-lottie-animation">
          {playingLottie && (
            <Lottie
              loop={true}
              play={true}
              className="lottie-animation"
              animationData={
                sessionCompleteType === "داستان"
                  ? completeStorySession
                  : completeQuestionSession
              }
              style={{ width: 240, position: "relative" }}
            />
          )}
        </div>

        <motion.div key="statistics" className="statistics" transition={{}}>
          <motion.div
            key="accuracy"
            transition={{ delay: 0.4, duration: 1 }}
            initial={{ x: "400px", opacity: 0 }}
            animate={{ x: "0", opacity: 1 }}
          >
            <Box className="accuracy">
              <motion.div
                key="accuracy-typography"
                transition={{ delay: 1.5 }}
                initial={{ height: "0px", display: "none" }}
                animate={{ height: "29px", display: "block" }}
              >
                <Typography className="statistic-title">
                  نمره‌ات در این آزمون
                </Typography>
              </motion.div>
              <Box
                className="statistic-detail"
                sx={{
                  backgroundColor: "white.flexible",
                  color: "gray.1",
                }}
              >
                <motion.div
                  key="accuracy-statistic-detail-typography"
                  transition={{ delay: 2.5, duration: 1 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Box sx={{ color: "gray.1" }} className="typography">
                    <div className="bold">
                      <Counter from={0} to={accuracy} duration={1} delay={3} />
                    </div>
                    <div className="tag"> درصد </div>
                  </Box>
                </motion.div>
                <motion.div
                  key="accuracy-statistic-detail-icon"
                  transition={{ delay: 2, duration: 1 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="icon">
                    <Image
                      alt="score"
                      width={36}
                      height={36}
                      src="/svg/score.svg"
                    />
                  </div>
                </motion.div>
              </Box>
            </Box>
          </motion.div>

          <motion.div
            key="gained-xp"
            transition={{
              delay: 4,
              duration: 1,
            }}
            initial={{ x: "100px", opacity: 0 }}
            animate={{ x: "0", opacity: 1 }}
          >
            <Box className="gained-xp">
              <motion.div
                key="gained-xp-typography"
                transition={{ delay: 5 }}
                initial={{ height: "0px", display: "none" }}
                animate={{ height: "29px", display: "block" }}
              >
                <Typography className="statistic-title">
                  امتیازی که گرفتی
                </Typography>
              </motion.div>

              <Box
                className="statistic-detail"
                sx={{ backgroundColor: "white.flexible" }}
              >
                <motion.div
                  key="gained-xp-detail-typography"
                  transition={{ delay: 6, duration: 1 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Box sx={{ color: "gray.1" }} className="typography">
                    <div className="bold">
                      <Counter
                        from={0}
                        to={gainedXp}
                        duration={1}
                        delay={6.5}
                        onComplete={() => setplayingLottie(true)}
                      />
                    </div>
                    <div className="tag">امتیاز</div>
                  </Box>
                </motion.div>

                <motion.div
                  key="gained-xp-statistic-detail-icon"
                  transition={{ delay: 5.5, duration: 1 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="icon">
                    <Image
                      alt="star"
                      width={36}
                      height={36}
                      src="/svg/star.svg"
                    />
                  </div>
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        </motion.div>
        <Button
          className="continue"
          onClick={navigationToNextPage}
          sx={{
            backgroundColor: "primary.main",
            "&:hover": { backgroundColor: "primary.main" },
            "&:focus": { backgroundColor: "primary.dark" },
          }}
        >
          ادامه
        </Button>
      </motion.div>
    </>
  );
}

export default SessionCompletedLayout;
