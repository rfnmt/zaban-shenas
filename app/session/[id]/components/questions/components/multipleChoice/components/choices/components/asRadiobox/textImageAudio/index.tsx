import React, { useRef, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { Choices } from "@/app/session/[id]/components/questions/questions.interfaces";
import { RootReduxState } from "@/providers/Redux/store";
import "./style.scss";
import Image from "next/image";
import { textIsFarsi } from "@/modules/helper";

type Props = {
  choise: Choices;
  click: (id: number) => void;
};

function TextImageAudio({ choise, click }: Props) {
  const theme = useTheme() as any;
  const player = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(false);
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

  function togglePlayer() {
    var audios = document.querySelectorAll("audio");

    for (const iterator of audios) {
      iterator.currentTime = 0;
      iterator.pause();
    }
    const { current } = player;
    if (playing === true) {
      setPlaying(false);
      current.pause();
    } else {
      setPlaying(true);
      current.play();
    }
  }

  return (
    <>
      <audio
        ref={player}
        src={choise?.audio}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      <Box
        onClick={() => {
          togglePlayer();
          click(choise.id);
        }}
        className={`text-image-audio-choice-wrapper ${
          textIsFarsi(choise.text) ? "fa" : "en"
        }`}
        sx={{
          border: choiseBorder,
          backgroundColor: "white.flexible",
        }}
      >
        <Box className="image-container">
          <Image src={choise?.image} alt={choise.text} objectFit="cover" fill />
        </Box>
        <Typography sx={{ color: textColor }}>{choise?.text}</Typography>
      </Box>
    </>
  );
}

export default TextImageAudio;
