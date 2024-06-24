import React from "react";
import { Button, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { RootReduxState } from "@/providers/Redux/store";
import { checkTextareaAnswer } from "../../questions/components/compose/components/onlyTextArea/helpers";
import { checkMakeSentenceWithChoiceAnswer } from "../../questions/components/compose/components/putChoicesInRows/helpers";
import { checkDamageSentenceWithChoiceAnswer } from "../../questions/components/compose/components/fillDamagedSentenceWithChoices/helpers";
import { checkTextareaWithChoiceAnswer } from "../../questions/components/compose/components/textAreaWithChoice/helpers";
import { checkUserAnswesInDamagedWords } from "../../questions/components/compose/components/damagedSentence/helpers";
import { checkFillDamagedWordsWithWritingAnswer } from "../../questions/components/compose/components/damagedWords/helpers";
import { checkingUserSelectedItemWithAcceptableAnswer } from "../../questions/components/multipleChoice/helper";
import { triggerViewType } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";

function VerifyNow() {
  const dispatch = useDispatch();
  const theme = useTheme() as any;
  const { buttonEnable } = useSelector(
    (state: RootReduxState) => state.sessionNavigator
  );

  const { questionView } = useSelector(
    (state: RootReduxState) => state.question
  );

  const { composeView } = useSelector(
    (state: RootReduxState) => state.composeQuestions
  );

  const { sessionBelongVocabExamination } = useSelector(
    (state: RootReduxState) => state.session
  );

  function checkingUserAnswer() {
    if (questionView === "multiple_choice") {
      checkingUserSelectedItemWithAcceptableAnswer();
    } else if (questionView === "compose") {
      if (composeView === "answerQuestionWithTextarea") {
        checkTextareaAnswer();
      } else if (composeView === "answerQuestionWithPutChoicesInRows") {
        checkMakeSentenceWithChoiceAnswer();
      } else if (composeView === "answerQuestionWithChoices") {
        checkDamageSentenceWithChoiceAnswer();
      } else if (composeView === "answerTextareaQuestionWithChoice") {
        checkTextareaWithChoiceAnswer();
      } else if (composeView === "answerQuestionDamagedSentenceWithWriting") {
        checkUserAnswesInDamagedWords();
      } else if (composeView === "answerQuestionDamagedWordWithWriting") {
        checkFillDamagedWordsWithWritingAnswer();
      }
    }
  }

  function skipCurrentQuestion() {
    dispatch(triggerViewType("skipVocabExaminationQuestion"));
  }

  return (
    <div className="verrify-now">
      {sessionBelongVocabExamination && (
        <Button onClick={skipCurrentQuestion}>رد کردن</Button>
      )}

      <Button
        variant="contained"
        className="user-action"
        disabled={!buttonEnable}
        onClick={checkingUserAnswer}
        sx={{
          color:
            buttonEnable === true
              ? `${theme.palette.white.fix} !important`
              : `${theme.palette.gray["3"]} !important`,
          backgroundColor: "secondary.main",
          "&:hover": { backgroundColor: "secondary.main" },
        }}
      >
        بررسی
      </Button>
    </div>
  );
}

export default VerifyNow;
