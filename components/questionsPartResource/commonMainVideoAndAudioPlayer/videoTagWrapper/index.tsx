import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

import { RootReduxState } from "@/providers/Redux/store";
import Icon from "@/components/icon";

import "./style.scss";

function VideoTagWrapper({ data }) {
  const theme = useTheme() as any;
  const { mode } = useSelector((state: RootReduxState) => state.general);
  const [userPlayedThis, setUserPlayedThis] = useState(false);
  const player = useRef<HTMLVideoElement | undefined | null>();
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setplaying] = useState(false);
  // const [duration, setDuration] = useState(0);
  const [canPlay, setcanPlay] = useState(false);
  const [opacityIcon, setOpacityIcon] = useState(1);

  function togglePlayer() {
    if (!userPlayedThis) setUserPlayedThis(true);
    var videos = document.querySelectorAll("video");
    var audios = document.querySelectorAll("audio");

    for (const iterator of videos) {
      // iterator.currentTime = 0;
      iterator.pause();
    }

    for (const iterator of audios) {
      iterator.currentTime = 0;
      iterator.pause();
    }

    if (playing === true) {
      player.current?.pause();
      onpause();
    } else {
      onplay();
      player.current?.play();
    }
  }

  const onTimeUpdate = (e) => {
    const { currentTime, duration } = e?.target;
    setCurrentTime((currentTime * 100) / duration);
  };

  const mediaUrl = data?.main_media?.startsWith("https://academy")
    ? data?.main_media
    : "https://academy-strapi.staging.zabanshenas.com" + data?.main_media;

  if (!data?.cover_image) mediaUrl + "#t=0.1";

  const mediaCover = data?.cover_image?.startsWith("https://academy")
    ? data?.cover_image
    : "https://academy-strapi.staging.zabanshenas.com" + data?.cover_image;

  useEffect(() => {
    if (player?.current) player.current.src = mediaUrl;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onplay() {
    setplaying(true);
    player.current?.play();
    setTimeout(() => {
      setOpacityIcon(0);
    }, 200);
  }

  function onpause() {
    setplaying(false);
    setOpacityIcon(1);
  }

  const { allQuestion, currentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.question
  );

  const currentVideoSrc = Boolean(
    allQuestion[currentQuestionIndex]?.data?.resource?.main_media ===
      data?.main_media
  );

  function doplaying() {
    player.current?.play();
  }

  useEffect(() => {
    if (currentVideoSrc) doplaying();

    return () => {
      player.current?.pause();
    };
  }, [currentVideoSrc]);

  return (
    <Box>
      <div className="tip-media-wrapper">
        <Box
          onClick={togglePlayer}
          sx={{
            opacity: opacityIcon,
            background: (theme) => theme.palette.blackTransparent[1],
          }}
          className="toggle-player"
        >
          <Icon size={16} className="" icon={playing ? "pause" : "play"} />
        </Box>

        {/* {!userPlayedThis && data?.cover_image && (
          <Image
            fill
            alt=""
            src={mediaCover}
            style={{ background: theme.palette.white.flexible }}
          />
        )} */}

        <video
          // muted
          className="video-element multiple-question-player"
          autoPlay={currentVideoSrc}
          playsInline
          poster={mediaCover}
          onClick={togglePlayer}
          ref={player}
          onTimeUpdate={onTimeUpdate}
          onPlaying={onplay}
          onPause={onpause}
        />

        <div className="range">
          <input
            type="range"
            name="rng"
            min="0"
            step="0.25"
            value={currentTime}
            onChange={(e) => {
              const { value } = e?.target;
              player.current.currentTime =
                (value * player?.current?.duration) / 100;

              if (!playing) togglePlayer();
            }}
          />
        </div>
      </div>
    </Box>
  );
}

export default VideoTagWrapper;
