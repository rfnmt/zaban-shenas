import React from "react";
import { Box, useTheme } from "@mui/material";
import Image from "next/image";
import StoryAudioPlayer from "../../storyAudioPlayer";
import StoryArrangeQuestionDamagedSentence from "../storyArrangeQuestionDamagedSentence";
import { storyRightToLeftItemsMotion } from "@/modules/helper";
import { motion } from "framer-motion";
type RightToLeftStoryArrangeQuestionData = {
  line_type: string;
  character: any;
  tts: string;
  index: number;
  text: string;
};
function RightToLeftStoryArrangeQuestion({
  line_type,
  character,
  tts,
  index,
  text,
}: RightToLeftStoryArrangeQuestionData) {
  const theme = useTheme() as any;
  return (
    <motion.div {...storyRightToLeftItemsMotion}>
      <Box
        className={`story-arrange-question-dialogue-wrapper ${
          line_type === "character"
            ? "arrange-question-rtl-character-dialogue"
            : "arrange-question-rtl-narrator-dialogue"
        }`}
        sx={
          line_type === "character"
            ? {
                border: `1px solid ${theme.palette.border.main} !important`,
                backgroundColor: `${theme.palette.background.main} !important`,
                "&:after": {
                  borderColor: `${theme.palette.border.main} !important`,
                  backgroundColor: `${theme.palette.background.main} !important`,
                },
              }
            : {
                border: "unset !important",
                backgroundColor: `transparent !important`,
                "&:after": {
                  content: "none",
                  border: "unset !important",
                },
              }
        }
      >
        <StoryAudioPlayer data={tts} index={index} />
        <StoryArrangeQuestionDamagedSentence textData={text} />
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
      </Box>
    </motion.div>
  );
}

export default RightToLeftStoryArrangeQuestion;
