"use client";
import React, { useEffect } from "react";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { commonFramerMotionVariant } from "@/modules/helper";
import Content from "./page";
import NavigateToBack from "@/components/navigateToBack/navigateToBack";
import { useSelector } from "react-redux";
import { SuggestFreindRootData } from "../../interfaces";
import { usePathname } from "next/navigation";
import { useSpecificStudentsAPI } from "@/app/profile/hook";
import LottieLoading from "@/components/lottieLoading";

function FriendAchievementsLayout() {
  const pathName = usePathname();
  const { suggestedFriendID } = useSelector((state: any) => state.general);
  const getSingleStudentData = queryClient.getQueryData<SuggestFreindRootData>([
    "specific-student-data",
    suggestedFriendID === null || suggestedFriendID === undefined
      ? Number(pathName.split("/")[3])
      : suggestedFriendID,
  ]);

  const { mutate: getSpecificStudentData, isPending: loading } =
    useSpecificStudentsAPI();

  useEffect(() => {
    if (
      !getSingleStudentData &&
      (suggestedFriendID || Number(pathName.split("/")[3]))
    ) {
      getSpecificStudentData(
        suggestedFriendID || Number(pathName.split("/")[3])
      );
    }
  }, [getSingleStudentData, suggestedFriendID]);

  return (
    <>
      <Box
        bgcolor="background.main"
        className="main-friendAchievementsLayout-wrapper container"
      >
        <NavigateToBack title="دستاوردها" type="withBackButton" />
        <Box component="main">
          <LottieLoading
            open_lottie={loading}
            lottie_className="single-suggested-friends-loading"
          />
          {!loading ? (
            <motion.div {...commonFramerMotionVariant}>
              <Content />
            </motion.div>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </>
  );
}

export default FriendAchievementsLayout;
