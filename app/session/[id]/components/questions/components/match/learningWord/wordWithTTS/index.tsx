import { textIsFarsi } from "@/modules/helper";
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

function WordWithTTS({ data }: Props) {
  const theme = useTheme() as any;

  const { selectedLearningWord, currectItems, wrongItems, disableItems } =
    useSelector((state: RootReduxState) => state?.matchQuestions);

  let color = theme.palette.gray[1];
  let borderColor = "transparent";
  let isDisable = false;

  if (selectedLearningWord?.key === data?.key) {
    color = theme.palette.system.blue;
    borderColor = theme.palette.system.blue;
  }

  if (currectItems === data?.key) {
    color = theme.palette.success.main;
    borderColor = theme.palette.success.main;
  }

  if (disableItems) {
    isDisable = disableItems.find((DI) => DI === data?.key) ? true : false;
  }

  if (wrongItems?.length && wrongItems[0] === data?.key) {
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
        className={`${textIsFarsi(data?.learning_word) ? "fa" : "en"}`}
        sx={{
          fontFamily: textIsFarsi(data?.learning_word) ? "IRansans" : "Comme",
          borderColor: `${borderColor} !important`,
          color: color,
        }}
      >
        {data?.learning_word}
      </Typography>
    </>
  );
}

export default WordWithTTS;
