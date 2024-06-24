"use client";
import React from "react";
import { Box } from "@mui/material";
import NavigateToBack from "@/components/navigateToBack/navigateToBack";
import Content from "./page";
import "./style.scss";

function BadgesLayout() {
  return (
    <Box bgcolor="background.main" className="badges-layout">
      <NavigateToBack type="withBackButton" title="مدال ها" />
      <Box component="main">
        <Content />
      </Box>
    </Box>
  );
}

export default BadgesLayout;
