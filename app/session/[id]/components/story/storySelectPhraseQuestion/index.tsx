import React, { useState, useEffect, useRef, createRef } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import "./style.scss";
import { storyOtherPartsMotion, shuffleArray } from "@/modules/helper";
import { useDispatch, useSelector } from "react-redux";
import { triggerStoryButtonEnable } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { RootReduxState } from "@/providers/Redux/store";
import { motion } from "framer-motion";
import StoryLineItem from "../storyLineItem";
import {
  updateStoryCatchExistedLine_elementFromSelectPhrase,
  updateStoryPushCorrectAnswerIntoArray,
  updateStoryShowAllSelectPhraseQuestionChoices,
} from "@/providers/Redux/lesson/storySlice/storySlice";
type StorySelectPhraseQuestionData = {
  story_select_phrase_question: any;
  index: number;
};

function StorySelectPhraseQuestion({
  story_select_phrase_question,
  index,
}: StorySelectPhraseQuestionData) {
  const theme = useTheme() as any;
  const dispatch = useDispatch();
  const { mode } = useSelector((state: RootReduxState) => state.general);
  const { storyCurrentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.story
  );
  const { storyShowAllSelectPhraseQuestionChoices } = useSelector(
    (state: RootReduxState) => state.story
  );
  const [phraseQuestions, setPhraseQuestions] = useState() as any;
  const [hidePhraseQuestion, setHidePhraseQuestion] = useState(false);
  const [userAnsweredTheQuestion, setUserAnsweredTheQuestion] = useState(true);

  function prepareContent(_data: Data) {
    let loadShuffle = _data.map((item: any, index: number) => {
      return {
        id: index,
        ...item,
      };
    });
    loadShuffle = shuffleArray(loadShuffle);
    setPhraseQuestions(loadShuffle);
  }

  useEffect(() => {
    prepareContent(story_select_phrase_question?.choices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [story_select_phrase_question?.choices]);

  useEffect(() => {
    if (index === storyCurrentQuestionIndex) {
      dispatch(triggerStoryButtonEnable(false));
    }

    if (index < storyCurrentQuestionIndex) {
      setHidePhraseQuestion(true);
      dispatch(updateStoryShowAllSelectPhraseQuestionChoices(false));
    } else {
      setHidePhraseQuestion(false);
    }
  }, [storyCurrentQuestionIndex]);
  ////////////////////
  ///////////////////
  //////////////////
  const [disableButton, setDisableButton] = useState(null);
  const [myElem, setMyElem] = useState<Array<any>>([]);
  const parentSelection = useRef<null | any>(null);
  const selected = useRef([]);
  const selectedAudio = useRef([]);
  selected.current = story_select_phrase_question?.choices.map(
    (elem, i) => selected.current[i] ?? createRef()
  );
  selectedAudio.current = story_select_phrase_question?.choices.map(
    (elem, i) => selectedAudio.current[i] ?? createRef()
  );
  function handleCorrectChoice(elementID: number, itemIndex: number) {
    if (selectedAudio.current[itemIndex]) {
      selectedAudio.current[itemIndex].current.play();
    }

    if (story_select_phrase_question.correct_answer === elementID) {
      for (let i = 0; i < parentSelection.current.children.length; i++) {
        const getChildrensID = Number(parentSelection.current.children[i].id);
        if (getChildrensID !== elementID) {
          setMyElem((prev) => [...prev, selected.current[i]]);
          setDisableButton(true);
        }
      }
      selected.current[
        itemIndex
      ].current.style.color = `${theme.palette.success.main}`;
      selected.current[
        itemIndex
      ].current.style.border = `2px solid ${theme.palette.success.main}`;
      dispatch(triggerStoryButtonEnable(true));
      if (userAnsweredTheQuestion === true) {
        dispatch(updateStoryPushCorrectAnswerIntoArray(1));
      }
      if (story_select_phrase_question.line_element !== null) {
        if (story_select_phrase_question.line_element.character !== null) {
          dispatch(
            updateStoryCatchExistedLine_elementFromSelectPhrase(
              story_select_phrase_question.line_element
            )
          );
        }
      }
      ///////
      //////
    } else {
      //////
      //////
      const getSingleElement = selected.current[itemIndex];
      setMyElem((prev) => [...prev, getSingleElement]);
      selected.current[
        itemIndex
      ].current.style.color = `${theme.palette.error.main}`;
      selected.current[
        itemIndex
      ].current.style.border = `2px solid ${theme.palette.error.main} `;

      setTimeout(() => {
        selected.current[itemIndex].current.style.color =
          mode === "dark" ? `rgba(255,255,255,0.38)` : `rgba(0,0,0,0.38)`;
        selected.current[
          itemIndex
        ].current.style.border = `1px solid ${theme.palette.border.main} `;
        setDisableButton(true);
      }, 600);
      setUserAnsweredTheQuestion(false);
      dispatch(triggerStoryButtonEnable(false));
    }
  }
  const myArray = [...new Set(myElem)];

  let persianRegex = /[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ]/g;
  return (
    <motion.div {...storyOtherPartsMotion}>
      <Box
        className="story-select-phrase-question"
        sx={{
          display: hidePhraseQuestion === true ? "none" : "",
          height: `${
            story_select_phrase_question?.choices.length * 48 +
            (story_select_phrase_question?.prompt ? 70.5 : 0) +
            (story_select_phrase_question?.line_element ? 50 : 0) +
            (story_select_phrase_question?.choices.length - 1) * 16 +
            38
          }px`,
        }}
      >
        {story_select_phrase_question?.prompt ? (
          <Typography
            sx={{ color: "gray.1" }}
            className="select-question-phrase-prompt"
          >
            {story_select_phrase_question?.prompt}
          </Typography>
        ) : (
          <></>
        )}
        {story_select_phrase_question?.line_element ? (
          <StoryLineItem
            story_line_item_data={story_select_phrase_question}
            index={index}
          />
        ) : (
          <></>
        )}

        {storyShowAllSelectPhraseQuestionChoices ? (
          <Box className="wrap-question-phrase-choices" ref={parentSelection}>
            {phraseQuestions?.map((item: any, itemIndex: number) => {
              return (
                <Button
                  className={`single-choice ${
                    persianRegex.test(item.text)
                      ? "persianTextStyle"
                      : "englishTextStyle"
                  }`}
                  id={item.id}
                  key={itemIndex}
                  ref={selected.current[itemIndex]}
                  disabled={
                    myArray.includes(selected.current[itemIndex]) &&
                    disableButton
                  }
                  sx={{
                    color: "gray.1",
                    border: `1px solid ${theme.palette.border.main}`,
                    "&.Mui-disabled": {
                      color:
                        myArray.includes(selected.current[itemIndex]) &&
                        mode === "dark"
                          ? "rgba(255,255,255,0.38) "
                          : "rgba(0,0,0,0.38) ",
                    },
                  }}
                  onClick={() => handleCorrectChoice(item.id, itemIndex)}
                >
                  <audio
                    src={item.tts}
                    ref={selectedAudio.current[itemIndex]}
                  />
                  {item?.text}
                </Button>
              );
            })}
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </motion.div>
  );
}

export default StorySelectPhraseQuestion;
