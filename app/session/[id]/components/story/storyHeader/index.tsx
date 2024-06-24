import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import StoryAudioPlayer from "../storyAudioPlayer";
import { triggerStoryButtonEnable } from "@/providers/Redux/sessionNavigator/sessionNavigatorSlice";
import { useDispatch } from "react-redux";
import StorySimpleProcessingText from "../storySimpleProcessingText/storySimpleProcessingText";
import "./style.scss";

function StoryHeader({ story_header_data, index }: any) {
  const dispatch = useDispatch();
  const { tts, text, thumbnail } = story_header_data;

  useEffect(() => {
    if (tts === null) {
      dispatch(triggerStoryButtonEnable(true));
    } else {
      dispatch(triggerStoryButtonEnable(false));
    }
  }, []);
  return (
    <Box className="story-header-wrapper">
      <Box className="story-img-wrapper">
        {thumbnail ? (
          <Image src={thumbnail} alt="pic" width={264} height={148} />
        ) : (
          <></>
        )}
      </Box>
      <Box className="audio-text-wrapper">
        {tts ? <StoryAudioPlayer data={tts} index={index} /> : <></>}
        <StorySimpleProcessingText data={text} />
      </Box>
    </Box>
  );
}

export default StoryHeader;
