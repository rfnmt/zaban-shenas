import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import Lottie from "react-lottie-player";

import * as blueLottieAnimation from "@/public/lottie-files/blue-audio-animation.json";
import * as redLottieAnimation from "@/public/lottie-files/red-audio-animation";
import * as greenLottieAnimation from "@/public/lottie-files/green-audio-animation";

type Props = {
  data: any;
  jsonBgColor?: string;
};

function AudioPlayer({ data, jsonBgColor }: Props) {
  const player = useRef<HTMLAudioElement | null>(null);

  const [playig, setPlayig] = useState(false);

  function togglePlayer() {
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

    const { current } = player;

    if (playig) {
      current.pause();
      setPlayig(false);
    } else {
      current.play();
      setPlayig(true);
    }
  }

  return (
    <div className="audio">
      <audio
        ref={player}
        src={data?.audio}
        onPause={() => setPlayig(false)}
        onEnded={() => setPlayig(false)}
      />
      <Button className="lottie-animation" onClick={togglePlayer}>
        <Lottie
          play={playig}
          loop={playig ? true : false}
          animationData={
            jsonBgColor
              ? jsonBgColor === "red"
                ? redLottieAnimation
                : jsonBgColor === "green"
                ? greenLottieAnimation
                : blueLottieAnimation
              : blueLottieAnimation
          }
          style={{ width: 24, height: 24, position: "relative" }}
        />
      </Button>
    </div>
  );
}

export default AudioPlayer;
