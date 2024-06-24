"use client";

import React from "react";
import { Box, Toolbar } from "@mui/material";
import { motion } from "framer-motion";

import Content from "./page";
import NavigateToBack from "@/components/navigateToBack/navigateToBack";
import { commonFramerMotionVariant } from "@/modules/helper";

function AppearanceLayout(): JSX.Element {
  return (
    <Box bgcolor="background.main" className="appearance-main-wrapper">
      <NavigateToBack title="ظاهر" type="withBackButton" />
      <Box component="main" className="container">
        <motion.div {...commonFramerMotionVariant}>
          <Content />
        </motion.div>
      </Box>
    </Box>
  );
}

export default AppearanceLayout;
