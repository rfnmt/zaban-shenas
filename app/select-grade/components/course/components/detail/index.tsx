import React, { memo } from "react";
import { Typography } from "@mui/material";

import { ICourse } from "@/app/select-grade/interfaces";
import CourseButtons from "@/components/courseItemsButtons";
import { detectLanguage } from "@/modules/helper";

interface IProps {
  data: ICourse;
  studyPercent: number;
}

function Detail({ data, studyPercent }: IProps) {
  return (
    <>
      <Typography
        className={`description ${
          detectLanguage(data?.description) === "en" ? "en" : "fa"
        }`}
        sx={{ color: "gray.2" }}
      >
        {data?.description}
      </Typography>
      <CourseButtons courseData={{ ...data, studyPercent }} />
    </>
  );
}

export default memo(Detail);
