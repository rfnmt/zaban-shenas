import React, { useState, useRef } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import Lottie from "react-lottie-player";

import * as whiteLottieAnimation from "@/public/lottie-files/white-audio-animation.json";
import CircularProgress from "@mui/material/CircularProgress";
import SimpleProcessingText from "@/components/textProcessing/simpleProcessingText";

import "./style.scss";

function MainAudioWithTranscript({ resource }) {
  const [playing, setPlaying] = useState(false);
  const player = useRef<HTMLVideoElement | undefined | null>();
  const theme = useTheme() as any;

  function togglePlayer() {
    const audios = document.querySelectorAll("audio");

    for (const iterator of audios) {
      iterator.currentTime = 0;
      iterator.pause();
    }

    if (playing === true) {
      setPlaying(false);
      player.current?.pause();
    } else {
      setPlaying(true);
      player.current?.play();
    }
  }
  let iconColor = theme.palette.white.flexible;
  const [currentAudioTime, setAudioCurrentTime] = useState(0);
  function handleElapsedTime(e) {
    const { currentTime, duration } = e?.target;
    //
    setAudioCurrentTime((currentTime * 100) / duration);
  }

  function handleOnEnded() {
    setAudioCurrentTime(0);
    setPlaying(false);
  }
  const mediaUrl = resource?.audio
    ? resource?.audio?.startsWith("https://academy")
      ? resource?.audio
      : "https://academy-strapi.staging.zabanshenas.com/" + resource?.audio
    : null;

  function onAudioTimeUpdate(e) {
    const { currentTime, duration } = e?.target;
    setAudioCurrentTime((currentTime * 100) / duration);
  }
  return (
    <>
      Resource main (audio) + transcript
      <Box
        className="main-audio-transcript-holder"
        sx={{ backgroundColor: theme.palette.primary.min }}
      >
        <Box
          className="audio-player"
          sx={{ backgroundColor: theme.palette.primary.main }}
        >
          {currentAudioTime !== 0 && (
            <CircularProgress
              variant="determinate"
              value={currentAudioTime}
              sx={{
                width: "46px !important",
                height: "46px !important",
                color: "#fff",
                position: "absolute",
              }}
            />
          )}

          <audio
            ref={player}
            src={resource.main_media}
            onTimeUpdate={onAudioTimeUpdate}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setAudioCurrentTime(0)}
          />

          <Button
            onClick={togglePlayer}
            className="lottie-animation"
            sx={{
              // "& .tts-play-icon path ": { fill: iconColor },
              position: "absolute",
            }}
          >
            <Lottie
              loop={currentAudioTime > 0 ? true : false}
              play={currentAudioTime > 0 ? true : false}
              animationData={whiteLottieAnimation}
              style={{ width: 24, height: 24, position: "relative" }}
            />
            {/* <Lottie
              play={false}
              loop={false}
              animationData={audioPlayerLottie}
              style={{ width: 24, height: 24, position: "relative" }}
            /> */}
            {/* <Icon
              icon="record-voice"
              className="tts-play-icon"
              width={24}
              height={24}
            /> */}
          </Button>
        </Box>
        <Typography sx={{ color: "gray.1" }}>
          <SimpleProcessingText data={resource?.transcript} />
        </Typography>
      </Box>
    </>
  );
}

export default MainAudioWithTranscript;
