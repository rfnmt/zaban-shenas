"use client";
import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

import { commonFramerMotionVariant } from "@/modules/helper";
import Content from "./page";

import "./style.scss";

function ClaimRewardLayout() {
  return (
    <Box
      bgcolor="background.main"
      className="claim-reward-Layout-wrapper container"
    >
      <Box component="main">
        <motion.div {...commonFramerMotionVariant}>
          <Content />
        </motion.div>
      </Box>
    </Box>
  );
}

export default ClaimRewardLayout;
