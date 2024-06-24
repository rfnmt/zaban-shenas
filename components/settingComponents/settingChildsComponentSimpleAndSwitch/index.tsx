"use client";
import React, { MouseEventHandler } from "react";
import { Box, Button, Switch, useTheme } from "@mui/material";
import "./settingChildsComponentSimpleAndSwitch.scss";
import Icon from "../../icon";

interface AllCommingData {
  withSwitch: boolean;
  handleOnClickFunction?: MouseEventHandler;
  rightTextContent: string;
  leftTextContent?: string;
  state1?: boolean;
}

function SettingChildsComponentSimpleAndSwitch({
  withSwitch,
  handleOnClickFunction,
  rightTextContent,
  leftTextContent,
  state1,
}: AllCommingData) {
  const theme = useTheme() as any;
  return (
    <Button
      className="same-size-boxes"
      onClick={handleOnClickFunction}
      sx={{
        "&::before": {
          backgroundColor: `${theme.palette.border.main} !important`,
        },
        borderColor: `${theme.palette.border.main} !important`,
      }}
    >
      <Box
        className="right-content"
        sx={{ color: `${theme.palette.gray["1"]} !important` }}
      >
        {rightTextContent}
      </Box>
      <Box
        className="left-content"
        sx={{ color: `${theme.palette.gray["2"]} !important` }}
      >
        {!withSwitch ? (
          <>
            <span className="same-fontSize">{leftTextContent}</span>
            <Box
              className="navigate-wrapper"
              sx={{
                "& svg": {
                  "& path": {
                    fill: `${theme.palette.icon["2"]} !important`,
                  },
                },
              }}
            >
              <Icon icon="chevron-left" className="navigate-icon" />
            </Box>
          </>
        ) : (
          <Switch
            checked={state1 !== null && state1}
            aria-label="switch-button"
            className="custom-switch"
            sx={{
              "& .MuiButtonBase-root": {
                color: state1
                  ? `${theme.palette.system.blue} !important`
                  : `${theme.palette.gray["3"]} !important`,
              },
              "& .MuiSwitch-track": {
                backgroundColor: state1
                  ? `${theme.palette.system.blue} !important`
                  : `${theme.palette.gray["3"]} !important`,
              },
            }}
          />
        )}
      </Box>
    </Button>
  );
}

export default SettingChildsComponentSimpleAndSwitch;
