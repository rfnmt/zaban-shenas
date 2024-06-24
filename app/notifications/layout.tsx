"use client";

import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import { commonFramerMotionVariant } from "@/modules/helper";

import { RootReduxState } from "@/providers/Redux/store";
import {
  APP_VERSION,
  NEXT_PUBLIC_CRISP_URL,
  NEXT_PUBLIC_CRISP_WEBSITE_ID,
} from "@/env";
import PageNavigator from "@/components/pageNavigator";
import Content from "./page";
import NavigateToBack from "@/components/navigateToBack/navigateToBack";
import Icon from "@/components/icon";

import "./styles.scss";
import { useStudentFeed } from "./hook/useStudentFeed";

function Notifications() {
  const { email, phone } = useSelector((state: RootReduxState) => state.user);

  function newChatWithSupportTeam() {
    let url = `${NEXT_PUBLIC_CRISP_URL}?website_id=${NEXT_PUBLIC_CRISP_WEBSITE_ID}&app_version=${APP_VERSION}&platform=pwa&app_name=zabanamooz`;
    if (email) url += `&email=${email}`;
    if (phone) url += `&phone=${phone}`;

    window.open(url);
  }

  return (
    <Box bgcolor="background.main" className="notifications-wrapper">
      <Box component="main" bgcolor="background.main">
        <NavigateToBack title="اعلانات" />
        <motion.div {...commonFramerMotionVariant}>
          <Content />
        </motion.div>
      </Box>

      <Button
        variant="contained"
        onClick={newChatWithSupportTeam}
        className="new-message-wrapper"
      >
        <Icon icon="support_contact" size="24" />
        &nbsp; پشتیبانی
      </Button>
      <PageNavigator />
    </Box>
  );
}

export default Notifications;
