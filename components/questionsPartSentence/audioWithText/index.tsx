import React, { Key, useEffect, useRef, useState } from "react";
import { Box, Button, CircularProgress, useTheme } from "@mui/material";
import Lottie from "react-lottie-player";
import { useSelector } from "react-redux";

import * as whiteLottieAnimation from "@/public/lottie-files/white-audio-animation.json";
import { RootReduxState } from "@/providers/Redux/store";
import SimpleProcessingText from "@/components/textProcessing/simpleProcessingText";

import "./style.scss";
import { prepareSimpleTextProccessorContent } from "@/components/textProcessing/helpers/prepareSimpleTextProccessorContent";
import VisibleItem from "./proccessSentenceText/visibleItem";
import InvisibleItem from "./proccessSentenceText/invisibleItem";
import ProccesSentenceText from "./proccessSentenceText";

function AudioWithText({ data }: { data: Data }) {
  const [playing, setplaying] = useState(false);
  const player = useRef<HTMLVideoElement | undefined | null>();
  const [currentAudioTime, setAudioCurrentTime] = useState(0);

  const { currentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.question
  );

  function togglePlayer() {
    const audios = document.querySelectorAll("audio");

    for (const iterator of audios) {
      iterator.currentTime = 0;
      iterator.pause();
    }

    if (playing === true) {
      player.current?.pause();
    } else {
      player.current?.play();
    }
  }

  function onAudioTimeUpdate(e) {
    const { currentTime, duration } = e?.target;
    setAudioCurrentTime((currentTime * 100) / duration);
  }

  useEffect(() => {
    // togglePlayer();

    return () => {
      if (player && player.current) {
        player.current.currentTime = 0;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex]);

  const mediaUrl = data?.audio
    ? data?.audio?.startsWith("https://academy")
      ? data?.audio
      : "https://academy-strapi.staging.zabanshenas.com/" + data?.audio
    : null;

  const preparedContent = prepareSimpleTextProccessorContent(data?.text);

  return (
    <>
      {data.audio !== null ? (
        <Box
          className="sentence-audio-transcript"
          sx={{ backgroundColor: "primary.min" }}
        >
          <Box
            className="sentence-audio-player"
            sx={{ backgroundColor: "primary.main" }}
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
                loop={currentAudioTime > 0 ? true : false}
                play={currentAudioTime > 0 ? true : false}
                animationData={whiteLottieAnimation}
                style={{ width: 24, height: 24, position: "relative" }}
              />
            </Button>
          </Box>
          <ProccesSentenceText data={preparedContent} />
        </Box>
      ) : (
        <Box className="sentence-only-text-wrapper">
          <ProccesSentenceText data={preparedContent} />
        </Box>
      )}
    </>
  );
}

export default AudioWithText;
