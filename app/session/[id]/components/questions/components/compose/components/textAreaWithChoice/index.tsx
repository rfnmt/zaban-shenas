import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import {
  triggerButtonEnable,
  triggerViewType,
} from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { detectLanguage } from "@/modules/helper";
import { updateTextAreaWithChoiceAnswer } from "@/providers/Redux/lesson/questionSlice/compose/composeSlice";
import { RootReduxState } from "@/providers/Redux/store";
import ComposeChoice from "./choices";
import { IQuestionData } from "../../../../questions.interfaces";

import "./styles.scss";

function TextAreaWithChoice({ data }: { data: IQuestionData }) {
  const dispatch = useDispatch();
  const { currentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.question
  );

  const { viewType } = useSelector(
    (state: RootReduxState) => state.sessionNavigator
  );

  const [answer, setanswer] = useState("");
  const { textareaWithChoiceAnswer } = useSelector(
    (state: RootReduxState) => state.composeQuestions
  );

  function checking(e) {
    dispatch(triggerViewType("verifyNow"));
    const value = e.target.value;
    setanswer(value);
    dispatch(
      updateTextAreaWithChoiceAnswer({
        selectable: textareaWithChoiceAnswer.selectable,
        freeText: value,
      })
    );
    if (value === "") {
      dispatch(triggerButtonEnable(false));
    } else {
      if (textareaWithChoiceAnswer.selectable) {
        dispatch(triggerButtonEnable(true));
      }
    }
  }

  useEffect(() => {
    if (viewType === "verifyNow" && data.id === currentQuestionIndex) {
      setanswer("");
      dispatch(
        updateTextAreaWithChoiceAnswer({
          selectable: null,
          freeText: "",
        })
      );
    }

    return () => {
      if (viewType === "verifyNow" && data.id === currentQuestionIndex) {
        setanswer("");
        dispatch(
          updateTextAreaWithChoiceAnswer({
            selectable: null,
            freeText: "",
          })
        );
      }
    };
  }, [currentQuestionIndex, viewType]);

  return (
    <div className="text-area-with-choice" id={`review-section-${data?.id}`}>
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
              : "right",
            direction: answer
              ? detectLanguage(answer) === "en"
                ? "ltr"
                : "rtl"
              : "rtl",
          },
        }}
        className="wrapp-text-area-with-choice"
      >
        <ComposeChoice data={data} />
        <textarea
          value={answer}
          placeholder="اینجا بنویسید..."
          className="text-area"
          onChange={checking}
        />
      </Box>
    </div>
  );
}

export default TextAreaWithChoice;
