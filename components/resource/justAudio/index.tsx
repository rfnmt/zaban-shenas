import React, { useEffect, useRef, useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import Lottie from "react-lottie-player";

import { RootReduxState } from "@/providers/Redux/store";
import * as whiteLottieAnimation from "@/public/lottie-files/white-audio-animation.json";
import Icon from "@/components/icon";

import "./style.scss";

function JustAudio({ data }: { data: Data }) {
  console.log({ data });

  const [playing, setplaying] = useState(false);
  const [slowPlaying, setSlowPlaying] = useState(false);
  const hasSlowAudio = Boolean(data?.resource?.slow_audio);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [slowAudioCurrentTime, setSlowAudioCurrentTime] = useState(0);

  const { allQuestion, currentQuestionIndex, goToSlide } = useSelector(
    (state: RootReduxState) => state.question
  );

  const { sessionType } = useSelector((state: RootReduxState) => state.session);

  const { viewType } = useSelector(
    (state: RootReduxState) => state.sessionNavigator
  );

  const { visibleTipBottomSheet } = useSelector(
    (state: RootReduxState) => state.general
  );
  const currentQuestion = allQuestion[currentQuestionIndex];

  const audioPlayer = useRef<HTMLVideoElement | undefined | null>();
  const slowAudioPlayer = useRef<HTMLVideoElement | undefined | null>();

  function toggleAudioPlayer() {
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
        audioPlayer.current?.pause();
      } else {
        if (slowAudioPlayer && slowAudioPlayer.current) {
          slowAudioPlayer.current?.pause();
          slowAudioPlayer.current.currentTime = 0;
        }
        audioPlayer.current?.play();
      }
    } else {
      audioPlayer.current?.pause();
      audioPlayer.current.currentTime = 0;
    }
  }

  function toggleSlowAudioPlayer() {
    var videos = document.querySelectorAll("video");
    var audios = document.querySelectorAll("audio");

    if (Boolean(currentQuestion?.data?.id === data?.id)) {
      for (const iterator of videos) {
        // iterator.currentTime = 0;
        iterator.pause();
      }

      for (const iterator of audios) {
        // ahmad commented this
        // iterator.currentTime = 0;
        iterator.pause();
      }

      if (slowPlaying === true) {
        slowAudioPlayer.current?.pause();
      } else {
        audioPlayer.current?.pause();
        audioPlayer.current.currentTime = 0;
        slowAudioPlayer.current?.play();
      }
    } else {
      slowAudioPlayer.current?.pause();
    }
  }

  // useEffect(() => {
  //   if (goToSlide === false) {
  //     if (visibleTipBottomSheet === true) {
  //       audioPlayer.current?.pause();
  //       slowAudioPlayer.current?.pause();
  //       slowAudioPlayer.current.currentTime = 0;
  //       return;
  //     }
  //     if (mainMediaIsloaded && visibleTipBottomSheet === false) {
  //       if (viewType === "verifyNow") {
  //         toggleAudioPlayer();
  //       } else if (viewType === "skipVocabExaminationQuestion") {
  //         audioPlayer.current?.pause();
  //         slowAudioPlayer.current?.pause();
  //       }
  //     }
  //   }
  //   return () => {
  //     if (audioPlayer && audioPlayer.current) {
  //       setplaying(false);
  //       audioPlayer.current.currentTime = 0;
  //     }
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [visibleTipBottomSheet, goToSlide, viewType]);

  useEffect(() => {
    if (goToSlide === false) {
      if (mainMediaIsloaded && visibleTipBottomSheet === false) {
        if (viewType === "verifyNow" || viewType === "ihaveunderstood") {
          if (sessionType === "story") toggleAudioPlayer();
        } else if (viewType === "skipVocabExaminationQuestion") {
          audioPlayer.current?.pause();
        }
      } else if (visibleTipBottomSheet === true) {
        audioPlayer.current?.pause();
      }
    }

    return () => {
      if (audioPlayer && audioPlayer.current) {
        setplaying(false);
        audioPlayer.current.currentTime = 0;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goToSlide, visibleTipBottomSheet, viewType]);

  const onAudioTimeUpdate = (e) => {
    const { currentTime, duration } = e?.target;
    if (duration) setAudioCurrentTime((currentTime * 100) / duration);
  };

  const onSlowAudioTimeUpdate = (e) => {
    const { currentTime, duration } = e?.target;
    if (duration) setSlowAudioCurrentTime((currentTime * 100) / duration);
  };

  const mediaUrl = data?.resource?.main_media
    ? data?.resource?.main_media?.startsWith("https://academy")
      ? data?.resource?.main_media
      : "https://academy-strapi.staging.zabanshenas.com/" +
        data?.resource?.main_media
    : null;

  const slowMediaUrl = data?.resource?.slow_audio
    ? data?.resource?.slow_audio?.startsWith("https://academy")
      ? data?.resource?.slow_audio
      : "https://academy-strapi.staging.zabanshenas.com/" +
        data?.resource?.slow_audio
    : null;

  const [mainMediaIsloaded, setMainMediaIsloaded] = useState(true);

  return (
    <Box className={`only-audio ${!mainMediaIsloaded ? "pulse" : ""}`}>
      {hasSlowAudio && (
        <Box className="slow-audio-player">
          <Button
            className="controll"
            onClick={toggleSlowAudioPlayer}
            sx={{
              backgroundColor: "primary.main",
              "&:hover": { backgroundColor: "primary.main" },
            }}
            startIcon={
              slowPlaying ? (
                <Lottie
                  play={true}
                  loop={true}
                  animationData={whiteLottieAnimation}
                  style={{ width: 24, height: 24, position: "relative" }}
                />
              ) : (
                <Icon icon="slow-speed" width={24} height={24} />
              )
            }
            endIcon={
              slowAudioCurrentTime ? (
                <CircularProgress
                  variant="determinate"
                  value={slowAudioCurrentTime}
                  className="determinate"
                />
              ) : (
                ""
              )
            }
          />
          <audio
            src={slowMediaUrl}
            ref={slowAudioPlayer}
            onPlay={() => setSlowPlaying(true)}
            onPause={() => setSlowPlaying(false)}
            onTimeUpdate={onSlowAudioTimeUpdate}
            onEnded={() => setSlowAudioCurrentTime(0)}
          />
        </Box>
      )}

      <Box className="audio-player">
        <Button
          className="controll"
          onClick={toggleAudioPlayer}
          sx={{
            backgroundColor: "primary.main",
            "&:hover": { backgroundColor: "primary.main" },
          }}
          startIcon={
            playing ? (
              <Lottie
                play={true}
                loop={true}
                animationData={whiteLottieAnimation}
                style={{ width: 24, height: 24, position: "relative" }}
              />
            ) : (
              <Icon icon="play" width={24} height={24} />
            )
          }
          endIcon={
            audioCurrentTime ? (
              <CircularProgress
                variant="determinate"
                value={audioCurrentTime}
                className="determinate"
              />
            ) : (
              ""
            )
          }
        />

        <audio
          onLoadedMetadata={() => setMainMediaIsloaded(true)}
          src={mediaUrl}
          ref={audioPlayer}
          onTimeUpdate={onAudioTimeUpdate}
          onPlay={() => setplaying(true)}
          onPause={() => setplaying(false)}
          onEnded={() => setAudioCurrentTime(0)}
        />
      </Box>
    </Box>
  );
}

export default JustAudio;
