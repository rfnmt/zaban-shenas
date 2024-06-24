import React from "react";
import { Box, useTheme } from "@mui/material";
import Image from "next/image";
import StoryAudioPlayer from "../../storyAudioPlayer";
import StoryArrangeQuestionDamagedSentence from "../storyArrangeQuestionDamagedSentence";
import { storyLeftToRightItemsMotion } from "@/modules/helper";
import { motion } from "framer-motion";
type LeftToRightStoryArrangeQuestionData = {
  line_type: string;
  character: any;
  tts: string;
  index: number;
  text: string;
};
function LeftToRightStoryArrangeQuestion({
  line_type,
  character,
  tts,
  index,
  text,
}: LeftToRightStoryArrangeQuestionData) {
  const theme = useTheme() as any;
  return (
    <motion.div {...storyLeftToRightItemsMotion}>
      <Box
        className={`story-arrange-question-dialogue-wrapper ${
          line_type === "character"
            ? "arrange-question-ltr-character-dialogue"
            : "arrange-question-ltr-narrator-dialogue"
        }`}
        sx={
          line_type === "character"
            ? {
                border: `1px solid ${theme.palette.border.main} !important`,
                backgroundColor: `${theme.palette.background.main} !important`,
                "&:before": {
                  borderColor: `${theme.palette.border.main} !important`,
                  backgroundColor: `${theme.palette.background.main} !important`,
                },
              }
            : {
                border: "unset !important",
                backgroundColor: `transparent !important`,
                "&:before": {
                  content: "none",
                  border: "unset !important",
                },
              }
        }
      >
        {character?.thumbnail ? (
          <Image
            src={character?.thumbnail}
            alt={character?.name}
            width={45}
            height={45}
          />
        ) : (
          <></>
        )}

        <StoryAudioPlayer data={tts} index={index} />
        <StoryArrangeQuestionDamagedSentence textData={text} />
      </Box>
    </motion.div>
  );
}

export default LeftToRightStoryArrangeQuestion;
