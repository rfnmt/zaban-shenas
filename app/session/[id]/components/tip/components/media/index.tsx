import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import Icon from "@/components/icon";
import { RootReduxState } from "@/providers/Redux/store";
import "./style.scss";

function Media({ data }) {
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
    setOpacityIcon(1);

    if (canPlay) {
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
        setplaying(false);
        player.current?.pause();
      } else {
        setplaying(true);
        player.current?.play();
        setTimeout(() => {
          setOpacityIcon(0);
        }, 200);
      }
    }
  }

  const onTimeUpdate = (e) => {
    const { currentTime, duration } = e?.target;
    setCurrentTime((currentTime * 100) / duration);
  };

  let _mode = "";
  let spaceBgColor = "";

  if (mode === "prefers-color-scheme")
    _mode = window?.matchMedia("(prefers-color-scheme: light)")?.matches
      ? "light"
      : "dark";
  else _mode = mode;

  let videoBorder;

  if (data?.background?.color === "red") {
    videoBorder = theme.palette.accent2.main;
    if (_mode === "light") spaceBgColor = theme.palette.tip_red.background;
    else spaceBgColor = theme.palette.table_red.background;
  } else if (data?.background?.color === "green") {
    videoBorder = theme.palette.secondary.main;
    if (_mode === "light") spaceBgColor = theme.palette.tip_green.background;
    else spaceBgColor = `#053B1C`;
  } else if (data?.background?.color === "blue") {
    videoBorder = theme.palette.primary.light;
    spaceBgColor = theme.palette.primary.min;
  } else {
    videoBorder = theme.palette.border.main;
    spaceBgColor = theme.palette.background.main;
  }

  const mediaUrl = data?.media?.startsWith("https://academy")
    ? data?.media
    : "https://academy-strapi.staging.zabanshenas.com" + data?.media;

  if (!data?.cover) mediaUrl + "#t=0.5";

  const mediaCover = data?.cover?.startsWith("https://academy")
    ? data?.cover
    : "https://academy-strapi.staging.zabanshenas.com" + data?.cover;

  useEffect(() => {
    if (player?.current) player.current.src = mediaUrl;

    return () => {
      if (player?.current) player.current.src = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        padding: "8px 16px",
        backgroundColor: spaceBgColor,
        "& video": { border: `${videoBorder} 1px solid` },
      }}
    >
      <div className="tip-media-wrapper">
        {data?.media ? (
          <>
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
            <video
              // preload="false"
              playsInline
              onClick={togglePlayer}
              ref={player}
              className="video-element"
              onTimeUpdate={onTimeUpdate}
              onError={() => setcanPlay(false)}
              readyState
              onLoadedMetadata={() => {
                setcanPlay(true);
              }}
              onPause={() => {
                setplaying(false);
                setOpacityIcon(1);
              }}
              onEnded={() => {
                setplaying(false);
                setOpacityIcon(1);
              }}
              style={
                data?.cover
                  ? {
                      backgroundImage: `url(${mediaCover})`,
                    }
                  : {}
              }
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
          </>
        ) : (
          <></>
        )}

        {!userPlayedThis && data?.cover && (
          // <Image
          //   fill
          //   src={mediaCover}
          //   alt=""
          //   style={{ background: theme.palette.white.flexible }}
          // />
          // <ImageProvider src={mediaCover} alt="" />
          <img src={mediaCover} alt="" />
        )}
      </div>
    </Box>
  );
}

export default Media;
