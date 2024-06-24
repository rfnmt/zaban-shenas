"use client";
import React from "react";
import { Box } from "@mui/material";
import NavigateToBack from "@/components/navigateToBack/navigateToBack";
import Content from "./page";

function SuggestedFriendsLayout() {
  return (
    <Box bgcolor="background.main" className="suggested-friends-layout">
      <NavigateToBack type="withBackButton" title="اضافه کردن دوستان جدید" />
      <Box component="main">
        <Content />
      </Box>
    </Box>
  );
}

export default SuggestedFriendsLayout;
