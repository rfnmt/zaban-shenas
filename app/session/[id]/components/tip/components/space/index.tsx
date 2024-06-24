import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";

import { RootReduxState } from "@/providers/Redux/store";

function Space({ data }) {
  const theme = useTheme() as any;
  const { mode } = useSelector((state: RootReduxState) => state.general);

  let _mode = "";
  let spaceBgColor = "";

  if (mode === "prefers-color-scheme")
    _mode = window?.matchMedia("(prefers-color-scheme: light)")?.matches
      ? "light"
      : "dark";
  else _mode = mode;

  if (data?.background?.color === "red") {
    if (_mode === "light") spaceBgColor = theme.palette.tip_red.background;
    else spaceBgColor = theme.palette.table_red.background;
  } else if (data?.background?.color === "green") {
    if (_mode === "light") spaceBgColor = theme.palette.tip_green.background;
    else spaceBgColor = `#053B1C`;
  } else if (data?.background?.color === "blue") {
    spaceBgColor = theme.palette.primary.min;
  } else {
    spaceBgColor = theme.palette.background.main;
  }

  return (
    <Box
      className="tip-space-wrapper"
      sx={{ backgroundColor: spaceBgColor, height: data?.length + "px" }}
    />
  );
}

export default Space;
