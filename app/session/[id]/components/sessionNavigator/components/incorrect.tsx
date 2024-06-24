import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Icon from "@/components/icon";
import { RootReduxState } from "@/providers/Redux/store";
import SimpleProcessingText from "@/components/textProcessing/simpleProcessingText";
import { RootQuestionData } from "../../questions/questions.interfaces";
import { updateAllQuestion } from "@/providers/Redux/lesson/questionSlice/questionSlice";
import { goNextQuestionSlice } from "../helpers/goNextQuestionSlice";
import {
  triggerButtonEnable,
  triggerViewType,
} from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import {
  updateSelectedLearningWord,
  updateSelectedTranslate,
  updateWrongItems,
} from "@/providers/Redux/lesson/questionSlice/matchQuestions/matchQuestionsSlice";
import { textIsFarsi } from "@/modules/helper";
import {
  setOpenReportBottomSheet,
  updateFlagIconWhichOpensReportBottomSheet,
  updateGetSpecialIdForReport,
} from "@/providers/Redux/general/generalSlice";

function Incorrect() {
  const dispatch = useDispatch();
  const theme = useTheme() as any;
  const error = theme.palette.error.main;
  const accent2 = theme.palette.accent2.main;

  const { currentQuestionIndex, allQuestion } = useSelector(
    (state: RootReduxState) => state.question
  );

  const { viewType } = useSelector(
    (state: RootReduxState) => state.sessionNavigator
  );

  function incorrectAnswer() {
    if (allQuestion[currentQuestionIndex]?.data?.type === "match") {
      dispatch(updateWrongItems(null));
      dispatch(updateSelectedLearningWord(null));
      dispatch(updateSelectedTranslate(null));

      dispatch(triggerButtonEnable(false));
      dispatch(triggerViewType("verifyNow"));
    } else {
      const modifyCurrentQuestionData = {
        ...allQuestion[currentQuestionIndex],
      };

      modifyCurrentQuestionData.passed = false;
      modifyCurrentQuestionData.flawlessPassed = false;
      modifyCurrentQuestionData.wrongCounter =
        modifyCurrentQuestionData?.wrongCounter + 1;
      modifyCurrentQuestionData.gainedXp =
        modifyCurrentQuestionData?.gainedXp / 2;

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
      // }
    }
  }

  const correctAnswer = useMemo(() => {
    const type = allQuestion?.[currentQuestionIndex]?.data.type;

    if (type === "multiple_choice") {
      const { choices } = allQuestion[currentQuestionIndex]?.data;

      let reslut = "";
      const hasCorrectAnswer = [];

      for (const choise of choices) {
        if (choise.correct_choice === true) {
          hasCorrectAnswer.push(choise);
        }
      }

      for (const key in hasCorrectAnswer) {
        reslut += hasCorrectAnswer[key].text;
        if (hasCorrectAnswer.length > 1)
          if (parseInt(key) < hasCorrectAnswer.length - 1) reslut += ", ";
      }

      return reslut;
    } else if (type === "compose") {
      const { acceptable_answers } = allQuestion[currentQuestionIndex]?.data;

      return acceptable_answers[0].text;
    }
    return "";
  }, [currentQuestionIndex]);

  const explanation = useMemo(() => {
    return allQuestion[currentQuestionIndex]?.data?.explanation;
  }, [currentQuestionIndex]);

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
          {allQuestion[currentQuestionIndex]?.wrongCounter > 2 ? (
            <Typography sx={{ color: error }}>
              .اشتباه بود، ولی بیا بریم بعدی
            </Typography>
          ) : (
            <Typography sx={{ color: error }}>!یک ‌بار دیگه تلاش کن</Typography>
          )}
          <Icon width={24} height={24} icon="dangerous" />
        </Box>

        <div className="feedback-description">
          {viewType === "incorrect" && (
            <>
              {correctAnswer && (
                <>
                  <Typography sx={{ color: "gray.3" }}>:جواب درست</Typography>
                  <Typography
                    sx={{ color: "gray.1" }}
                    className={`${
                      textIsFarsi(String(correctAnswer)) ? "fa" : "en"
                    }`}
                  >
                    {correctAnswer}
                  </Typography>
                </>
              )}

              {explanation && (
                <>
                  <Box sx={{ mb: 2 }} />
                  <Typography sx={{ color: "gray.3" }}>:معنی</Typography>
                  <Typography sx={{ color: "gray.1" }}>
                    <SimpleProcessingText data={explanation} />
                  </Typography>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <Button
        variant="contained"
        className="user-action"
        sx={{
          backgroundColor: accent2,
          "&:hover": { backgroundColor: accent2 },
        }}
        onClick={incorrectAnswer}
      >
        فهمیدم
      </Button>
    </>
  );
}

export default Incorrect;
