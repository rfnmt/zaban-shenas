import React, { useState } from "react";
import { RootReduxState } from "@/providers/Redux/store";
import { Button, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootQuestionData } from "../../questions/questions.interfaces";
import { updateAllQuestion } from "@/providers/Redux/lesson/questionSlice/questionSlice";
import { goNextQuestionSlice } from "../helpers/goNextQuestionSlice";

function IHaveUnderstood() {
  const theme = useTheme() as any;
  const dispatch = useDispatch();
  const [understoodVoice, setUnderstoodVoice] = useState(false);
  const { allQuestion, currentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.question
  );

  function handleIUnderstood() {
    const modifyCurrentQuestionData = {
      ...allQuestion[currentQuestionIndex],
    };

    modifyCurrentQuestionData.passed = true;

    const modifyAllQuestions = allQuestion?.map(
      (item: RootQuestionData, index: number) => {
        if (index === currentQuestionIndex) return modifyCurrentQuestionData;
        return item;
      }
    );

    setUnderstoodVoice(true);
    dispatch(updateAllQuestion(modifyAllQuestions));

    setTimeout(() => {
      goNextQuestionSlice();
    }, 500);
  }
  return (
    <>
      {understoodVoice ? <audio src="/audios/correct.m4a" autoPlay /> : <></>}

      <Button
        variant="contained"
        className="user-action"
        sx={{
          backgroundColor: theme.palette.secondary.main,
          "&:hover": { backgroundColor: theme.palette.secondary.main },
        }}
        onClick={handleIUnderstood}
      >
        فهمیدم
      </Button>
    </>
  );
}

export default IHaveUnderstood;
