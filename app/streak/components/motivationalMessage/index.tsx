import React, { useMemo } from "react";
import { useTheme, Typography } from "@mui/material";

import { IStudentData } from "@/models/studentData.interfaces";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { getFeedBackChain } from "../../helpers/messageProvider";

function MotivationalMessage() {
  const theme = useTheme() as any;

  const studentData = queryClient.getQueryData<IStudentData>(["student-data"]);
  const studentCurrentStreak =
    studentData?.attributes?.data?.find(
      (item) => item?.name === "current_streak"
    )?.value || 0;

  const studentlongestStreak =
    studentData?.attributes?.data?.find(
      (item) => item?.name === "longest_streak"
    )?.value || 0;

  const message = useMemo(() => {
    if (studentCurrentStreak)
      return getFeedBackChain(
        Number(studentCurrentStreak),
        Number(studentlongestStreak)
      );
  }, []);

  return (
    <>
      <Typography
        sx={{ color: theme.palette.gray["1"] }}
        className="main-title"
      >
        {message?.title}
      </Typography>
      <Typography sx={{ color: theme.palette.gray["1"] }} className="sub-title">
        {message?.subtitle}
      </Typography>
    </>
  );
}

export default MotivationalMessage;
