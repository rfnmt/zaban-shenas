import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import LeftToRightStoryArrangeQuestion from "./leftToRightStoryArrangeQuestion";
import RightToLeftStoryArrangeQuestion from "./rightToLeftStoryArrangeQuestion";
import "./style.scss";
import StoryArrangeQuestionChoice from "./storyArrangeQuestionChoice";
import { RootReduxState } from "@/providers/Redux/store";
import { motion } from "framer-motion";
import { storyRightToLeftItemsMotion } from "@/modules/helper";
import {
  updateAnswerStoryfillDamagedSentenceWithChoices,
  updateStoryCatchExistedLine_elementFromArrangeQuestion,
  updateStoryShowAllArrangeQuestionChoices,
} from "@/providers/Redux/lesson/storySlice/storySlice";
type StoryArrangeQuestionData = {
  arrange_question_data: any;
  index: number;
};

function StoryArrangeQuestion({
  arrange_question_data,
  index,
}: StoryArrangeQuestionData) {
  const dispatch = useDispatch();
  const { storyShowAllArrangeQuestionChoices } = useSelector(
    (state: RootReduxState) => state?.story
  );

  const { storyCurrentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.story
  );
  const {
    choices,
    line_element: { character, line_type, text, tts, visual_direction },
  } = arrange_question_data;

  useEffect(() => {
    dispatch(
      updateAnswerStoryfillDamagedSentenceWithChoices(
        arrange_question_data?.line_element?.text?.display
      )
    );
  }, []);

  const [hideMultiChoiceQuestion, setHideMultiChoiceQuestion] = useState(false);
  useEffect(() => {
    if (index < storyCurrentQuestionIndex) {
      setHideMultiChoiceQuestion(true);
      dispatch(updateStoryShowAllArrangeQuestionChoices(false));
    } else {
      setHideMultiChoiceQuestion(false);
    }
  }, [storyCurrentQuestionIndex]);

  const answerStoryfillDamagedSentenceWithChoices = useSelector(
    (state: RootReduxState) =>
      state?.story?.answerStoryfillDamagedSentenceWithChoices
  );
  const wordsCorrectOrderStoryArrangQuestion = useSelector(
    (state: RootReduxState) =>
      state?.story?.wordsCorrectOrderStoryArrangQuestion
  );
  useEffect(() => {
    if (
      answerStoryfillDamagedSentenceWithChoices.length ===
      wordsCorrectOrderStoryArrangQuestion
    ) {
      dispatch(
        updateStoryCatchExistedLine_elementFromArrangeQuestion(
          arrange_question_data.line_element
        )
      );
    }
  }, [answerStoryfillDamagedSentenceWithChoices]);

  return (
    <Box
      className="story-arrange-question-wrapper"
      sx={{
        display: hideMultiChoiceQuestion === true ? "none" : "",
        minHeight: "188px",
      }}
    >
      <motion.div {...storyRightToLeftItemsMotion}>
        <Typography
          sx={{ color: "gray.1" }}
          className="story-arrange-question-prompt"
        >
          {arrange_question_data?.prompt}
        </Typography>
      </motion.div>
      {visual_direction === "left-to-right" ? (
        <LeftToRightStoryArrangeQuestion
          line_type={line_type}
          character={character}
          tts={tts}
          index={index}
          text={text}
        />
      ) : (
        <RightToLeftStoryArrangeQuestion
          line_type={line_type}
          character={character}
          tts={tts}
          index={index}
          text={text}
        />
      )}
      {storyShowAllArrangeQuestionChoices ? (
        <StoryArrangeQuestionChoice getChoices={choices} />
      ) : (
        <></>
      )}
    </Box>
  );
}

export default StoryArrangeQuestion;
