import { Button, Typography } from "@mui/material";
import Link from "next/link";
import React, { useMemo } from "react";
import { useTheme } from "@emotion/react";

import Icon from "@/components/icon";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { CurrentCourseInterface } from "@/app/home/index.interfaces";

function SelectGrade() {
  const theme = useTheme() as any;

  const cachedUserCurrentCourseId = queryClient.getQueryData([
    "user-current-course-id",
  ]);

  const userCurrentCourseAllData =
    queryClient.getQueryData<CurrentCourseInterface>([
      "user-current-course-all-data",
      cachedUserCurrentCourseId,
    ]);

  const courseTitle = useMemo(() => {
    const findMainCourseDataId = userCurrentCourseAllData?.courses.find(
      (item) => item.id === cachedUserCurrentCourseId
    )?.data.main_course;

    if (findMainCourseDataId) {
      return userCurrentCourseAllData?.courses.find(
        (item) => item.id === findMainCourseDataId
      )?.data?.title;
    } else {
      return userCurrentCourseAllData?.courses.find(
        (item) => item.id === cachedUserCurrentCourseId
      )?.data.title;
    }
  }, [userCurrentCourseAllData]);

  return (
    <Link className="select-grade" href="/select-grade">
      <Button
        sx={{
          "& svg": {
            fill: `${theme.palette.icon[2]} !important`,
            transform: "rotate(-90deg)",
          },
        }}
        endIcon={<Icon icon="chevron-left" size={24} />}
      >
        <Typography
          sx={{ color: "gray.2" }}
          className={`${courseTitle?.length > 12 ? "smaller-font-size" : ""} `}
        >
          {courseTitle}
        </Typography>
      </Button>
    </Link>
  );
}

export default SelectGrade;
