"use client";
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import NavigateToBack from "@/components/navigateToBack/navigateToBack";
import { motion } from "framer-motion";
import { commonFramerMotionVariant } from "@/modules/helper";
import Content from "./page";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { useSpecificStudentsAPI } from "../../hook";
import GiftBottomSheet from "./components/giftBottomSheet";
import { SuggestFreindRootData } from "../interfaces";
import { useSelector } from "react-redux";
import LottieLoading from "@/components/lottieLoading";
import { usePathname } from "next/navigation";
import SuccessfulGiftBottomSheet from "./components/successfulGiftBottomsheet";

function SingleSuggestedFriendsLayout() {
  const pathName = usePathname();
  const { suggestedFriendID } = useSelector((state: any) => state.general);
  const getSingleStudentData = queryClient.getQueryData<SuggestFreindRootData>([
    "specific-student-data",
    suggestedFriendID === null
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
    <Box
      bgcolor="background.main"
      className="main-single-student-Layout-wrapper container"
    >
      <NavigateToBack
        title={getSingleStudentData?.profile_data?.data?.name}
        type="withBackAndMoreIcon"
      />

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

        <GiftBottomSheet />
        <SuccessfulGiftBottomSheet />
      </Box>
    </Box>
  );
}

export default SingleSuggestedFriendsLayout;
