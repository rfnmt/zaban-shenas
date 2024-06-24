"use client";
import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import Z3DButton from "@/components/Z3DButton";
import { useRouter } from "next/navigation";
import FirstStreakMessage from "./components/firstStreakMessage";
import SecondStreakMessage from "./components/secondStreakMessage";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { useDailyChallenges } from "@/components/spalashScreen/hook/useDailyChallenges";
import { nextPageAfterCurrentPage } from "@/modules/navigationToNextPageAfterCompleteSession";

function WhatIsStreakPage() {
  const theme = useTheme() as any;
  const router = useRouter();
  const [animation, setAnimation] = useState(false);
  const [increaseCounterValue, setIncreaseCounterValue] = useState(true);
  const [decreaseCounterValue, setDecreaseCounterValue] = useState(false);
  const [showContinueButton, setshowContinueButton] = useState(false);
  const [goNext, setGoNext] = useState(true);

  useEffect(() => {
    const time = window.setTimeout(() => {
      setAnimation(true);
    }, 600);
    const time2 = window.setTimeout(() => {
      setIncreaseCounterValue(false);
      setDecreaseCounterValue(true);
      setAnimation(false);
    }, 9000);

    return () => {
      clearTimeout(time2);
      clearTimeout(time);
    };
  }, []);

  const cachedDailyChallengeData = queryClient.getQueryData(["user-challenge"]);

  useEffect(() => {
    if (!cachedDailyChallengeData) getDailyChallenges();
    return () => {};
  }, []);

  const { mutate: getDailyChallenges } = useDailyChallenges();

  function navigationToNextPage() {
    nextPageAfterCurrentPage("streak").then(function (nextPage) {
      router.push(nextPage);
    });
  }

  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/daily-challenge");
  }, [router]);

  return (
    <Box
      className="whatIsStreak-data"
      sx={{
        "& .get-streak-days": {
          "& div": {
            color: animation
              ? theme.palette.accent1.main
              : theme.palette.gray["3"],
          },
        },
      }}
    >
      {goNext ? (
        <FirstStreakMessage
          animation={animation}
          increaseCounterValue={increaseCounterValue}
          decreaseCounterValue={decreaseCounterValue}
          setshowContinueButton={setshowContinueButton}
        />
      ) : (
        <SecondStreakMessage />
      )}

      {showContinueButton && (
        <motion.div
          className="continueButton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          key="continueButton"
        >
          <Z3DButton
            onClick={() => {
              setGoNext(false);
              if (goNext === false) {
                navigationToNextPage();
              }
            }}
          >
            ادامه
          </Z3DButton>
        </motion.div>
      )}
    </Box>
  );
}

export default WhatIsStreakPage;
