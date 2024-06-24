"use client";

import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

import { RootReduxState } from "@/providers/Redux/store";
import SimpleProcessingText from "@/components/textProcessing/simpleProcessingText";

import "./style.scss";

function Text({ data }: any) {
  const theme = useTheme() as any;
  const { mode } = useSelector((state: RootReduxState) => state.general);

  let _mode = "";
  let textBgColor = "";

  if (mode === "prefers-color-scheme")
    _mode = window?.matchMedia("(prefers-color-scheme: light)")?.matches
      ? "light"
      : "dark";
  else _mode = mode;

  if (data?.background?.color === "red") {
    if (_mode === "light") textBgColor = theme.palette.tip_red.background;
    else textBgColor = theme.palette.background.main;
  } else if (data?.background?.color === "green") {
    if (_mode === "light") textBgColor = theme.palette.tip_green.background;
    else textBgColor = `#053B1C`;
  } else if (data?.background?.color === "blue") {
    textBgColor = theme.palette.primary.min;
  } else {
    textBgColor = theme.palette.background.main;
  }

  return (
    <Box className="tip-text-wrapper" style={{ background: textBgColor }}>
      <SimpleProcessingText data={data} />
    </Box>
  );
}
export default Text;
