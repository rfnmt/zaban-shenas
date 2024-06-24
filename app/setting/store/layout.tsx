"use client";
import React from "react";
import { Box, Toolbar } from "@mui/material";
import { motion } from "framer-motion";
import NavigateToBack from "@/components/navigateToBack/navigateToBack";
import Content from "./page";
import { commonFramerMotionVariant } from "@/modules/helper";
import BoosterSuccessBottomSheet from "@/components/boosterSuccessBottomSheet";
import CommonSuccessfulBottomsheet from "@/components/commonSuccessfulBottomsheet";

function StoreLayout(): JSX.Element {
  return (
    <Box bgcolor="background.main" className="wrap-store">
      <NavigateToBack type="theNumberOfGems" title="فروشگاه" />
      <Box component="main" className="container">
        <motion.div {...commonFramerMotionVariant}>
          <Content />
        </motion.div>
        <BoosterSuccessBottomSheet />
        <CommonSuccessfulBottomsheet />
      </Box>
    </Box>
  );
}

export default StoreLayout;
