"use client";
import React from "react";
import { Box } from "@mui/material";
import Content from "./page";
import { commonFramerMotionVariant } from "@/modules/helper";
import { motion } from "framer-motion";
import "./style.scss";

function WhatIsStreakLayout() {
  return (
    <Box
      className="whatIsStreakLayout-wrapper container"
      bgcolor="background.main"
    >
      <motion.div
        {...commonFramerMotionVariant}
        className="whatIsStreak-animation"
      >
        <Content />
      </motion.div>
    </Box>
  );
}

export default WhatIsStreakLayout;
