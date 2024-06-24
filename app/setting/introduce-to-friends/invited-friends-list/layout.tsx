"use client";
import React from "react";
import { motion } from "framer-motion";
import { Box, Toolbar } from "@mui/material";

import NavigateToBack from "@/components/navigateToBack/navigateToBack";
import Content from "./page";
import { commonFramerMotionVariant } from "@/modules/helper";

function InvitedFriendsListLayout(): JSX.Element {
  return (
    <Box bgcolor="background.main" className="invited_friends_list_wrapper">
      <NavigateToBack type="withBackButton" title="افرادی که دعوت کردی" />
      <Box component="main" className="container">
        <motion.div {...commonFramerMotionVariant}>
          <Content />
        </motion.div>
      </Box>
    </Box>
  );
}

export default InvitedFriendsListLayout;
