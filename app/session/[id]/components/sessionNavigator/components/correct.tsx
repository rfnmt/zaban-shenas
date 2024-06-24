import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootReduxState } from "@/providers/Redux/store";

import Icon from "@/components/icon";
import SimpleProcessingText from "@/components/textProcessing/simpleProcessingText";
import { goNextQuestionSlice } from "../helpers/goNextQuestionSlice";
import { RootQuestionData } from "../../questions/questions.interfaces";
import { updateAllQuestion } from "@/providers/Redux/lesson/questionSlice/questionSlice";
import {
  setOpenReportBottomSheet,
  updateFlagIconWhichOpensReportBottomSheet,
  updateGetSpecialIdForReport,
} from "@/providers/Redux/general/generalSlice";

function Correct() {
  const dispatch = useDispatch();
  const { allQuestion, currentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.question
  );

  const theme = useTheme() as any;
  const secondary = theme.palette.secondary.main;
  const success = theme.palette.success.main;

  function correctAnswer() {
    const modifyCurrentQuestionData = { ...allQuestion[currentQuestionIndex] };

    modifyCurrentQuestionData.passed = true;

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
      <audio src="/audios/correct.m4a" autoPlay />
      <div className="feedback">
        <Box
          className="feedback-title"
          sx={{ "& .flag-icon path": { fill: success } }}
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
          <Typography sx={{ color: success }}>آفرین! کارت عالی بود</Typography>
          <Icon width={24} height={24} icon="verified" />
        </Box>
        <div className="feedback-description">
          {allQuestion[currentQuestionIndex]?.data?.explanation && (
            <>
              <Typography sx={{ color: "gray.3" }}>:معنی</Typography>
              <SimpleProcessingText
                data={allQuestion[currentQuestionIndex]?.data?.explanation}
              />
            </>
          )}
        </div>
      </div>
      <Button
        variant="contained"
        onClick={correctAnswer}
        className="user-action"
        sx={{
          backgroundColor: secondary,
          "&:hover": { backgroundColor: secondary },
        }}
      >
        ادامه
      </Button>
    </>
  );
}

export default Correct;
