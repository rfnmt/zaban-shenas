"use client";
import React, { useEffect, useState } from "react";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { commonFramerMotionVariant } from "@/modules/helper";
import Content from "./page";
import NavigateToBack from "@/components/navigateToBack/navigateToBack";
import { InitialData } from "@/app/setting/initialData.interfaces";
import { IStudentData } from "@/models/studentData.interfaces";
import { useSelector } from "react-redux";
import { RootReduxState } from "@/providers/Redux/store";
import { useStudentAPI } from "@/app/setting/store/hook";

function AchievementsLayout() {
  const [userAchievements, setUserAchievements] = useState<Array<any>>([]);
  const studentData = queryClient.getQueryData<IStudentData>(["student-data"]);
  const userInitialData = queryClient.getQueryData<InitialData>([
    "user-initial-data",
  ]);
  const { id } = useSelector((state: RootReduxState) => state.user);
  const { mutate: getStudentData } = useStudentAPI();
  useEffect(() => {
    if (studentData) {
      setUserAchievements([]);
      for (const userGainedAchievements of userInitialData?.achievements
        ?.data) {
        for (const allExistedAchievements of studentData?.attributes?.data) {
          if (
            userGainedAchievements.parameter === allExistedAchievements.name
          ) {
            setUserAchievements((prev) => [
              ...prev,
              {
                userGainedAchievements,
                allExistedAchievements,
              },
            ]);
          }
        }
      }
    }
    if (!studentData && id) {
      getStudentData(id);
    } else if (studentData && id) {
      getStudentData(id);
    }
  }, [studentData, id]);

  // useEffect(() => {
  //   if (!studentData && id) {
  //     getStudentData(id);
  //   } else if (studentData && id) {
  //     getStudentData(id);
  //   }

  //   return () => {};
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [studentData, id]);

  return (
    <>
      <Box
        bgcolor="background.main"
        className="main-achievementsLayout-wrapper container"
      >
        <NavigateToBack title="دستاوردها" type="withBackButton" />
        <Box component="main">
          <motion.div {...commonFramerMotionVariant}>
            <Content userAchievements={userAchievements} />
          </motion.div>
        </Box>
      </Box>
    </>
  );
}

export default AchievementsLayout;
