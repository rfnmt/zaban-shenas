import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import ComposeMakeSentenceWithChoice from "./choices";
import { RootReduxState } from "@/providers/Redux/store";
import { updateMakeSentenceWithChoiceAnswer } from "@/providers/Redux/lesson/questionSlice/compose/composeSlice";
import { detectLanguage } from "@/modules/helper";
import { triggerButtonEnable } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { IQuestionData } from "../../../../questions.interfaces";

import "./styles.scss";

function PutChoicesInRows({ data }: { data: IQuestionData }) {
  const dispatch = useDispatch();

  const { makeSentenceWithChoiceAnswer } = useSelector(
    (state: RootReduxState) => state.composeQuestions
  );

  useEffect(() => {
    if (makeSentenceWithChoiceAnswer.length) {
      dispatch(triggerButtonEnable(true));
    } else {
      dispatch(triggerButtonEnable(false));
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [makeSentenceWithChoiceAnswer]);

  function updateAnswer(text) {
    const filter = makeSentenceWithChoiceAnswer.filter(
      (_item) => _item.text !== text
    );

    dispatch(updateMakeSentenceWithChoiceAnswer(filter));
  }

  return (
    <div className="put-choices-in-rows">
      <div className="make-sentence-with-choice-wrapper">
        <Box
          className="wrap-selected-options notebook-paper"
          id={`review-section-${data?.id}`}
          sx={{
            background: (theme) =>
              `linear-gradient(to bottom, transparent 63px, ${theme.palette.border.main} 1px)`,
            textAlign:
              detectLanguage(makeSentenceWithChoiceAnswer[0]?.text) === "en"
                ? "left"
                : "right",
            direction:
              detectLanguage(makeSentenceWithChoiceAnswer[0]?.text) === "en"
                ? "ltr"
                : "rtl",
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            const __data = e.dataTransfer.getData("choice");
            const _data = [...makeSentenceWithChoiceAnswer] || [];
            _data.push(JSON.parse(__data));
            dispatch(updateMakeSentenceWithChoiceAnswer(_data));
          }}
        >
          {makeSentenceWithChoiceAnswer.map((item) => (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              key={item.text}
              onClick={() => updateAnswer(item.text)}
            >
              <Typography
                className="choice-item"
                sx={{
                  color: "gray.1",
                  background: (theme) => theme.palette.white.flexible,
                  border: (theme) => `1px solid ${theme.palette.border.main}`,
                }}
              >
                {item.text}{" "}
              </Typography>
            </motion.span>
          ))}
        </Box>
        <ComposeMakeSentenceWithChoice choices={data?.choices} />
      </div>
    </div>
  );
}

export default PutChoicesInRows;
