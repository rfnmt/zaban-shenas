import React, { useRef, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { RootReduxState } from "@/providers/Redux/store";
import { updateMakeSentenceWithChoiceAnswer } from "@/providers/Redux/lesson/questionSlice/compose/composeSlice";
import { textIsFarsi } from "@/modules/helper";

function Item({ choice }) {
  const theme = useTheme() as any;
  const dispatch = useDispatch();
  const player = useRef<HTMLAudioElement | undefined | null>();

  const { makeSentenceWithChoiceAnswer } = useSelector(
    (state: RootReduxState) => state.composeQuestions
  );

  const isSelected = makeSentenceWithChoiceAnswer?.find(
    (_item) => _item.id === choice.id
  );

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
        if (!isSelected) togglePlayer();

        if (!isSelected) {
          const _data = [...makeSentenceWithChoiceAnswer] || [];
          _data.push(choice);
          dispatch(updateMakeSentenceWithChoiceAnswer(_data));
        }
      }}
      sx={{
        backgroundColor: isSelected ? "border.main" : "white.flexible",
        width: choice.text.length * 10 + "px",
        overflow: "hidden",
      }}
    >
      {choice?.audio && (
        <audio
          ref={player}
          src={choice?.audio}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
      )}
      {isSelected ? (
        ""
      ) : (
        <div
          draggable
          onDragEnd={(e) => {
            e.target.style.visibility = "visible";
            e.target.style.transform = "scale(1)";
            e.target.style.backgroundColor = theme.palette.white.flexible;
          }}
          onDragStart={(e) => {
            e.target.style.transform = "scale(1.7)";
            e.target.style.backgroundColor = theme.palette.border.main;
            setTimeout(function () {
              e.target.style.visibility = "hidden";
            }, 0);
            e.dataTransfer.setData("choice", JSON.stringify(choice));

            // e.preventDefault();
            // e.stopPropagation();
            // e.dataTransfer.dropEffect = "none";
            // e.target.style.visibility = "hidden";
          }}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Typography
              className={`${textIsFarsi(choice?.text) ? "fa" : "en"}`}
              sx={{ color: "gray.1" }}
            >
              {choice?.text}
            </Typography>
          </motion.div>
        </div>
      )}
    </Box>
  );
}

export default Item;
