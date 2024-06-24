import React, { useRef, useState } from "react";
import { Button } from "@mui/material";
import Lottie from "react-lottie-player";
import * as blueLottieAnimation from "@/public/lottie-files/blue-audio-animation.json";

import "./style.scss";

function DialogueAudio({ data }) {
  const player = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(false);
  function togglePlayer() {
    var audios = document.querySelectorAll("audio");

    for (const iterator of audios) {
      iterator.currentTime = 0;
      iterator.pause();
    }

    const { current } = player;

    if (playing) {
      setPlaying(false);
      current.pause();
    } else {
      setPlaying(true);
      current.play();
    }
  }

  function handleOnEnded() {}
  return (
    <div className="questions-dialogue-audio-player">
      <audio
        ref={player}
        src={data}
        onPause={() => setPlaying(false)}
        onEnded={handleOnEnded}
      />
      <Button
        className="questions-dialogue-lottie-animation"
        onClick={togglePlayer}
      >
        <Lottie
          play={playing}
          loop={playing ? true : false}
          animationData={blueLottieAnimation}
          style={{ width: 24, height: 24, position: "relative" }}
        />
      </Button>
    </div>
  );
}

export default DialogueAudio;
