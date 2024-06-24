import React, { useState, useEffect, createRef, useRef } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootReduxState } from "@/providers/Redux/store";
import { storyOtherPartsMotion, shuffleArray } from "@/modules/helper";
import { triggerStoryButtonEnable } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { motion } from "framer-motion";
import Icon from "@/components/icon";
import { updateStoryPushCorrectAnswerIntoArray } from "@/providers/Redux/lesson/storySlice/storySlice";
import "./style.scss";

type StoryMultipleChoiceQuestionData = {
  story_multiple_choice_question_data: any;
  index: number;
};
function StoryMultipleChoiceQuestion({
  story_multiple_choice_question_data,
  index,
}: StoryMultipleChoiceQuestionData) {
  const theme = useTheme() as any;
  const dispatch = useDispatch();
  const { mode } = useSelector((state: RootReduxState) => state.general);
  let _mode = "";
  if (mode === "prefers-color-scheme")
    _mode = window?.matchMedia("(prefers-color-scheme: light)")?.matches
      ? "light"
      : "dark";
  else _mode = mode;

  const { storyCurrentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.story
  );
  const [multiChoiceQuestions, setMultiChoiceQuestions] = useState() as any;
  const [hideMultiChoiceQuestion, setHideMultiChoiceQuestion] = useState(false);
  const [userAnsweredTheQuestion, setUserAnsweredTheQuestion] = useState(true);
  const [answeredArray, setansweredArray] = useState<number>();

  function prepareContent(_data: Data) {
    let loadShuffle = _data.map((item: any, index: number) => {
      return {
        id: index,
        ...item,
      };
    });
    loadShuffle = shuffleArray(loadShuffle);
    setMultiChoiceQuestions(loadShuffle);
  }

  useEffect(() => {
    prepareContent(story_multiple_choice_question_data?.choices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [story_multiple_choice_question_data?.choices]);

  useEffect(() => {
    if (index === storyCurrentQuestionIndex) {
      dispatch(triggerStoryButtonEnable(false));
    }

    if (index < storyCurrentQuestionIndex) {
      setHideMultiChoiceQuestion(true);
    } else {
      setHideMultiChoiceQuestion(false);
    }
  }, [storyCurrentQuestionIndex]);

  ////////////////////
  ///////////////////
  //////////////////
  const { storyButtonEnable } = useSelector(
    (state: RootReduxState) => state.sessionNavigator
  );
  const [disableFormControlLabel, setDisableFormControlLabel] = useState(false);
  const [myElem, setMyElem] = useState<Array<any>>([]);
  const [myCheckboxElem, setMyCheckboxElem] = useState<Array<any>>([]);
  const selectedAudioRef = useRef([]);

  const parentSelection = useRef<null | any>(null);
  const selectedCheckbox = useRef([]);
  const selectedFormControlLabel = useRef([]);

  selectedCheckbox.current = story_multiple_choice_question_data?.choices.map(
    (elem, i) => selectedCheckbox.current[i] ?? createRef()
  );
  selectedFormControlLabel.current =
    story_multiple_choice_question_data?.choices.map(
      (elem, i) => selectedFormControlLabel.current[i] ?? createRef()
    );

  selectedAudioRef.current = story_multiple_choice_question_data?.choices.map(
    (elem, i) => selectedAudioRef.current[i] ?? createRef()
  );

  function handleCorrectCheckboxChoice(
    elementID: number,
    multiChoiceIndex: number
  ) {
    if (selectedAudioRef.current[multiChoiceIndex]) {
      selectedAudioRef.current[multiChoiceIndex].current.play();
    }
    if (story_multiple_choice_question_data.correct_answer === elementID) {
      for (let i = 0; i < parentSelection.current.children.length; i++) {
        const getChildrensID = Number(
          parentSelection.current.children[i].children[2]?.id
        );
        if (getChildrensID !== elementID) {
          setMyElem((prev) => [
            ...prev,
            parentSelection.current.children[i].children[2],
          ]);

          setDisableFormControlLabel(true);
        }
      }
      const getSingleCheckboxElement =
        selectedCheckbox.current[multiChoiceIndex];
      setMyCheckboxElem((prev) => [...prev, getSingleCheckboxElement]);
      selectedCheckbox.current[
        multiChoiceIndex
      ].current.style.background = `${theme.palette.success.main}`;
      dispatch(triggerStoryButtonEnable(true));
      if (userAnsweredTheQuestion === true) {
        setansweredArray(1);
        // at below code 1 addes twice
        // dispatch(updateStoryPushCorrectAnswerIntoArray(1));
      }
      ////////////
      ////////////
      ///////////
    } else {
      const getSingleCheckboxElement =
        selectedCheckbox.current[multiChoiceIndex];
      setMyCheckboxElem((prev) => [...prev, getSingleCheckboxElement]);
      const getSingleElement =
        parentSelection.current.children[multiChoiceIndex];

      setMyElem((prev) => [...prev, getSingleElement.children[2]]);
      selectedCheckbox.current[
        multiChoiceIndex
      ].current.style.background = `${theme.palette.error.main} `;

      setTimeout(() => {
        selectedCheckbox.current[multiChoiceIndex].current.style.background =
          mode === "dark" ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)";
        setDisableFormControlLabel(true);
      }, 600);
      setUserAnsweredTheQuestion(false);
      dispatch(triggerStoryButtonEnable(false));
    }
  }

  const myArray = [...new Set(myElem)];
  const mySpecialCheckboxArr = [...new Set(myCheckboxElem)];

  useEffect(() => {
    dispatch(updateStoryPushCorrectAnswerIntoArray(answeredArray));
  }, [answeredArray]);

  return (
    <motion.div {...storyOtherPartsMotion}>
      <Box
        className="story-multiple-choice-question"
        sx={{
          display: hideMultiChoiceQuestion === true ? "none" : "",
          // height: `${
          //   story_multiple_choice_question_data?.choices.length * 42 + 46.5
          // }px`,
          height: "fit-content",
        }}
      >
        <Typography
          sx={{ color: "gray.1" }}
          className="story-multiple-choice-question-prompt"
        >
          {story_multiple_choice_question_data?.prompt}
        </Typography>

        <FormGroup
          className="wrap-multiple-choice-question-choices"
          ref={parentSelection}
        >
          {storyButtonEnable ? <Box className="wrap-parent-element" /> : <></>}

          {multiChoiceQuestions?.map(
            (multiChoiceItem: any, multiChoiceIndex: number) => {
              return (
                <Box key={multiChoiceItem.id} sx={{ position: "relative" }}>
                  <Box
                    sx={
                      myArray.includes(
                        selectedFormControlLabel.current[multiChoiceIndex]
                          .current
                      )
                        ? {
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            top: "0",
                            left: "0",
                            zIndex: 100,
                          }
                        : {}
                    }
                  />
                  <audio
                    src={multiChoiceItem.tts}
                    ref={selectedAudioRef.current[multiChoiceIndex]}
                  />
                  <FormControlLabel
                    id={multiChoiceItem.id}
                    control={
                      <Checkbox
                        sx={{
                          width: "20px",
                          height: "20px",
                        }}
                        id={String(multiChoiceItem?.id)}
                        ref={selectedCheckbox.current[multiChoiceIndex]}
                        checked={mySpecialCheckboxArr.includes(
                          selectedCheckbox.current[multiChoiceIndex]
                        )}
                        checkedIcon={
                          myArray.includes(
                            selectedFormControlLabel.current[multiChoiceIndex]
                              .current
                          ) ? (
                            <>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  "& path": {
                                    fill: "#fff",
                                  },
                                }}
                              >
                                <Icon color="#fff" icon="close" size={40} />
                              </Box>
                            </>
                          ) : (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                "& path": {
                                  fill: "#fff",
                                },
                              }}
                            >
                              <Icon color="#fff" icon="check-mark" size={16} />
                            </Box>
                          )
                        }
                      />
                    }
                    sx={{
                      color: theme.palette.gray[1],
                      ".MuiFormControlLabel-label.Mui-disabled": {
                        color:
                          myArray.includes(
                            selectedFormControlLabel.current[multiChoiceIndex]
                              .current
                          ) && mode === "dark"
                            ? "rgba(255,255,255,0.38) !important"
                            : "rgba(0,0,0,0.38) !important",
                      },
                      "& span": {
                        color: theme.palette.gray[1],
                        "&.Mui-disabled": {
                          color:
                            myArray.includes(
                              selectedFormControlLabel.current[multiChoiceIndex]
                                .current
                            ) && mode === "dark"
                              ? "rgba(255,255,255,0.38)"
                              : "rgba(0,0,0,0.38)",
                        },
                      },
                    }}
                    label={multiChoiceItem?.text}
                    ref={selectedFormControlLabel.current[multiChoiceIndex]}
                    disabled={
                      myArray.includes(
                        selectedFormControlLabel.current[multiChoiceIndex]
                          .current
                      ) && disableFormControlLabel
                    }
                    onClick={() =>
                      handleCorrectCheckboxChoice(
                        multiChoiceItem.id,
                        multiChoiceIndex
                      )
                    }
                  />
                </Box>
              );
            }
          )}
        </FormGroup>
      </Box>
    </motion.div>
  );
}

export default StoryMultipleChoiceQuestion;
