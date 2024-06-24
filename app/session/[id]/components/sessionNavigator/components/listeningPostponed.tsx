import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Icon from "@/components/icon";
import {
  setOpenReportBottomSheet,
  updateFlagIconWhichOpensReportBottomSheet,
  updateGetSpecialIdForReport,
} from "@/providers/Redux/general/generalSlice";
import { skipQuestion } from "../helpers/skippQuestion";
import { RootReduxState } from "@/providers/Redux/store";

function ListeningPostponed() {
  const dispatch = useDispatch();
  const theme = useTheme() as any;
  const dark = theme.palette.accent1.dark;
  const accent = theme.palette.accent1.main;
  const { allQuestion, currentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.question
  );
  return (
    <>
      <div className="feedback">
        <Box
          className="feedback-title"
          sx={{ "& .flag-icon path": { fill: dark } }}
        >
          <Icon
            width={24}
            height={24}
            icon="flag"
            className="flag-icon"
            onClick={() => {
              dispatch(setOpenReportBottomSheet(true));
              dispatch(updateFlagIconWhichOpensReportBottomSheet(true));
              dispatch(
                updateGetSpecialIdForReport(
                  allQuestion[currentQuestionIndex]?.data.id
                )
              );
            }}
          />
          <Typography sx={{ color: dark }}>بلندگو خاموش شد </Typography>
          <Icon width={24} height={24} icon="volume-off" />
        </Box>
        <div className="feedback-description">
          <Typography sx={{ color: "gray.3" }}>
            .تمرین‌های صوتی تا آخر این جلسه رد خواهند شد
          </Typography>
        </div>
      </div>
      <Button
        onClick={() => skipQuestion("listening")}
        variant="contained"
        className="user-action"
        sx={{
          backgroundColor: accent,
          "&:hover": { backgroundColor: accent },
        }}
      >
        ادامه
      </Button>
    </>
  );
}

export default ListeningPostponed;
