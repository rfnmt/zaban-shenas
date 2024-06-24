"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import Z3DButton from "@/components/Z3DButton";
import Counter from "@/components/counterAnimation";
import ChallengesInfoWithProgress from "@/components/challengesInfoWithProgress";
import { nextPageAfterCurrentPage } from "@/modules/navigationToNextPageAfterCompleteSession";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { DailyChallengeTypes } from "../../models/dailyChallenge.interface";

function DailyChallengePage() {
  const theme = useTheme() as any;
  const router = useRouter();

  const cachedDailyChallengeData =
    queryClient.getQueryData<DailyChallengeTypes>(["user-challenge"]);

  function navigationToNextPage() {
    localStorage.setItem(
      "challenges",
      JSON.stringify(cachedDailyChallengeData)
    );

    nextPageAfterCurrentPage("daily-challenge").then(function (nextPage) {
      router.push(nextPage);
    });
  }

  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/onboarding");
  }, [router]);

  return (
    <Box className="daily-challenge-page">
      <Box>
        <Box className="gemImage-totalGem">
          <Image src="/svg/diamond.svg" width={22.73} height={20.21} alt="" />
          <motion.div
            key="get-gem-reward"
            transition={{ delay: 2.5, duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Typography
              className="aquired-gems"
              sx={{
                color: theme.palette.system.blue,
              }}
            >
              <Counter from={0} to={20} duration={1} delay={3} />
            </Typography>
          </motion.div>
        </Box>

        <Typography
          className="challenge-title"
          sx={{ color: theme.palette.accent1.main }}
        >
          چالش روزانه
        </Typography>

        <ChallengesInfoWithProgress />
      </Box>
      <Z3DButton onClick={navigationToNextPage}>ادامه</Z3DButton>
    </Box>
  );
}

export default DailyChallengePage;
