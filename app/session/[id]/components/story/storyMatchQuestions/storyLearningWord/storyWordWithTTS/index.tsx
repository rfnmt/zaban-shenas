import { RootReduxState } from "@/providers/Redux/store";
import { Typography, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

type Props = {
  data: {
    tts: string;
    learning_word: string;
    id: number;
  };
};

function StoryWordWithTTS({ data }: Props) {
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

  if (storySelectedLearningWord?.id === data?.id) {
    color = theme.palette.system.blue;
    borderColor = theme.palette.system.blue;
  }

  if (storyCurrectItems === data?.id) {
    color = theme.palette.success.main;
    borderColor = theme.palette.success.main;
  }

  if (storyDisableItems) {
    isDisable = storyDisableItems.find((DI) => DI === data?.id) ? true : false;
  }

  if (storyWrongItems?.length && storyWrongItems[0] === data?.id) {
    color = theme.palette.error.main;
    borderColor = theme.palette.error.main;
  }

  return (
    <>
      {data?.tts && (
        <audio
          src={data?.tts}
          id={data?.tts?.split("/")[data?.tts?.split("/").length - 1]}
        />
      )}

      <Typography
        sx={{
          borderColor: `${borderColor} !important`,
          color: color,
        }}
      >
        {data?.learning_word}
      </Typography>
    </>
  );
}

export default StoryWordWithTTS;
