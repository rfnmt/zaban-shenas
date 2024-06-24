import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Roundy from "roundy";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProfileChainScoreInfo from "../profileChainScoreInfo";
import { IStudentData } from "@/models/studentData.interfaces";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { InitialData } from "@/app/setting/initialData.interfaces";
import { INotification } from "@/app/setting/notifications.interfaces";
import * as profileDone from "@/public/lottie-files/profile-done.json";
import "./style.scss";
import { getUserGaindXpByDate } from "@/providers/Dexie/experiences";
import { useSelector } from "react-redux";
import { RootReduxState } from "@/providers/Redux/store";
import Lottie from "react-lottie-player";

function UserLearningStatistics() {
  const theme = useTheme() as any;
  const router = useRouter();
  const studentData = queryClient.getQueryData<IStudentData>(["student-data"]);
  const singleUserScoreAndChain = studentData?.attributes?.data.filter(
    (item: any) => item.name === "current_streak" || item.name === "total_xp"
  );
  const userInitialData = queryClient.getQueryData<InitialData>([
    "user-initial-data",
  ]);
  const preStoredData = queryClient.getQueryData<INotification>([
    "setting-daily-goal",
  ]);
  const dailyGoalXp = preStoredData?.settings?.data?.daily_goal_xp;
  const getUserDailyGoal = userInitialData?.daily_goals?.data.find(
    (item) => item.slug === dailyGoalXp
  );

  const today = dayjs().format("YYYY-MM-DD");
  const { id } = useSelector((state: RootReduxState) => state.user);

  const [userGaindXP, setUserGaindXP] = useState(0);

  useEffect(() => {
    getUserGaindXpByDate(today).then(function (res) {
      if (res === undefined) {
        setUserGaindXP(0);
      } else {
        setUserGaindXP(res?.gained_xp);
      }
    });

    return () => {};
  }, []);

  function inspirationText() {
    if (userGaindXP === 0) {
      return (
        <Typography sx={{ color: theme.palette.white.fix }}>
          روزانه {Number(getUserDailyGoal?.daily_goal_xp)} کسب کن تا تو مسیر
          یادگیری بمونی!
        </Typography>
      );
    } else if (
      userGaindXP > 0 &&
      userGaindXP < getUserDailyGoal?.daily_goal_xp
    ) {
      return (
        <Typography sx={{ color: theme.palette.white.fix }}>
          ایول خوب پیش اومدی، فقط{" "}
          {Number(getUserDailyGoal?.daily_goal_xp) - Number(userGaindXP)} امتیاز
          دیگه مونده تا هدف روزانه‌ت
        </Typography>
      );
    } else if (userGaindXP >= getUserDailyGoal?.daily_goal_xp) {
      return (
        <Typography sx={{ color: theme.palette.white.fix }}>
          آفرین کارت حرف نداشت به هدف روزانه ت رسیدی !
        </Typography>
      );
    }
  }

  return (
    <Box className="learning-statistics">
      <Typography sx={{ color: theme.palette.gray["1"] }}>
        آمار یادگیری
      </Typography>
      <Box
        className="profile-daily-goal"
        onClick={() => router.push("/setting/edit-daily-goal")}
      >
        <Box className="profile-animation-progressBar">
          {userGaindXP > getUserDailyGoal?.daily_goal_xp ? (
            <Lottie
              loop={true}
              play={true}
              className="profile-lottie-animation"
              animationData={profileDone}
              style={{ width: 77, height: 77, position: "relative" }}
            />
          ) : (
            <Box className="roundy-wrapper">
              <Roundy
                value={(userGaindXP / getUserDailyGoal?.daily_goal_xp) * 100}
                min={0}
                max={100}
                allowClick={false}
                radius={50}
                color={theme.palette.white.fix}
                bgColor={theme.palette.white.transparent}
                arcSize={180}
                strokeWidth={10}
              />
              <>
                {userGaindXP === 0 ? (
                  <Box className="without-any-score">
                    <Typography sx={{ color: theme.palette.white.fix }}>
                      ___
                    </Typography>
                    <Typography sx={{ color: theme.palette.white.fix }}>
                      ___
                    </Typography>
                  </Box>
                ) : (
                  <Box className="score">
                    <Typography sx={{ color: theme.palette.white.fix }}>
                      امتیاز
                    </Typography>
                    <Typography sx={{ color: theme.palette.white.fix }}>
                      {userGaindXP}
                    </Typography>
                  </Box>
                )}
              </>
            </Box>
          )}
        </Box>
        <Box className="daily-discription">
          <Box sx={{ color: theme.palette.white.fix }}>
            <Image src="/svg/target.svg" width={24} height={24} alt="" />
            <Typography sx={{ color: theme.palette.white.fix }}>
              هدف روزانه
            </Typography>
          </Box>
          {inspirationText()}
        </Box>
      </Box>
      <ProfileChainScoreInfo
        current_streak={
          singleUserScoreAndChain && singleUserScoreAndChain[0]?.value
        }
        total_xp={singleUserScoreAndChain && singleUserScoreAndChain[1]?.value}
      />
    </Box>
  );
}

export default UserLearningStatistics;
