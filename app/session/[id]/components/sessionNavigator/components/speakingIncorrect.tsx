import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootReduxState } from "@/providers/Redux/store";
import {
  IQuestionData,
  RootQuestionData,
} from "../../questions/questions.interfaces";
import {
  triggerButtonEnable,
  triggerViewType,
} from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { updateAllQuestion } from "@/providers/Redux/lesson/questionSlice/questionSlice";
import Icon from "@/components/icon";
import {
  resetComposeQuestion,
  toggleListenMicrophone,
} from "@/providers/Redux/lesson/questionSlice/compose/composeSlice";
import {
  setOpenReportBottomSheet,
  updateFlagIconWhichOpensReportBottomSheet,
  updateGetSpecialIdForReport,
} from "@/providers/Redux/general/generalSlice";

function SpeakingIncorrect() {
  const theme = useTheme() as any;
  const dispatch = useDispatch();
  const { allQuestion, currentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.question
  );
  const dark = theme.palette.accent1.dark;
  const accent = theme.palette.accent1.main;

  function handleIncorrectSpeaking() {
    const modifyCurrentQuestionData = { ...allQuestion[currentQuestionIndex] };

    if (modifyCurrentQuestionData) {
      modifyCurrentQuestionData.passed = false;
      modifyCurrentQuestionData.flawlessPassed = false;
      modifyCurrentQuestionData.wrongCounter =
        modifyCurrentQuestionData?.wrongCounter + 1;
      modifyCurrentQuestionData.gainedXp =
        modifyCurrentQuestionData?.gainedXp / 2;
    }

    // Modify the all questions data
    const modifyAllQuestions = allQuestion?.map(
      (item: RootQuestionData, index: number) => {
        if (index === currentQuestionIndex) return modifyCurrentQuestionData;
        return item;
      }
    );

    dispatch(updateAllQuestion(modifyAllQuestions));
    dispatch(resetComposeQuestion());

    setTimeout(() => {
      dispatch(triggerViewType("verifyNow"));
      dispatch(triggerButtonEnable(false));
      dispatch(toggleListenMicrophone(true));
    }, 100);
  }

  return (
    <>
      <audio src="/audios/wrong.m4a" autoPlay />
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
          <Typography sx={{ color: dark }}>...صدات درست نمیاد</Typography>
          <Icon width={24} height={24} icon="warning" />
        </Box>
        <div className="feedback-description">
          <Typography sx={{ color: "gray.3" }}>!یک بار دیگه تلاش کن</Typography>
        </div>
      </div>
      <Button
        onClick={handleIncorrectSpeaking}
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

export default SpeakingIncorrect;
