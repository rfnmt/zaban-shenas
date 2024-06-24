import React, { useRef, useState, useEffect } from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";
import Icon from "@/components/icon";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStopMainAudio,
  updateStopSlowAudio,
} from "@/providers/Redux/lesson/questionSlice/multipleChoices/multipleChoicesSlice";

function MainAudio({ resource }) {
  const dispatch = useDispatch();
  const { stopMainAudio, stopSlowAudio } = useSelector(
    (state) => state.multipleChoise
  );
  const theme = useTheme() as any;
  const [playing, setPlaying] = useState(false);
  const player = useRef<HTMLVideoElement | undefined | null>();
  function togglePlayer() {
    dispatch(updateStopMainAudio(false));
    // const audio = document.querySelector("audio");
    // var audios = document.querySelectorAll("audio");
    //   audio?.play();

    // for (const iterator of audios) {
    //   iterator.currentTime = 0;
    //   iterator.pause();
    // }

    if (playing === true) {
      setPlaying(false);
      player.current?.pause();
      // dispatch(updateStopSlowAudio(false));
    } else {
      setPlaying(true);
      player.current?.play();
      dispatch(updateStopSlowAudio(true));
    }
  }

  useEffect(() => {
    if (stopMainAudio) {
      setPlaying(false);
      player.current?.pause();
    }
  }, [stopMainAudio]);

  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  function handleElapsedTime(e: any) {
    const { currentTime, duration } = e?.target;
    setCurrentAudioTime((currentTime * 100) / duration);
  }

  function handleOnEnded() {
    setCurrentAudioTime(0);
    setPlaying(false);
  }
  return (
    <Box
      className="main-audio-holder"
      onClick={togglePlayer}
      sx={{ backgroundColor: theme.palette.primary.main }}
    >
      {currentAudioTime !== 0 && (
        <CircularProgress
          variant="determinate"
          value={currentAudioTime}
          sx={{
            width: "65px !important",
            height: "65px !important",
            color: "#fff",
            position: "absolute",
          }}
        />
      )}
      <audio
        src={resource?.main_media}
        ref={player}
        onTimeUpdate={handleElapsedTime}
        onEnded={handleOnEnded}
      />
      <Icon size={16} className="" icon={playing ? "pause" : "play"} />
    </Box>
  );
}

export default MainAudio;
