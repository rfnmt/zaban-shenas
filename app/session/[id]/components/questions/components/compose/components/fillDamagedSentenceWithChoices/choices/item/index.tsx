import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import { RootReduxState } from "@/providers/Redux/store";
import { clickedChoicesAction } from "../../helpers";
import { textIsFarsi } from "@/modules/helper";

function Item({ item, questionId }) {
  const { allQuestion, currentQuestionIndex } = useSelector(
    (state: RootReduxState) => state.question
  );

  const answerfillDamagedSentenceWithChoices = useSelector(
    (state: RootReduxState) =>
      state?.composeQuestions?.answerfillDamagedSentenceWithChoices
  );

  const isSelected = answerfillDamagedSentenceWithChoices?.find((_item) => {
    return _item?.id === item?.id ? true : false;
  });

  const player = useRef<HTMLAudioElement | undefined | null>();

  const [playing, setPlaying] = useState(false);

  function togglePlayer() {
    var audios = document.querySelectorAll("audio");

    for (const iterator of audios) {
      iterator.currentTime = 0;
      iterator.pause();
    }

    if (playing === true) {
      setPlaying(false);
      player?.current?.pause();
    } else {
      setPlaying(true);
      player?.current?.play();
    }
  }

  return (
    <Box
      className="choice-item"
      onClick={() => {
        if (
          !isSelected &&
          allQuestion[currentQuestionIndex]?.id === questionId
        ) {
          togglePlayer();
        }

        if (!isSelected) {
          clickedChoicesAction(item);
        }
      }}
      sx={{
        backgroundColor: isSelected ? "border.main" : "white.flexible",
        width: item.text.length * 10 + "px",
      }}
    >
      {item?.audio && (
        <audio
          ref={player}
          src={item?.audio}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
      )}

      {isSelected ? (
        ""
      ) : (
        <div
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("choice", JSON.stringify(item));
            setTimeout(() => {
              e.target.style.visibility = "hidden";
            }, 0);
          }}
          onDragEnd={(e) => {
            e.target.style.visibility = "visible";
          }}
          style={{
            minWidth: `calc(${item?.text.length} * 10px) !important`,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Typography
              sx={{
                color: "gray.1",
                fontFamily: textIsFarsi(item?.text) ? "IRansans" : "Comme",
              }}
            >
              {item?.text}
            </Typography>
          </motion.div>
        </div>
      )}
    </Box>
  );
}

export default Item;
