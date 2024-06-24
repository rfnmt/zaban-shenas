import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material";
import Image from "next/image";
import PlayAndPauseIcon from "./playAndPauseIcon";
import RangeProgress from "./rangeProgress";
import VideoTagWrapper from "./videoTagWrapper";
import "./style.scss";

type Data = {
  videoData: any;
  specificVideoClass?: string;
};

function CommonMainVideoAndAudioPlayer({
  videoData,
  specificVideoClass,
}: Data) {
  const theme = useTheme() as any;
  const [userPlayedThis, setUserPlayedThis] = useState(false);
  const player = useRef<HTMLVideoElement | undefined | null>();
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setplaying] = useState(false);
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
        // setDisableAudios(false);
      } else {
        setplaying(true);
        player.current?.play();
        // setDisableAudios(true);
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

  useEffect(() => {
    if (player?.current) player.current.src = videoData?.main_media;

    return () => {
      if (player?.current) player.current.src = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //

  return (
    <>
      {/* {canPlay} */}
      <div className={`question-video-wrapper ${specificVideoClass} `}>
        {/* <PlayAndPauseIcon
          opacityIcon={opacityIcon}
          togglePlayer={togglePlayer}
          playing={playing}
        /> */}

        <VideoTagWrapper data={videoData} />

        {/* <RangeProgress
          currentTime={currentTime}
          player={player}
          playing={playing}
          togglePlayer={togglePlayer}
        /> */}
      </div>
    </>
  );
}

export default CommonMainVideoAndAudioPlayer;
