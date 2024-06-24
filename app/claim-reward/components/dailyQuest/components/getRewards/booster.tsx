import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import Lottie from "react-lottie-player";
import { useDispatch, useSelector } from "react-redux";

import { RootReduxState } from "@/providers/Redux/store";
import { updateDailyQuestData } from "@/providers/Redux/claimRewards/claimRewardsSlice";
import { ChallengeRewardsItem } from "@/models/dailyChallenge.interface";
import * as finalBoosterAnimation from "@/public/lottie-files/finalboosts.json";
import Counter from "@/components/counterAnimation";
import Z3DButton from "@/components/Z3DButton";

function Booster({ data }: { data: ChallengeRewardsItem[] }) {
  const theme = useTheme() as any;
  const dispatch = useDispatch();

  const { dailyQuestData } = useSelector(
    (state: RootReduxState) => state.claimRewards
  );

  const rewardType = data[0]?.reward_type;
  const rewardAmount = data
    ? data.reduce((total, curr) => total + (curr?.reward_amount || 0), 0)
    : 0;

  function updatingDailyQuest() {
    let preDailyQuestData = { ...dailyQuestData };

    delete preDailyQuestData[rewardType];

    dispatch(updateDailyQuestData(preDailyQuestData));
  }

  return (
    <>
      <Box className="get-rewards">
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
              <Counter
                from={0}
                to={Number(0) + rewardAmount}
                duration={1}
                delay={3}
              />
            </Typography>
          </motion.div>
        </Box>
        <Lottie
          loop={false}
          animationData={finalBoosterAnimation}
          play={true}
          style={{ width: "430px", height: "275px", transform: "scale(2.2)" }}
        />
        <motion.div
          className="claim-reward-caption"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4 }}
          key="caption"
        >
          <Box className="aquired-title">
            <Typography sx={{ color: theme.palette.gray["1"] }}>
              آفرین
            </Typography>

            <Typography sx={{ color: theme.palette.system.blue }}>
              {rewardAmount} تقویت کننده
            </Typography>
            <Typography sx={{ color: theme.palette.gray["1"] }}>
              به دست آوردی
            </Typography>
          </Box>
          <Box className="motivation">
            <Typography>
              <Typography
                sx={{ color: theme.palette.gray["3"] }}
                variant="caption"
              >
                امتیازی که با خوندن هر درس بدست میاری تا
              </Typography>
              <Typography
                sx={{ color: theme.palette.accent1.main }}
                variant="caption"
              >
                &nbsp; 15 دقیقه&nbsp;
              </Typography>
              <Typography
                sx={{ color: theme.palette.gray["3"] }}
                variant="caption"
              >
                2 برابر حساب میشه
              </Typography>
            </Typography>
          </Box>
        </motion.div>
      </Box>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 6 }}
        key="continueButton"
      >
        <Z3DButton onClick={updatingDailyQuest}>ادامه</Z3DButton>
      </motion.div>
    </>
  );
}

export default Booster;