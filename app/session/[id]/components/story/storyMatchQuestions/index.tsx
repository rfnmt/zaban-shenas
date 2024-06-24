import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

import { storyOtherPartsMotion, shuffleArray } from "@/modules/helper";
import StoryLearningWord from "./storyLearningWord";
import StoryTranslateWord from "./storyTranslateWord";
import { triggerStoryButtonEnable } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";

import {
  updateStoryPushCorrectAnswerIntoArray,
  updateStoryNumberOfMatchQuestionsCorrectAnswers,
} from "@/providers/Redux/lesson/storySlice/storySlice";
import {
  resetStoryDisableItems,
  updateStoryCurrectItems,
  updateStorySelectedLearningWord,
  updateStorySelectedTranslate,
  updateStoryWrongItems,
} from "@/providers/Redux/lesson/storySlice/storyMatchQuestions/storyMatchQuestionsSlice";
import "./style.scss";

export type Props = {
  data: Data;
};

function StoryMatchQuestions({ data }: Props) {
  const dispatch = useDispatch();

  const {
    storyNumberOfMatchQuestionsCorrectAnswers,
    storyEnableAddingScoreFromMatchQuestions,
  } = useSelector((state: any) => state.story);
  const [matchData, setMatchData] = useState() as any;

  function prepareContent(_data: Data) {
    let learning_word: any = _data?.pairs?.map((item, index) => {
      return {
        learning_word: item?.learning_word,
        tts: item?.tts,
        id: index,
      };
    });

    let translation: any = _data?.pairs.map((item, index) => {
      return {
        translation: item?.translation,
        id: index,
      };
    });

    learning_word = shuffleArray(learning_word);
    translation = shuffleArray(translation);

    setMatchData({ learning_word, translation });
  }

  useEffect(() => {
    if (storyNumberOfMatchQuestionsCorrectAnswers === data?.pairs?.length) {
      dispatch(triggerStoryButtonEnable(true));
      if (storyEnableAddingScoreFromMatchQuestions === true) {
        dispatch(updateStoryPushCorrectAnswerIntoArray(1));
      }
    }
  }, [storyNumberOfMatchQuestionsCorrectAnswers]);

  useEffect(() => {
    resetStates();
    // return () => {
    //   setMatchData(null);
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function resetStates() {
    setMatchData(null);
    prepareContent(data);
    dispatch(updateStorySelectedLearningWord(null));
    dispatch(updateStorySelectedTranslate(null));
    dispatch(updateStoryCurrectItems(null));
    dispatch(updateStoryWrongItems(null));
    dispatch(updateStoryNumberOfMatchQuestionsCorrectAnswers(0));
    dispatch(triggerStoryButtonEnable(false));
    dispatch(resetStoryDisableItems());
  }

  return (
    <motion.div {...storyOtherPartsMotion}>
      <Box
        className="story-match-pairs-wrapper"
        sx={{
          minHeight: `${data?.pairs?.length * 72 + 46.5}px`,
        }}
      >
        <Typography
          sx={{ color: "gray.1" }}
          className="story-match-question-prompt"
        >
          {data?.prompt}
        </Typography>

        <div className="story-match-question-pairs">
          <div className="col-left">
            {matchData?.learning_word?.map((item: any) => (
              <StoryLearningWord item={item} key={item?.id} />
            ))}
          </div>

          <div className="col-right">
            {matchData?.translation?.map((item: any) => (
              <StoryTranslateWord item={item} key={item?.id} />
            ))}
          </div>
        </div>
      </Box>
    </motion.div>
  );
}

export default StoryMatchQuestions;
