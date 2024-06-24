import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import React, { memo } from "react";

import WordWithTTS from "./wordWithTTS";
import OnlyTTS from "./onlyTTS";
import { RootReduxState } from "@/providers/Redux/store";
import { changeSelectedLearningWord } from "../helpers";

function LearningWord({ item }) {
  const theme = useTheme() as any;

  const { selectedLearningWord, currectItems, wrongItems, disableItems } =
    useSelector((state: RootReduxState) => state?.matchQuestions);

  const { currentQuestionIndex, allQuestion } = useSelector(
    (state: RootReduxState) => state.question
  );

  let color = theme.palette.gray[1];
  let borderColor = "transparent";
  let isDisable = false;

  if (allQuestion[currentQuestionIndex]?.id === item?.id) {
    if (selectedLearningWord?.key === item?.key) {
      color = theme.palette.system.blue;
      borderColor = theme.palette.system.blue;
    }

    if (currectItems === item?.key) {
      color = theme.palette.success.main;
      borderColor = theme.palette.success.main;
    }

    if (wrongItems?.length && wrongItems[0] === item?.key) {
      color = theme.palette.error.main;
      borderColor = theme.palette.error.main;
    }

    isDisable = disableItems.includes(item?.key);
  }

  return (
    <Box
      sx={{
        boxShadow: "0 1px 1px rgba(0,0,0,.16)",
        backgroundColor: "background.main",
        color: color,
        display: "flex",
        borderColor: `${borderColor} !important`,
        opacity: isDisable ? 0.2 : 1,
        pointerEvents: isDisable ? "none" : "auto",
      }}
      className="learning-item"
      onClick={() => {
        if (allQuestion[currentQuestionIndex]?.id === item.id)
          changeSelectedLearningWord(item);
      }}
    >
      {item?.learning_word ? (
        <WordWithTTS data={item} />
      ) : (
        <OnlyTTS data={item} />
      )}
    </Box>
  );
}

export default memo(LearningWord);
