"use client";
import React, { memo } from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Content from "./page";
import { commonFramerMotionVariant } from "@/modules/helper";
import NavigateToBack from "@/components/navigateToBack/navigateToBack";

function NotificationLayout(): JSX.Element {
  return (
    <Box bgcolor="background.main" className="notification-main-wrapper">
      <NavigateToBack type="withBackButton" title="اعلان‌ها و یادآورها" />
      <Box component="main" className="container">
        <motion.div {...commonFramerMotionVariant}>
          <Content />
        </motion.div>
      </Box>
    </Box>
  );
}

export default memo(NotificationLayout);
