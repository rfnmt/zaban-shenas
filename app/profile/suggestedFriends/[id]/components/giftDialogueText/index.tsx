import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import "./style.scss";

type GiftDialogueTextData = {
  getSingleStudentData: any;
};

function GiftDialogueText({ getSingleStudentData }: GiftDialogueTextData) {
  const theme = useTheme() as any;
  return (
    <Box
      className="dialogue-texts"
      sx={{ backgroundColor: theme.palette.white.flexible }}
    >
      <Typography
        sx={{
          color: theme.palette.gray["1"],
          marginRight: "4px",
        }}
      >
        سلام
      </Typography>
      <Typography
        sx={{
          color: theme.palette.system.blue,
          marginRight: "4px",
        }}
      >
        {getSingleStudentData?.profile_data?.data?.name
          ? getSingleStudentData?.profile_data?.data?.name
          : "کاربر"}
      </Typography>
      &nbsp;
      <Typography
        sx={{
          color: theme.palette.gray["1"],
        }}
      >
        !این هدیه من به توئه ,
      </Typography>
    </Box>
  );
}

export default GiftDialogueText;
