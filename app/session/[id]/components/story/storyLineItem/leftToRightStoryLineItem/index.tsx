import React from "react";
import { Box, useTheme } from "@mui/material";
import Image from "next/image";
import StoryAudioPlayer from "../../storyAudioPlayer";
import { motion } from "framer-motion";
import { storyLeftToRightItemsMotion } from "@/modules/helper";
import StorySimpleProcessingText from "../../storySimpleProcessingText/storySimpleProcessingText";

type LTRStoryLineItemData = {
  line_type: string;
  character: any;
  tts: string;
  index: number;
  text: string;
  lineElementID?: number | undefined;
  parent?: string | undefined;
};

function LeftToRightStoryLineItem({
  line_type,
  character,
  tts,
  index,
  text,
  lineElementID,
  parent,
}: LTRStoryLineItemData) {
  const theme = useTheme() as any;
  return (
    <motion.div
      {...(lineElementID === undefined
        ? { ...storyLeftToRightItemsMotion }
        : null)}
    >
      <Box
        className={`story-line-item-dialogue-wrapper ${
          line_type === "character"
            ? "ltr-character-dialogue"
            : "ltr-narrator-dialogue"
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
                "& span": {
                  color: `${theme.palette.gray["1"]} `,
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

        {tts ? <StoryAudioPlayer data={tts} index={index} /> : <></>}
        <StorySimpleProcessingText
          data={text}
          lineElementID={lineElementID}
          parent={parent}
        />
      </Box>
    </motion.div>
  );
}

export default LeftToRightStoryLineItem;
