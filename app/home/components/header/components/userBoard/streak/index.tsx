import React, { useMemo } from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import dayjs from "dayjs";

import { IStudentData } from "@/models/studentData.interfaces";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import Icon from "@/components/icon";

function Streak() {
  const today = dayjs().format("YYYY-MM-DD");
  const yesterday = dayjs().add(-1, "day").format("YYYY-MM-DD");

  const studentData = queryClient.getQueryData<IStudentData>(["student-data"]);

  const isActiveStreak = useMemo(() => {
    const lastStreakDate =
      studentData?.attributes?.data?.find(
        (item: any) => item?.name === "last_streak_date"
      )?.value === today
        ? "today"
        : studentData?.attributes?.data?.find(
            (item: any) => item?.name === "last_streak_date"
          )?.value === yesterday
        ? "yesterday"
        : "no";

    return lastStreakDate;
  }, []);

  const currentStreak = useMemo(() => {
    return (
      studentData?.attributes?.data?.find(
        (item: any) => item?.name === "current_streak"
      )?.value || 0
    );
  }, [studentData]);

  return (
    <div className="streak-item">
      {isActiveStreak === "today" ? (
        <div className="active-streak">
          <Typography sx={{ color: "accent1.main" }}>
            {currentStreak}
          </Typography>
          <Image src="/svg/streak-icon.svg" width={20} height={20} alt="" />
        </div>
      ) : (
        <div
          className={`inactive-streak ${
            isActiveStreak === "yesterday"
          } ? "has-red-circle" : ""`}
        >
          <Typography sx={{ color: "gray.2" }}>{currentStreak}</Typography>
          <Icon width={20} icon="disabled-fire" />
        </div>
      )}
    </div>
  );
}

export default Streak;
