import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import ChoicesMultipleChoice from "./components/choices";
import QuestionsPartSentence from "@/components/questionsPartSentence";
import ResourceCompose from "@/components/resource";
import { textIsFarsi } from "@/modules/helper";
import { IQuestionData } from "../../questions.interfaces";
import { RootReduxState } from "@/providers/Redux/store";
import { triggerViewType } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";

import "./style.scss";

export type Props = {
  data: IQuestionData;
};

function MultipleChoice({ data }: Props) {
  const dispatch = useDispatch();
  const { allQuestion, currentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.question
  );

  useEffect(() => {
    if (data.id === allQuestion[currentQuestionIndex].id) {
      if (!data?.choices?.length || data?.choices?.length < 2) {
        dispatch(triggerViewType("ihaveunderstood"));
      } else {
        dispatch(triggerViewType("verifyNow"));
      }
    }

    return () => {};
  }, [currentQuestionIndex]);

  return (
    <Box className="multiple-choice-wrapper">
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
      <ChoicesMultipleChoice mainData={data} />
    </Box>
  );
}

export default MultipleChoice;
