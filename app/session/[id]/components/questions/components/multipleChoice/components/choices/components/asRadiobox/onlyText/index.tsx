import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootReduxState } from "@/providers/Redux/store";
import { Choices } from "@/app/session/[id]/components/questions/questions.interfaces";
import "./style.scss";
import { textIsFarsi } from "@/modules/helper";

type Props = {
  choise: Choices;
  click: (id: number) => void;
};

function OnlyText({ choise, click }: Props) {
  const theme = useTheme() as any;
  const { multipleChoiceSelectedAnswer, multipleChoiceCorrectAnswer } =
    useSelector((state) => state.multipleChoise);

  const { viewType } = useSelector(
    (state: RootReduxState) => state.sessionNavigator
  );

  let choiseBorder = "2px solid transparent";
  let textColor = theme.palette.gray["1"];
  const correctItem = multipleChoiceCorrectAnswer[0];

  const isSelected = multipleChoiceSelectedAnswer.find((choiseId) => {
    return choiseId === choise.id;
  });

  const isCorrect = multipleChoiceCorrectAnswer.find((item) => {
    return item.id === choise.id;
  });

  if (viewType === "correct" || viewType === "incorrect") {
    if (correctItem?.id === choise?.id) {
      choiseBorder = `2px solid ${theme.palette.success.main} !important`;
      textColor = ` ${theme.palette.success.main} !important`;
    } else if (!isCorrect && isSelected > -1) {
      choiseBorder = `2px solid ${theme.palette.error.main} !important`;
      textColor = ` ${theme.palette.error.main} !important`;
    }
  } else if (isSelected > -1) {
    choiseBorder = `2px solid ${theme.palette.system.blue} !important`;
    textColor = `${theme.palette.system.blue} !important`;
  }

  return (
    <Box
      onClick={() => {
        click(choise.id);
      }}
      className={`multiple_choice_only_text_options ${
        textIsFarsi(choise.text) ? "fa" : "en"
      }`}
      sx={{
        border: choiseBorder,
        backgroundColor: "white.flexible",
      }}
    >
      <Typography sx={{ color: textColor }}>{choise?.text}</Typography>
    </Box>
  );
}

export default OnlyText;
