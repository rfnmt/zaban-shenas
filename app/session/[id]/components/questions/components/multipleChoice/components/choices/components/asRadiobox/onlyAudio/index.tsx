import React, { Fragment, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Box, useTheme } from "@mui/material";
import { RootReduxState } from "@/providers/Redux/store";
import Icon from "@/components/icon";
import { Choices } from "@/app/session/[id]/components/questions/questions.interfaces";
import { textIsFarsi } from "@/modules/helper";

type Props = {
  choise: Choices;
  click: (id: number) => void;
};

function OnlyAudio({ choise, click }: Props) {
  const theme = useTheme() as any;
  const { viewType } = useSelector(
    (state: RootReduxState) => state.sessionNavigator
  );
  const { multipleChoiceSelectedAnswer, multipleChoiceCorrectAnswer } =
    useSelector((state: RootReduxState) => state.multipleChoise);
  const player = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(false);

  function togglePlayer() {
    var audios = document.querySelectorAll("audio");

    for (const iterator of audios) {
      iterator.currentTime = 0;
      iterator.pause();
    }

    const { current } = player;

    if (playing) {
      current.pause();
      setPlaying(false);
    } else {
      current.play();
      setPlaying(true);
    }
  }

  let choiseBorder = "2px solid transparent";
  let iconColor = theme.palette.gray["1"];
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
      iconColor = ` ${theme.palette.success.main} !important`;
    } else if (!isCorrect && isSelected > -1) {
      choiseBorder = `2px solid ${theme.palette.error.main} !important`;
      iconColor = ` ${theme.palette.error.main} !important`;
    }
  } else if (isSelected > -1) {
    choiseBorder = `2px solid ${theme.palette.system.blue} !important`;
    iconColor = `${theme.palette.system.blue} !important`;
  }

  return (
    <Fragment>
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
        className="audio-with-text-choice-options"
        sx={{
          border: choiseBorder,
          backgroundColor: "white.flexible",
          "& .equalizer path ": { fill: iconColor },
          "& .tts-play-icon path ": { fill: iconColor },
        }}
      >
        <Icon
          icon="record-voice"
          className="tts-play-icon"
          width={24}
          height={24}
        />
        <Icon
          icon="equalizer"
          style={{ maxWidth: "100px", width: "auto" }}
          height={24}
          className="equalizer"
        />
      </Box>
    </Fragment>
  );
}

export default OnlyAudio;
