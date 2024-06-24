import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Icon from "@/components/icon";
import { RootReduxState } from "@/providers/Redux/store";
import { RootQuestionData } from "../../questions/questions.interfaces";
import { updateAllQuestion } from "@/providers/Redux/lesson/questionSlice/questionSlice";
import { goNextQuestionSlice } from "../helpers/goNextQuestionSlice";
import {
  setOpenReportBottomSheet,
  updateFlagIconWhichOpensReportBottomSheet,
  updateGetSpecialIdForReport,
} from "@/providers/Redux/general/generalSlice";

function IncorrectMoveOn() {
  const theme = useTheme() as any;
  const dispatch = useDispatch();
  const error = theme.palette.error.main;
  const accent2 = theme.palette.accent2.main;

  const { currentQuestionIndex, allQuestion } = useSelector(
    (state: RootReduxState) => state.question
  );

  function skippedCurrentQuestion() {
    const modifyCurrentQuestionData = { ...allQuestion[currentQuestionIndex] };

    modifyCurrentQuestionData.skipped = true;

    const modifyAllQuestions = allQuestion?.map(
      (item: RootQuestionData, index: number) => {
        if (index === currentQuestionIndex) return modifyCurrentQuestionData;
        return item;
      }
    );

    dispatch(updateAllQuestion(modifyAllQuestions));

    setTimeout(() => {
      goNextQuestionSlice();
    }, 100);
  }

  return (
    <>
      <audio src="/audios/wrong.m4a" autoPlay />

      <div className="feedback">
        <Box
          className="feedback-title"
          sx={{ "& .flag-icon path": { fill: error } }}
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
          <Typography sx={{ color: error }}>
            .اشتباه بود، ولی بیا بریم بعدی
          </Typography>
          <Icon width={24} height={24} icon="dangerous" />
        </Box>
      </div>
      <Button
        variant="contained"
        className="user-action"
        sx={{
          backgroundColor: accent2,
          "&:hover": { backgroundColor: accent2 },
        }}
        onClick={skippedCurrentQuestion}
      >
        فهمیدم
      </Button>
    </>
  );
}

export default IncorrectMoveOn;
