import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie-player";
import * as blueLottieAnimation from "@/public/lottie-files/blue-audio-animation.json";
import { triggerStoryButtonEnable } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootReduxState } from "@/providers/Redux/store";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { usePathname } from "next/navigation";
import {
  updateStoryShowAllArrangeQuestionChoices,
  updateStoryShowAllSelectPhraseQuestionChoices,
} from "@/providers/Redux/lesson/storySlice/storySlice";
import "./style.scss";

type Props = {
  data: any;
  index: number;
};

function StoryAudioPlayer({ data, index }: Props) {
  const dispatch = useDispatch();
  const pathname = usePathname().split("/");
  const cachedSessionData = queryClient.getQueryData([
    "session",
    Number(pathname[2]),
  ]) as any;

  const { storyCurrentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.story
  );

  const typeOfCurrentElement =
    cachedSessionData?.stories[0]?.data?.content_body[
      storyCurrentQuestionIndex
    ];

  const player = useRef<HTMLAudioElement | null>(null);

  const [playing, setPlaying] = useState(false);

  function togglePlayer() {
    var audios = document.querySelectorAll("audio");

    for (const iterator of audios) {
      iterator.currentTime = 0;
      iterator.pause();
    }
    if (playing) {
      setPlaying(false);
      player?.current?.pause();
    } else {
      setPlaying(true);
      player?.current?.play();
    }
  }

  // useEffect(() => {
  //   if (player) {
  //     setPlaying(true);
  //     player.current.play();
  //   }
  // }, []);

  useEffect(() => {
    if (index === storyCurrentQuestionIndex) {
      if (player) {
        setPlaying(true);
        player?.current?.play();
        dispatch(triggerStoryButtonEnable(false));
      }
    } else {
      // this logic is for pausing line_element which has made using arrangeQuestion
      // and we want to pause it
      player.current?.pause();
    }
  }, [storyCurrentQuestionIndex]);

  function handleOnEnded(e) {
    const { currentTime, duration } = e?.target;
    //
    if (index === storyCurrentQuestionIndex) {
      if (
        typeOfCurrentElement.type === "select_phrase_question" &&
        typeOfCurrentElement?.line_element?.tts !== null
      ) {
        if (currentTime === duration) {
          dispatch(updateStoryShowAllSelectPhraseQuestionChoices(true));
        }
      } else if (typeOfCurrentElement.type === "arrange_question") {
        if (currentTime === duration) {
          dispatch(updateStoryShowAllArrangeQuestionChoices(true));
        }
      } else if (
        typeOfCurrentElement.type === "header" ||
        typeOfCurrentElement.type === "line_item"
      ) {
        if (currentTime === duration) {
          dispatch(triggerStoryButtonEnable(true));
          dispatch(updateStoryShowAllArrangeQuestionChoices(false));
          // we must not put updateStoryShowAllSelectPhraseQuestionChoices here because
          // it is possible to have 2 or more phrase question one after the other
          // and at that situation it will not work correctly
        }
      }
      setPlaying(false);
    }
  }

  return (
    <div className="story-audio-player">
      <audio
        ref={player}
        src={data}
        onPause={() => setPlaying(false)}
        onEnded={handleOnEnded}
      />
      <Button className="story-lottie-animation" onClick={togglePlayer}>
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

export default StoryAudioPlayer;
