import React, { useRef, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { RootReduxState } from "@/providers/Redux/store";
import { updateTextAreaWithChoiceAnswer } from "@/providers/Redux/lesson/questionSlice/compose/composeSlice";
import { triggerButtonEnable } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { textIsFarsi } from "@/modules/helper";

function TextAudio({ item }) {
  const theme = useTheme() as any;
  const dispatch = useDispatch();

  const { textareaWithChoiceAnswer } = useSelector(
    (state: RootReduxState) => state.composeQuestions
  );

  const isSelected = textareaWithChoiceAnswer.selectable === item.text;

  const player = useRef<HTMLAudioElement | undefined | null>();

  const [playing, setPlaying] = useState(false);

  function togglePlayer() {
    var audios = document.querySelectorAll("audio");

    for (const iterator of audios) {
      iterator.currentTime = 0;
      iterator.pause();
    }

    if (playing === true) {
      setPlaying(false);
      player?.current?.pause();
    } else {
      setPlaying(true);
      player?.current?.play();
    }
  }

  return (
    <Box
      className="choice-item"
      onClick={() => {
        togglePlayer();

        if (!isSelected) {
          dispatch(
            updateTextAreaWithChoiceAnswer({
              selectable: item.text,
              freeText: textareaWithChoiceAnswer.freeText || "",
            })
          );

          if (textareaWithChoiceAnswer.freeText) {
            dispatch(triggerButtonEnable(true));
          }
        }
      }}
      sx={{
        backgroundColor: "white.flexible",
        border: `2px solid ${
          isSelected ? theme.palette.system.blue : "transparent"
        }`,
      }}
    >
      <audio
        ref={player}
        src={item?.audio}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      <Typography
        className={`${textIsFarsi(item?.text) ? "fa" : "en"}`}
        sx={{
          color: isSelected ? theme.palette.system.blue : theme.palette.gray[1],
        }}
      >
        {item?.text}
      </Typography>
    </Box>
  );
}

export default TextAudio;
