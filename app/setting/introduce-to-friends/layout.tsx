"use client";
import React from "react";
import { motion } from "framer-motion";
import { Box, Toolbar } from "@mui/material";

import NavigateToBack from "@/components/navigateToBack/navigateToBack";
import Content from "./page";
import { commonFramerMotionVariant } from "@/modules/helper";

function IntroduceToFriendsLayout(): JSX.Element {
  return (
    <Box bgcolor="background.main" className="introduce_wrapper">
      <NavigateToBack type="withBackButton" title="معرفی به دوستان" />
      <Box component="main" className="container">
        <motion.div {...commonFramerMotionVariant}>
          <Content />
        </motion.div>
      </Box>
    </Box>
  );
}

export default IntroduceToFriendsLayout;
