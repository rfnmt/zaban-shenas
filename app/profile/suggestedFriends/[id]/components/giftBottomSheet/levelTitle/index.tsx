import React from "react";
import { Typography, useTheme } from "@mui/material";

type LevelTitleData = {
  title: string;
  level: string;
};
function LevelTitle({ title, level }: LevelTitleData) {
  const theme = useTheme() as any;
  return (
    <>
      <Typography sx={{ color: theme.palette.gray["1"] }} className="title">
        {title}
      </Typography>
      <Typography sx={{ color: theme.palette.gray["2"] }} className="sub-title">
        {level}
      </Typography>
    </>
  );
}

export default LevelTitle;
