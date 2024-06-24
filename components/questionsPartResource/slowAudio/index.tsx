import React, { useRef, useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import Icon from "@/components/icon";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStopMainAudio,
  updateStopSlowAudio,
} from "@/providers/Redux/lesson/questionSlice/multipleChoices/multipleChoicesSlice";

function SlowAudio({ resource }) {
  const dispatch = useDispatch();
  const { stopSlowAudio, stopMainAudio } = useSelector(
    (state) => state.multipleChoise
  );
  const theme = useTheme() as any;
  const [playing, setplaying] = useState(false);
  const player = useRef<HTMLVideoElement | undefined | null>();
  function togglePlayer() {
    dispatch(updateStopSlowAudio(false));
    const audio = document.querySelector("audio");
    var audios = document.querySelectorAll("audio");
    //   audio?.play();

    for (const iterator of audios) {
      iterator.currentTime = 0;
      iterator.pause();
    }

    if (playing === true) {
      setplaying(false);
      player.current?.pause();
      // dispatch(updateStopMainAudio(false));
    } else {
      setplaying(true);
      player.current?.play();
      dispatch(updateStopMainAudio(true));
    }
  }

  useEffect(() => {
    if (stopSlowAudio) {
      setplaying(false);
      player.current?.pause();
    }
  }, [stopSlowAudio]);

  return (
    <Box
      className="slow-audio-holder"
      onClick={togglePlayer}
      sx={{ backgroundColor: theme.palette.primary.main }}
    >
      <audio
        src={resource?.slow_audio}
        ref={player}
        onEnded={() => setplaying(false)}
      />
      <Icon size={24} className="" icon="slow-speed" />
    </Box>
  );
}

export default SlowAudio;
