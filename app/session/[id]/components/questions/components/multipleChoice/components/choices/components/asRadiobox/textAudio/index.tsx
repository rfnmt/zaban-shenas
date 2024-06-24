import React, { useRef, useState } from "react";
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

function TextAudio({ choise, click }: Props) {
  const theme = useTheme() as any;
  const player = useRef<HTMLAudioElement | null>(null);
  const [playig, setPlayig] = useState(false);
  const { viewType } = useSelector(
    (state: RootReduxState) => state.sessionNavigator
  );
  const { multipleChoiceSelectedAnswer, multipleChoiceCorrectAnswer } =
    useSelector((state: RootReduxState) => state.multipleChoise);

  function togglePlayer() {
    var audios = document.querySelectorAll("audio");

    for (const iterator of audios) {
      iterator.currentTime = 0;
      iterator.pause();
    }

    const { current } = player;

    if (playig) {
      current.pause();
      setPlayig(false);
    } else {
      current.play();
      setPlayig(true);
    }
  }

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
    <React.Fragment>
      <audio
        ref={player}
        src={choise?.audio}
        onPause={() => setPlayig(false)}
        onEnded={() => setPlayig(false)}
      />
      <Box
        onClick={() => {
          togglePlayer();
          click(choise.id);
        }}
        className="audio-with-text-choice-options"
        sx={{
          border: choiseBorder,
          backgroundColor: "white.flexible",
        }}
      >
        <Typography
          className={`${textIsFarsi(choise.text) ? "fa" : "en"}`}
          sx={{ color: textColor }}
        >
          {choise?.text}
        </Typography>
      </Box>
    </React.Fragment>
  );
}

export default TextAudio;
