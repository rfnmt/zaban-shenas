"use client";
import React from "react";
import Content from "./page";
import { Box } from "@mui/material";
import { commonFramerMotionVariant } from "@/modules/helper";
import { motion } from "framer-motion";
import "./style.scss";

function StreakLayout() {
  return (
    <Box className="streak-wrapper container" bgcolor="background.main">
      <motion.div
        {...commonFramerMotionVariant}
        className="streak-page-animation"
      >
        <Content />
      </motion.div>
    </Box>
  );
}

export default StreakLayout;
