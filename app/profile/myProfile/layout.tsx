"use client";
import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { commonFramerMotionVariant } from "@/modules/helper";
import Content from "./page";
import NavigateToBack from "@/components/navigateToBack/navigateToBack";
import "./style.scss";

function MyProfileLayout() {
  return (
    <Box
      bgcolor="background.main"
      className="main-myProfileLayout-wrapper container"
    >
      <NavigateToBack title="ویرایش پروفایل" type="withBackAndSave" />
      <Box component="main">
        <motion.div {...commonFramerMotionVariant}>
          <Content />
        </motion.div>
      </Box>
    </Box>
  );
}

export default MyProfileLayout;
