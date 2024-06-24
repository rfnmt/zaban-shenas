"use client";
import React, { memo } from "react";
import { Box, Toolbar } from "@mui/material";
import { motion } from "framer-motion";

import Content from "./page";
import { commonFramerMotionVariant } from "@/modules/helper";
import NavigateToBack from "@/components/navigateToBack/navigateToBack";

function ReportLayout(): JSX.Element {
  return (
    <Box bgcolor="background.main" className="report-main-wrapper">
      <NavigateToBack type="withBackButton" title="گزارش" />
      <Box component="main" className="container">
        <motion.div {...commonFramerMotionVariant}>
          <Content />
        </motion.div>
      </Box>
    </Box>
  );
}

export default memo(ReportLayout);
