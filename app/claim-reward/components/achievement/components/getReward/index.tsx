import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
import Counter from "@/components/counterAnimation";
import Lottie from "react-lottie-player";
import { RootReduxState } from "@/providers/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { IStudentData } from "@/models/studentData.interfaces";
import * as claimRewardAnimation from "@/public/lottie-files/claim-reward.json";
import * as finalBoosterAnimation from "@/public/lottie-files/finalboosts.json";
import * as streakAnimation from "@/public/lottie-files/streak.json";
import Z3DButton from "@/components/Z3DButton";
import { useRouter } from "next/navigation";
import { updateActivityType } from "@/providers/Redux/claimRewards/claimRewardsSlice";

function GetReward() {
  const dispatch = useDispatch();

  const theme = useTheme() as any;
  const router = useRouter();
  const [showTitleAndButton, setShowTitleAndButton] = useState(false);

  const { slug } = useSelector((state: RootReduxState) => state.claimRewards);

  const studentData = queryClient.getQueryData<IStudentData>(["student-data"]);

  const completedAchievementRewards = studentData?.achievement_rewards.filter(
    (item) => item.data.achievement_slug === slug
  );

  const totalGem = studentData?.attributes?.data.filter(
    (item) => item.name === "gem"
  );

  function typeOfClaimedReward(type: string) {
    if (type === "gem") {
      return "الماس";
    } else if (type === "booster") {
      return " تقویت کننده ";
    } else if (type === "streak_freeze") {
      return " محافظ زنجیره ";
    }
  }

  function typeOfMotivation(type: string) {
    if (type === "gem") {
      return (
        <Typography sx={{ color: theme.palette.gray["3"] }}>
          به یادگیری ادامه بده تا جوایز بیشتری به دست بیاری
        </Typography>
      );
    } else if (type === "booster") {
      return (
        <Typography>
          <Typography sx={{ color: theme.palette.gray["3"] }} variant="caption">
            امتیازی که با خوندن هر درس بدست میاری تا
          </Typography>
          <Typography
            sx={{ color: theme.palette.accent1.main }}
            variant="caption"
          >
            &nbsp; 15 دقیقه&nbsp;
          </Typography>
          <Typography sx={{ color: theme.palette.gray["3"] }} variant="caption">
            2 برابر حساب میشه
          </Typography>
        </Typography>
      );
    } else if (type === "streak_freeze") {
      return (
        <Typography sx={{ color: theme.palette.gray["3"] }}>
          اگه یادت رفت درس بخونی، با این زنجیرتو حفظ کن!
        </Typography>
      );
    }
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
                from={totalGem[0]?.value}
                to={
                  Number(totalGem[0]?.value) +
                  completedAchievementRewards[0]?.data?.reward_amount
                }
                duration={1}
                delay={3}
                onComplete={() => setShowTitleAndButton(true)}
              />
            </Typography>
          </motion.div>
        </Box>
        <Lottie
          loop={false}
          animationData={
            completedAchievementRewards[0]?.data?.reward_type === "gem"
              ? claimRewardAnimation
              : completedAchievementRewards[0]?.data?.reward_type === "booster"
              ? finalBoosterAnimation
              : streakAnimation
          }
          play={true}
          style={{ width: "430px", height: "275px", transform: "scale(2.2)" }}
        />
        {showTitleAndButton ? (
          <motion.div
            className="claim-reward-caption"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            key="caption"
          >
            <Box className="aquired-title">
              <Typography sx={{ color: theme.palette.gray["1"] }}>
                آفرین
              </Typography>

              <Typography sx={{ color: theme.palette.system.blue }}>
                {completedAchievementRewards[0]?.data?.reward_amount}{" "}
                {typeOfClaimedReward(
                  completedAchievementRewards[0]?.data?.reward_type
                )}
              </Typography>
              <Typography sx={{ color: theme.palette.gray["1"] }}>
                به دست آوردی
              </Typography>
            </Box>
            <Box className="motivation">
              {typeOfMotivation(
                completedAchievementRewards[0]?.data?.reward_type
              )}
            </Box>
          </motion.div>
        ) : (
          <></>
        )}
      </Box>
      {showTitleAndButton ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
          key="continueButton"
        >
          <Z3DButton
            onClick={() => {
              dispatch(updateActivityType("daily-quest"));

              router.push(localStorage.getItem("back-from-claim-reward"));
            }}
          >
            ادامه
          </Z3DButton>
        </motion.div>
      ) : (
        <></>
      )}
    </>
  );
}

export default GetReward;
