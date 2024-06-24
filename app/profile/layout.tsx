"use client";
import React, { useEffect } from "react";
import { RootReduxState } from "@/providers/Redux/store";
import { useSelector } from "react-redux";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { commonFramerMotionVariant } from "@/modules/helper";
import Content from "./page";
import { useStudentAPI } from "../setting/store/hook";
import NavigateToBack from "@/components/navigateToBack/navigateToBack";
import { useBadgeAPI } from "./hook";
import { IStudentData } from "../../models/studentData.interfaces";
import PageNavigator from "@/components/pageNavigator";
import "./style.scss";

function ProfileLayout() {
  const { id } = useSelector((state: RootReduxState) => state.user);
  const studentData = queryClient.getQueryData<IStudentData>(["student-data"]);
  const { mutate: getStudentData } = useStudentAPI();
  const { mutate: getBadge } = useBadgeAPI();

  useEffect(() => {
    if (!studentData && id) {
      getBadge({ badges: [] });
      getStudentData(id);
    } else if (studentData && id) {
      getBadge({ badges: [] });
      getStudentData(id);
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentData, id]);

  return (
    <>
      <Box
        bgcolor="background.main"
        className="main-profileLayout-wrapper container"
      >
        <NavigateToBack
          title={studentData?.profile_data?.data?.name || "کاربر"}
          type="withOptionsAndClose"
        />
        <Box component="main">
          <motion.div {...commonFramerMotionVariant}>
            <Content />
          </motion.div>
        </Box>
      </Box>
      <PageNavigator />
    </>
  );
}

export default ProfileLayout;
