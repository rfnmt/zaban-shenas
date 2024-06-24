import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import {
  triggerButtonEnable,
  triggerViewType,
} from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { detectLanguage } from "@/modules/helper";
import { updateTextareaAnswer } from "@/providers/Redux/lesson/questionSlice/compose/composeSlice";
import { RootReduxState } from "@/providers/Redux/store";

import "./styles.scss";

function OnlyTextArea() {
  const dispatch = useDispatch();
  const [answer, setanswer] = useState("");
  const { textareaAnswer } = useSelector(
    (state: RootReduxState) => state.composeQuestions
  );

  function checking(e) {
    dispatch(triggerViewType("verifyNow"));
    const value = e.target.value;
    setanswer(value);
    dispatch(updateTextareaAnswer(value));
    if (value === "") {
      dispatch(triggerButtonEnable(false));
    } else {
      dispatch(triggerButtonEnable(true));
    }
  }

  const { currentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.question
  );

  const { viewType } = useSelector(
    (state: RootReduxState) => state.sessionNavigator
  );

  useEffect(() => {
    setanswer("");
  }, [currentQuestionIndex]);

  return (
    <div className="only-textarea">
      <Box
        sx={{
          "& textarea": {
            backgroundColor: "white.flexible",
            color: "gray.1",
            border: (theme) => `1px solid ${theme.palette.border.main}`,
            textAlign: answer
              ? detectLanguage(answer) === "en"
                ? "left"
                : "right"
              : "rtl",
          },
        }}
        className="wrapp-text-area"
      >
        <textarea value={answer} className="text-area" onChange={checking} />
      </Box>
    </div>
  );
}

export default OnlyTextArea;
