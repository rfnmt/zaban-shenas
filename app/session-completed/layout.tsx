"use client";

import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

import { commonFramerMotionVariant } from "@/modules/helper";
import Content from "./page";

import "./style.scss";

function SessionCompletedLayout() {
  return (
    <Box
      sx={{ backgroundColor: "background.main" }}
      className="session-completed"
    >
      <motion.div {...commonFramerMotionVariant}>
        <Content />
      </motion.div>
    </Box>
  );
}

export default SessionCompletedLayout;
