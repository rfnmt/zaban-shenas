"use client";
import React, { MouseEventHandler } from "react";

import { Box, Button, useTheme } from "@mui/material";
import "./settingsChild.scss";
import Icon from "../../icon";
interface Data {
  icon: any;
  title: string;
  handleClickEvent?: MouseEventHandler;
  customIcon?: boolean;
}

const SettingsChild = ({ icon, title, handleClickEvent, customIcon }: Data) => {
  const theme = useTheme() as any;
  return (
    <Button
      className="settings-child"
      onClick={handleClickEvent}
      sx={{
        borderColor: `${theme.palette.border.main} !important`,
      }}
    >
      <Icon icon={icon} className="setting-colored-icons" />
      <Box
        className="setting-title"
        sx={{
          color: `${theme.palette.gray["1"]} !important`,
        }}
      >
        {title}
      </Box>
      <Box
        className="navigate-wrapper"
        sx={{
          "& svg": {
            "& path": {
              fill: customIcon ? "" : `${theme.palette.icon["2"]} !important`,
            },
          },
        }}
      >
        <Icon
          icon={`${customIcon ? "open_in_new_black" : "chevron-left"}`}
          className={`${customIcon ? "custom_icon" : "navigate-icon"}`}
        />
      </Box>
    </Button>
  );
};

export default SettingsChild;
