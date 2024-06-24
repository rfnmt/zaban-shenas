import React, { memo } from "react";
import {
  LinearProgress,
  linearProgressClasses,
  styled,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import Image from "next/image";

import Icon from "@/components/icon";
import { checkDateIsCurrentMonth, detectLanguage } from "@/modules/helper";
import { ICourse } from "@/app/select-grade/interfaces";

const BorderLinearProgress = styled(LinearProgress)(({ theme }: any) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    overflow: "auto",
    backgroundColor: theme.palette.border.main,
    transform: "rotate(180deg)",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.success.main,
  },
}));

interface IProps {
  data: ICourse;
  studyPercent: number;
}

function Summary({ data, studyPercent }: IProps) {
  const theme = useTheme() as any;
  const newCourse = checkDateIsCurrentMonth(data?.created_at) === 0;

  function hardnessIcon() {
    switch (data?.hardness) {
      case "easy":
        return (
          <div className="hardness">
            <Icon removeInlineStyle size={24} icon="easy" />
            <Typography sx={{ color: "gray.2" }}>مبتدی</Typography>
          </div>
        );
      case "medium":
        return (
          <div className="hardness">
            <Icon removeInlineStyle size={24} icon="medium" />
            <Typography sx={{ color: "gray.2" }}>متوسط</Typography>
          </div>
        );
      case "hard":
        return (
          <div className="hardness">
            <Icon removeInlineStyle size={24} icon="hard" />
            <Typography sx={{ color: "gray.2" }}>پیشرفته</Typography>
          </div>
        );

      case "intense":
        return (
          <div className="hardness">
            <Icon removeInlineStyle size={24} icon="intense" />
            <Typography sx={{ color: "gray.2" }}>فوق پیشرفته</Typography>
          </div>
        );

      default:
        return (
          <div className="hardness">
            <Icon removeInlineStyle size={24} icon="easy" />
            <Typography sx={{ color: "gray.2" }}>مبتدی</Typography>
          </div>
        );
    }
  }

  return (
    <>
      <Box
        sx={{
          "& svg": {
            fill: `${theme.palette.icon[2]} !important`,
          },
        }}
        className={`accordion-summary-detail ${
          newCourse ? "four-column" : "three-column"
        }`}
      >
        <div className="media">
          {data?.thumbnail && (
            <Image width={56} height={56} src={data?.thumbnail} alt="" />
          )}
        </div>
        <div className="typography">
          <Typography
            sx={{ color: "gray.1" }}
            className={`title ${
              detectLanguage(data?.title) === "en" ? "en" : "fa"
            }`}
          >
            {data?.title}
          </Typography>
        </div>
        {newCourse && (
          <Typography
            className="new-course-badge"
            sx={{ color: "gray.1", backgroundColor: "success.main" }}
          >
            جدید
          </Typography>
        )}
        <Icon icon="chevron-left" className="expand-icon" size={24} />
      </Box>
      <div className="hardness-part-count">
        {hardnessIcon()}
        <div className="part-count">
          <Icon removeInlineStyle icon="part" size={24} />
          <Typography sx={{ color: "gray.2" }}>
            {data?.lesson_ids?.length} بخش
          </Typography>
        </div>
      </div>

      {studyPercent ? (
        <div className="study-percent">
          <BorderLinearProgress variant="determinate" value={studyPercent} />
          <Typography sx={{ color: "gray.2" }} className="typography">
            {studyPercent} ٪ آموخته شده
          </Typography>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default memo(Summary);
