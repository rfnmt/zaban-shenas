import React from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { IQuestionData } from "../../questions.interfaces";
import { RootReduxState } from "@/providers/Redux/store";
import { updateComposeView } from "@/providers/Redux/lesson/questionSlice/compose/composeSlice";
import OnlyTextArea from "./components/onlyTextArea";
import TextAreaWithChoice from "./components/textAreaWithChoice";
import PutChoicesInRows from "./components/putChoicesInRows";
import QuestionsPartSentence from "@/components/questionsPartSentence";
import FillDamagedSentenceWithChoices from "./components/fillDamagedSentenceWithChoices";
import DamagedSentence from "./components/damagedSentence";
import DamagedWords from "./components/damagedWords";
import Speaking from "./components/speaking";
import ResourceCompose from "@/components/resource";
import { textIsFarsi } from "@/modules/helper";

import "./style.scss";

function Compose({ data }: { data: IQuestionData }) {
  const dispatch = useDispatch();

  const { allQuestion, currentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.question
  );

  const currentQuestionId = allQuestion[currentQuestionIndex]?.id;

  function showSpecificChild() {
    if (data?.limitation === "speaking") {
      // Ask a question and expect a verbal response
      if (data?.id === currentQuestionId) {
        dispatch(updateComposeView("answerTextareaQuestionWithChoice"));
        return <Speaking />;
      }
    } else if (data?.ui_specs === "name") {
      // First, display the first choice user interface element.
      // Then, display a text area where the user can type a response.

      if (data?.id === currentQuestionId) {
        dispatch(updateComposeView("answerTextareaQuestionWithChoice"));
        return <TextAreaWithChoice data={data} />;
      }
    } else {
      if (data?.damaged_sentence && data?.choices?.length) {
        if (data?.id === currentQuestionId) {
          dispatch(updateComposeView("answerQuestionWithChoices"));
          return <FillDamagedSentenceWithChoices data={data} />;
        }
      } else if (!data?.damaged_sentence && data?.choices?.length) {
        if (data?.id === currentQuestionId) {
          dispatch(updateComposeView("answerQuestionWithPutChoicesInRows"));
          return <PutChoicesInRows data={data} />;
        }
        // render make sentence with choices
      } else if (data?.damaged_sentence && !data?.choices?.length) {
        // render sentence with blank section

        if (data?.ui_specs === "spelling") {
          if (data?.id === currentQuestionId) {
            dispatch(updateComposeView("answerQuestionDamagedWordWithWriting"));
            // render blank in verb with not space
            return <DamagedWords data={data} />;
          }
        } else {
          // render all verb if is blank
          if (data?.id === currentQuestionId) {
            dispatch(
              updateComposeView("answerQuestionDamagedSentenceWithWriting")
            );

            return <DamagedSentence data={data} />;
          }
        }
      } else if (!data?.damaged_sentence && !data?.choices?.length) {
        // render text area
        if (data?.id === currentQuestionId) {
          dispatch(updateComposeView("answerQuestionWithTextarea"));

          return <OnlyTextArea />;
        }
      }
    }
  }

  return (
    <Box className="compose-wrapper">
      <Typography
        sx={{ color: "gray.1" }}
        className={`question-prompt ${textIsFarsi(data?.prompt) ? "fa" : "en"}`}
      >
        {data?.prompt}
      </Typography>

      <ResourceCompose data={data} />

      <QuestionsPartSentence
        sentence={data?.sentence}
        ui_specs={data?.ui_specs}
      />
      <div className={`answer-and-question-area-${currentQuestionId}`}>
        {showSpecificChild()}
      </div>
    </Box>
  );
}

export default Compose;
