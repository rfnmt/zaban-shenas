import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";

import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { IStudentData } from "@/models/studentData.interfaces";

import "./style.scss";

function UserCurrentStreak() {
  const studentData = queryClient.getQueryData<IStudentData>(["student-data"]);
  const studentCurrentStreak =
    studentData?.attributes?.data?.find(
      (item) => item?.name === "current_streak"
    )?.value || 0;

  return (
    <Box className="total-streak-amount">
      <Image src="/svg/streak-icon.svg" width={20.7} height={24.01} alt="" />
      <Typography
        className="get-streak-days"
        sx={{
          color: "accent1.main",
        }}
      >
        {Number(studentCurrentStreak)}
      </Typography>
    </Box>
  );
}

export default UserCurrentStreak;
