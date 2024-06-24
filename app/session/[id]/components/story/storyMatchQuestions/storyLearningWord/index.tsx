import React, { memo } from "react";
import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

import StoryWordWithTTS from "./storyWordWithTTS";
import StoryOnlyTTS from "./storyOnlyTTS";
import { changeStorySelectedLearningWord } from "../../helpers";
import { RootReduxState } from "@/providers/Redux/store";

function StoryLearningWord({ item }) {
  const theme = useTheme() as any;
  const {
    storySelectedLearningWord,
    storyCurrectItems,
    storyWrongItems,
    storyDisableItems,
  } = useSelector((state: RootReduxState) => state?.storyMatching);

  let color = theme.palette.gray[1];
  let borderColor = "transparent";
  let isDisable = false;

  if (storySelectedLearningWord?.id === item?.id) {
    color = theme.palette.system.blue;
    borderColor = theme.palette.system.blue;
  }

  if (storyCurrectItems === item?.id) {
    color = theme.palette.success.main;
    borderColor = theme.palette.success.main;
  }

  if (storyWrongItems?.length && storyWrongItems[0] === item?.id) {
    color = theme.palette.error.main;
    borderColor = theme.palette.error.main;
  }

  isDisable = storyDisableItems.includes(item?.id);

  return (
    <Box
      sx={{
        boxShadow: "0 1px 1px rgba(0,0,0,.16)",
        backgroundColor: "background.main",
        // color: color,
        display: "flex",
        borderColor: `${borderColor} !important`,
        opacity: isDisable ? 0.2 : 1,
        pointerEvents: isDisable ? "none" : "auto",
        "& p": {
          color: color,
        },
      }}
      className="pairs-item learning-items"
      onClick={() => {
        changeStorySelectedLearningWord(item);
      }}
    >
      {item?.learning_word ? (
        <StoryWordWithTTS data={item} />
      ) : (
        <StoryOnlyTTS data={item} />
      )}
    </Box>
  );
}

export default memo(StoryLearningWord);
