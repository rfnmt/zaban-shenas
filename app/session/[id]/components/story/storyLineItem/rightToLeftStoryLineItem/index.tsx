import React from "react";
import { Box, useTheme } from "@mui/material";
import StoryAudioPlayer from "../../storyAudioPlayer";
import Image from "next/image";
import { motion } from "framer-motion";
import { storyRightToLeftItemsMotion } from "@/modules/helper";
import StorySimpleProcessingText from "../../storySimpleProcessingText/storySimpleProcessingText";
type RtlStoryLineItemData = {
  line_type: string;
  character: any;
  tts: string;
  index: number;
  text: string;
  lineElementID?: number | undefined;
  parent?: string | undefined;
};

function RightToLeftStoryLineItem({
  line_type,
  character,
  tts,
  index,
  text,
  lineElementID,
  parent,
}: RtlStoryLineItemData) {
  const theme = useTheme() as any;
  let persianRegex = /[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ]/g;
  return (
    <motion.div
      {...(lineElementID === undefined
        ? { ...storyRightToLeftItemsMotion }
        : null)}
    >
      <Box
        className={`story-line-item-dialogue-wrapper ${
          line_type === "character"
            ? "rtl-character-dialogue"
            : "rtl-narrator-dialogue"
        } ${persianRegex.test(text?.content) ? "add-row-reverse" : ""}`}
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
                "& span": {
                  color: `${theme.palette.gray["1"]} !important`,
                },
              }
        }
      >
        {tts ? <StoryAudioPlayer data={tts} index={index} /> : <></>}
        <StorySimpleProcessingText
          data={text}
          lineElementID={lineElementID}
          parent={parent}
        />
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

export default RightToLeftStoryLineItem;
