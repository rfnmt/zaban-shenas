"use client";
import React from "react";
import { Box, useTheme } from "@mui/material";
import "./settingChildsHeader.scss";

function SettingChildsHeader({ title }: { title?: string }) {
  const theme = useTheme() as any;
  return (
    <Box
      className="setting-childs-header"
      sx={{
        color: `${theme.palette.gray["2"]} !important`,
      }}
    >
      {title ? <p>{title}</p> : <></>}
    </Box>
  );
}

export default SettingChildsHeader;
