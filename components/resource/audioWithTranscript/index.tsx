import React, { useEffect, useRef, useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import Lottie from "react-lottie-player";
import { useSelector } from "react-redux";
import { RootReduxState } from "@/providers/Redux/store";
// import ProccessText from "@/app/session/[id]/components/tip/components/proccessText";
import * as whiteLottieAnimation from "@/public/lottie-files/white-audio-animation.json";
import SimpleProcessingText from "@/components/textProcessing/simpleProcessingText";
import "./style.scss";

function AudioWithTranscript({ data }: { data: Data }) {
  const [playing, setplaying] = useState(false);
  const player = useRef<HTMLVideoElement | undefined | null>();
  const [currentAudioTime, setAudioCurrentTime] = useState(0);

  const { allQuestion, currentQuestionIndex, goToSlide } = useSelector(
    (state: RootReduxState) => state.question
  );
  const { visibleTipBottomSheet } = useSelector(
    (state: RootReduxState) => state.general
  );

  const currentQuestion = allQuestion[currentQuestionIndex];

  function togglePlayer() {
    var videos = document.querySelectorAll("video");
    var audios = document.querySelectorAll("audio");

    if (currentQuestion?.data?.id === data?.id) {
      for (const iterator of videos) {
        // iterator.currentTime = 0;
        iterator.pause();
      }

      for (const iterator of audios) {
        // ahmad commented this
        // iterator.currentTime = 0;
        iterator.pause();
      }

      if (playing === true) {
        player.current?.pause();
      } else {
        player.current?.play();
      }
    } else {
      player.current?.pause();
      player.current.currentTime = 0;
    }
  }

  function onAudioTimeUpdate(e) {
    const { currentTime, duration } = e?.target;
    if (duration) setAudioCurrentTime((currentTime * 100) / duration);
  }

  const { viewType } = useSelector(
    (state: RootReduxState) => state.sessionNavigator
  );

  useEffect(() => {
    if (goToSlide === false) {
      if (visibleTipBottomSheet === true) {
        player.current?.pause();
        player.current.currentTime = 0;
        return;
      }
      if (visibleTipBottomSheet === false) {
        if (viewType === "verifyNow") {
          togglePlayer();
        } else if (viewType === "skipVocabExaminationQuestion") {
          player.current?.pause();
        }
      }
    }
    return () => {
      if (player && player.current) {
        player.current.currentTime = 0;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goToSlide, visibleTipBottomSheet, viewType]);

  const mediaUrl = data?.resource?.main_media
    ? data?.resource?.main_media?.startsWith("https://academy")
      ? data?.resource?.main_media
      : "https://academy-strapi.staging.zabanshenas.com/" +
        data?.resource?.main_media
    : null;

  return (
    <>
      <Box className="audio-transcript" sx={{ backgroundColor: "primary.min" }}>
        <Box className="audio-player" sx={{ backgroundColor: "primary.main" }}>
          {currentAudioTime !== 0 && (
            <CircularProgress
              variant="determinate"
              value={currentAudioTime}
              sx={{
                width: "47px !important",
                height: "47px !important",
                color: "#fff",
                position: "absolute",
              }}
            />
          )}

          <audio
            ref={player}
            src={mediaUrl}
            onTimeUpdate={onAudioTimeUpdate}
            onPlay={() => setplaying(true)}
            onPause={() => setplaying(false)}
            onEnded={() => setAudioCurrentTime(0)}
          />

          <Button
            onClick={togglePlayer}
            className="lottie-animation"
            sx={{ position: "absolute" }}
          >
            <Lottie
              loop={playing ? true : false}
              play={playing}
              animationData={whiteLottieAnimation}
              style={{ width: 24, height: 24, position: "relative" }}
            />
          </Button>
        </Box>

        <Box
          sx={{
            "& .unvisible-slice": {
              display: "inline-block",
              borderBottom: (theme) => `2px solid ${theme.palette.gray["3"]}`,
            },
          }}
        >
          <SimpleProcessingText data={data?.resource?.transcript} />
        </Box>
        {/* <ProccessText data={data?.resource?.transcript} /> */}
      </Box>
    </>
  );
}

export default AudioWithTranscript;
