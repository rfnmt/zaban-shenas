"use client";

import React from "react";
import { Box, Toolbar } from "@mui/material";
import { motion } from "framer-motion";

import Content from "./page";
import NavigateToBack from "@/components/navigateToBack/navigateToBack";
import { commonFramerMotionVariant } from "@/modules/helper";

function SettingLayout(): JSX.Element {
  return (
    <Box bgcolor="background.main" className="root-setting-wrapper">
      <NavigateToBack title="تنظیمات" type="withBackButton" />
      <Box component="main" className="container">
        <motion.div {...commonFramerMotionVariant}>
          <Content />
        </motion.div>
      </Box>
    </Box>
  );
}
export default SettingLayout;
