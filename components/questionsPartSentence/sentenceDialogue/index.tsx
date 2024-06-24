import React from "react";
import { Box, useTheme } from "@mui/material";
import SimpleProcessingText from "@/components/textProcessing/simpleProcessingText";
import DialogueAudio from "../components/dialogueAudio";
import "./style.scss";

function SentenceDialogue({ sentenceParameter }) {
  const theme = useTheme() as any;

  return (
    <Box className="question-sentence-wrapper">
      {sentenceParameter?.map((mainItem: any, mainIndex: number) => {
        return (
          <Box
            key={mainIndex}
            className={`questions-dialogue ${
              mainIndex % 2 === 0
                ? "questions-ltr-dialogue"
                : "questions-rtl-dialogue"
            } `}
            sx={
              mainItem?.text?.display[0]?.visibility === false
                ? {
                    borderColor: `${theme.palette.system.blue} !important`,
                    backgroundColor: `${theme.palette.white.flexible} !important`,
                    "&::before": {
                      borderBottomColor: `${theme.palette.system.blue} !important`,
                      borderLeftColor: `${theme.palette.system.blue} !important`,
                      backgroundColor: `${theme.palette.white.flexible} !important`,
                    },
                    "&::after": {
                      borderBottomColor: `${theme.palette.system.blue} !important`,
                      borderRightColor: `${theme.palette.system.blue} !important`,
                      backgroundColor: `${theme.palette.white.flexible} !important`,
                    },
                    "& .test-class .wrap-sentence .unvisible-slice": {
                      borderBottom: `1px solid ${theme.palette.border.main}`,
                      display: "inline-block",
                      verticalAlign: "sub",
                    },
                    width:
                      mainItem?.text?.content.length > 0
                        ? "fit-content"
                        : "230px",
                  }
                : {
                    borderColor: `${theme.palette.border.main} !important`,
                    backgroundColor: `${theme.palette.white.flexible} !important`,
                    "&::before": {
                      borderBottomColor: `${theme.palette.border.main} !important`,
                      borderLeftColor: `${theme.palette.border.main} !important`,
                      backgroundColor: `${theme.palette.white.flexible} !important`,
                    },
                    "&::after": {
                      borderBottomColor: `${theme.palette.border.main} !important`,
                      borderRightColor: `${theme.palette.border.main} !important`,
                      backgroundColor: `${theme.palette.white.flexible} !important`,
                    },
                    width:
                      mainItem?.text?.content.length > 0
                        ? "fit-content"
                        : "230px",
                  }
            }
          >
            <Box
              className={`audio-text-holder ${
                mainIndex % 2 === 0 ? "" : "reverse-the-icon"
              }`}
            >
              {mainItem?.audio ? (
                <DialogueAudio data={mainItem.audio} />
              ) : (
                <></>
              )}

              <SimpleProcessingText data={mainItem.text} />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default SentenceDialogue;
