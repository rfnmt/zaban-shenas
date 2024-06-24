import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

import Icon from "@/components/icon";

import "./styles.scss";

type Props = {
  title: string;
  mainCourseId: number;
};

function MainCourse({ title, mainCourseId }: Props) {
  const router = useRouter();

  return (
    <Button
      className="return-to-select-grade-main-course"
      onClick={() => router.push(`/select-grade/${mainCourseId}`)}
    >
      <Box className="list-icon-wrapper">
        <Icon icon="list" size={24} />
      </Box>
      <Typography className="title" sx={{ color: "gray.1" }}>
        {title}
      </Typography>
    </Button>
  );
}

export default MainCourse;
