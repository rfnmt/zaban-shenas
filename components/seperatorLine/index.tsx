"use client";
import { Box } from "@mui/material";
import React from "react";

function SeperatorLine() {
  return (
    <Box className="seperator-line">
      <Box
        sx={{
          backgroundColor: (theme) => `${theme.palette.border.main} !important`,
        }}
        className="thin-line"
      />
      <Box
        sx={{
          color: (theme) => `${theme.palette.border.main} !important`,
        }}
        className="or"
      >
        یا
      </Box>
      <Box
        sx={{
          backgroundColor: (theme) => `${theme.palette.border.main} !important`,
        }}
        className="thin-line"
      />
    </Box>
  );
}

export default SeperatorLine;
